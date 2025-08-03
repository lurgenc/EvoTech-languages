from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Dict, Optional
import asyncio
import json
import os
from dotenv import load_dotenv

from ai_agents import AIConsultationSystem

load_dotenv()

app = FastAPI(title="AI Konsültasyon Sistemi", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for frontend
app.mount("/static", StaticFiles(directory="frontend/build"), name="static")

# AI Consultation System instance
ai_system = AIConsultationSystem()

class ConsultationRequest(BaseModel):
    question: str
    models: List[str] = ["gpt-4", "gemini-pro", "claude-3", "ollama"]
    max_rounds: int = 3
    consensus_threshold: float = 0.8

class ConsultationResponse(BaseModel):
    question: str
    final_answer: str
    confidence_score: float
    discussion_rounds: List[Dict]
    participating_models: List[str]
    consensus_reached: bool

@app.get("/")
async def root():
    return {"message": "AI Konsültasyon Sistemi API'sine hoş geldiniz!"}

@app.get("/models")
async def get_available_models():
    """Kullanılabilir AI modellerini listele"""
    return {
        "available_models": [
            {"id": "gpt-4", "name": "GPT-4", "provider": "OpenAI", "status": "active"},
            {"id": "gpt-3.5-turbo", "name": "GPT-3.5 Turbo", "provider": "OpenAI", "status": "active"},
            {"id": "gemini-pro", "name": "Gemini Pro", "provider": "Google", "status": "active"},
            {"id": "claude-3", "name": "Claude 3", "provider": "Anthropic", "status": "active"},
            {"id": "ollama", "name": "Local Model (Ollama)", "provider": "Ollama", "status": "active"}
        ]
    }

@app.post("/consult", response_model=ConsultationResponse)
async def start_consultation(request: ConsultationRequest):
    """AI modelleri arasında konsültasyon başlat"""
    try:
        result = await ai_system.conduct_consultation(
            question=request.question,
            models=request.models,
            max_rounds=request.max_rounds,
            consensus_threshold=request.consensus_threshold
        )
        
        return ConsultationResponse(**result)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Konsültasyon sırasında hata: {str(e)}")

@app.get("/health")
async def health_check():
    """Sistem sağlık kontrolü"""
    model_status = await ai_system.check_model_availability()
    return {
        "status": "healthy",
        "models": model_status,
        "timestamp": "2024-01-01T00:00:00Z"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)