from fastapi import APIRouter

router = APIRouter()

@router.post("/")
def cognitive_echo(text: str):
    return {"response": f"You said: {text}"}
