import json
import requests
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import re

router = APIRouter()

OLLAMA_URL = "http://localhost:11434/api/chat"
MODEL = "mistral"


# -----------------------------
# Request / Response Models
# -----------------------------

class SimplifyTaskRequest(BaseModel):
    task: str

class SimplifyTaskResponse(BaseModel):
    steps: list[str]


class BrainDumpRequest(BaseModel):
    text: str

class BrainDumpResponse(BaseModel):
    tasks: list[str]
    reminders: list[str]
    emotional_load: str
    decisions: list[str]
    next_steps: list[str]


# -----------------------------
# JSON Extraction Helper
# -----------------------------

def extract_first_json(text: str):
    """
    Extract ONLY the FIRST JSON object from the model output.
    This avoids 'Extra data' errors when the model returns multiple JSON blocks.
    """
    matches = re.findall(r"\{[\s\S]*?\}", text)
    if not matches:
        raise ValueError("Model did not return JSON")

    # Take ONLY the first JSON object
    return json.loads(matches[0])


# -----------------------------
# Simplify Task Endpoint
# -----------------------------

@router.post("/simplify-task", response_model=SimplifyTaskResponse)
def simplify_task(data: SimplifyTaskRequest):
    prompt = (
        "Break this task into simple steps. "
        "Return ONLY valid JSON in this exact format:\n"
        "{ \"steps\": [\"step 1\", \"step 2\"] }\n\n"
        f"Task: {data.task}"
    )

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL,
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            }
        )

        content = response.json()["message"]["content"].strip()
        parsed = extract_first_json(content)

        return SimplifyTaskResponse(**parsed)

    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))


# -----------------------------
# Brain Dump Endpoint
# -----------------------------

@router.post("/brain-dump", response_model=BrainDumpResponse)
def brain_dump(data: BrainDumpRequest):
    prompt = (
        "Organize this brain dump into JSON with keys: "
        "tasks, reminders, emotional_load, decisions, next_steps.\n"
        "Return ONLY valid JSON.\n\n"
        f"{data.text}"
    )

    try:
        response = requests.post(
            OLLAMA_URL,
            json={
                "model": MODEL,
                "messages": [
                    {"role": "user", "content": prompt}
                ]
            }
        )

        content = response.json()["message"]["content"].strip()
        parsed = extract_first_json(content)

        return BrainDumpResponse(**parsed)

    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))
