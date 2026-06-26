from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import User, SessionLocal
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from pydantic import BaseModel

router = APIRouter()

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# ---------------------------
# Request Body Model
# ---------------------------
class AuthRequest(BaseModel):
    email: str
    password: str

# ---------------------------
# Database Dependency
# ---------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------------
# Helpers
# ---------------------------
def hash_password(password: str):
    # bcrypt only supports up to 72 bytes
    password = password.encode("utf-8")[:72].decode("utf-8", "ignore")
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str):
    plain = plain.encode("utf-8")[:72].decode("utf-8", "ignore")
    return pwd_context.verify(plain, hashed)



def create_token(email: str):
    payload = {
        "sub": email,
        "exp": datetime.utcnow() + timedelta(hours=12)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

# ---------------------------
# Signup Route
# ---------------------------
@router.post("/signup")
def signup(payload: AuthRequest, db: Session = Depends(get_db)):
    email = payload.email
    password = payload.password

    existing = db.query(User).filter(User.email == email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    user = User(email=email, password=hash_password(password))
    db.add(user)
    db.commit()
    db.refresh(user)

    return {"message": "Signup successful"}

# ---------------------------
# Login Route
# ---------------------------

@router.post("/login")
def login(payload: AuthRequest, db: Session = Depends(get_db)):
    email = payload.email
    password = payload.password

    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_token(user.email)
    return {"access_token": token}
