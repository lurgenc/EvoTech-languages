import asyncio
import json
import os
from typing import Dict, List, Optional, Any
from abc import ABC, abstractmethod
import openai
import google.generativeai as genai
import anthropic
import ollama
import httpx
from dotenv import load_dotenv

load_dotenv()

class AIAgent(ABC):
    """Abstract base class for AI agents"""
    
    def __init__(self, name: str, model: str):
        self.name = name
        self.model = model
        self.conversation_history = []
    
    @abstractmethod
    async def generate_response(self, prompt: str, context: List[Dict] = None) -> str:
        """Generate response to a prompt"""
        pass
    
    @abstractmethod
    async def is_available(self) -> bool:
        """Check if the agent is available"""
        pass

class OpenAIAgent(AIAgent):
    """OpenAI GPT agent"""
    
    def __init__(self, model: str = "gpt-4"):
        super().__init__("OpenAI", model)
        self.client = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    async def generate_response(self, prompt: str, context: List[Dict] = None) -> str:
        try:
            messages = [{"role": "system", "content": "Sen deneyimli bir AI asistanısın. Soruları kapsamlı ve doğru şekilde yanıtla."}]
            
            if context:
                for msg in context[-5:]:  # Son 5 mesajı al
                    messages.append({"role": "user", "content": msg.get("content", "")})
            
            messages.append({"role": "user", "content": prompt})
            
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=1000,
                temperature=0.7
            )
            
            return response.choices[0].message.content
        except Exception as e:
            return f"OpenAI Agent Error: {str(e)}"
    
    async def is_available(self) -> bool:
        try:
            await self.client.models.list()
            return True
        except:
            return False

class GeminiAgent(AIAgent):
    """Google Gemini agent"""
    
    def __init__(self, model: str = "gemini-pro"):
        super().__init__("Gemini", model)
        genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
        self.model_instance = genai.GenerativeModel(model)
    
    async def generate_response(self, prompt: str, context: List[Dict] = None) -> str:
        try:
            # Context ekleme
            full_prompt = prompt
            if context:
                context_text = "\n".join([f"Önceki yanıt: {msg.get('content', '')}" for msg in context[-3:]])
                full_prompt = f"Kontext:\n{context_text}\n\nSoru: {prompt}"
            
            response = await asyncio.to_thread(
                self.model_instance.generate_content, 
                full_prompt
            )
            return response.text
        except Exception as e:
            return f"Gemini Agent Error: {str(e)}"
    
    async def is_available(self) -> bool:
        try:
            await asyncio.to_thread(
                self.model_instance.generate_content, 
                "Test"
            )
            return True
        except:
            return False

class ClaudeAgent(AIAgent):
    """Anthropic Claude agent"""
    
    def __init__(self, model: str = "claude-3-sonnet-20240229"):
        super().__init__("Claude", model)
        self.client = anthropic.AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    
    async def generate_response(self, prompt: str, context: List[Dict] = None) -> str:
        try:
            # Context ekleme
            full_prompt = prompt
            if context:
                context_text = "\n".join([f"Önceki değerlendirme: {msg.get('content', '')}" for msg in context[-3:]])
                full_prompt = f"Bağlam:\n{context_text}\n\nDeğerlendirilecek soru: {prompt}"
            
            response = await self.client.messages.create(
                model=self.model,
                max_tokens=1000,
                messages=[{"role": "user", "content": full_prompt}]
            )
            
            return response.content[0].text
        except Exception as e:
            return f"Claude Agent Error: {str(e)}"
    
    async def is_available(self) -> bool:
        try:
            await self.client.messages.create(
                model=self.model,
                max_tokens=10,
                messages=[{"role": "user", "content": "Test"}]
            )
            return True
        except:
            return False

class OllamaAgent(AIAgent):
    """Local Ollama agent"""
    
    def __init__(self, model: str = "llama2"):
        super().__init__("Ollama", model)
        self.base_url = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
    
    async def generate_response(self, prompt: str, context: List[Dict] = None) -> str:
        try:
            # Context ekleme
            full_prompt = prompt
            if context:
                context_text = "\n".join([f"Önceki analiz: {msg.get('content', '')}" for msg in context[-3:]])
                full_prompt = f"Önceki analizler:\n{context_text}\n\nAnaliz edilecek: {prompt}"
            
            response = await asyncio.to_thread(
                ollama.generate,
                model=self.model,
                prompt=full_prompt
            )
            return response["response"]
        except Exception as e:
            return f"Ollama Agent Error: {str(e)}"
    
    async def is_available(self) -> bool:
        try:
            await asyncio.to_thread(ollama.list)
            return True
        except:
            return False

class AIConsultationSystem:
    """Multi-agent AI consultation system"""
    
    def __init__(self):
        self.agents = {
            "gpt-4": OpenAIAgent("gpt-4"),
            "gpt-3.5-turbo": OpenAIAgent("gpt-3.5-turbo"),
            "gemini-pro": GeminiAgent("gemini-pro"),
            "claude-3": ClaudeAgent("claude-3-sonnet-20240229"),
            "ollama": OllamaAgent("llama2")
        }
    
    async def check_model_availability(self) -> Dict[str, bool]:
        """Check which models are available"""
        availability = {}
        tasks = []
        
        for name, agent in self.agents.items():
            tasks.append(self._check_agent_availability(name, agent))
        
        results = await asyncio.gather(*tasks, return_exceptions=True)
        
        for i, (name, _) in enumerate(self.agents.items()):
            availability[name] = results[i] if not isinstance(results[i], Exception) else False
        
        return availability
    
    async def _check_agent_availability(self, name: str, agent: AIAgent) -> bool:
        try:
            return await agent.is_available()
        except:
            return False
    
    async def conduct_consultation(
        self, 
        question: str, 
        models: List[str], 
        max_rounds: int = 3,
        consensus_threshold: float = 0.8
    ) -> Dict[str, Any]:
        """Conduct multi-agent consultation"""
        
        # Kullanılabilir modelleri filtrele
        available_models = await self.check_model_availability()
        active_models = [model for model in models if available_models.get(model, False)]
        
        if not active_models:
            return {
                "question": question,
                "final_answer": "Hiçbir AI modeli kullanılabilir durumda değil.",
                "confidence_score": 0.0,
                "discussion_rounds": [],
                "participating_models": [],
                "consensus_reached": False
            }
        
        discussion_rounds = []
        responses = {}
        
        # İlk round - her agent soruyu yanıtlar
        print(f"🤖 Konsültasyon başlatılıyor: {len(active_models)} model aktif")
        
        for round_num in range(max_rounds):
            print(f"📝 Round {round_num + 1}/{max_rounds}")
            round_responses = {}
            
            # Her agent için paralel olarak yanıt al
            tasks = []
            for model_name in active_models:
                agent = self.agents[model_name]
                context = discussion_rounds if round_num > 0 else None
                tasks.append(self._get_agent_response(agent, question, context))
            
            results = await asyncio.gather(*tasks, return_exceptions=True)
            
            # Sonuçları işle
            for i, model_name in enumerate(active_models):
                if not isinstance(results[i], Exception):
                    round_responses[model_name] = results[i]
                    responses[model_name] = results[i]
            
            discussion_rounds.append({
                "round": round_num + 1,
                "responses": round_responses
            })
            
            # Konsensüs kontrolü
            consensus_score = self._calculate_consensus(round_responses)
            print(f"📊 Konsensüs skoru: {consensus_score:.2f}")
            
            if consensus_score >= consensus_threshold:
                print("✅ Konsensüs sağlandı!")
                break
        
        # En iyi yanıtı seç
        final_answer = self._select_best_answer(responses)
        final_consensus = self._calculate_consensus(responses)
        
        return {
            "question": question,
            "final_answer": final_answer,
            "confidence_score": final_consensus,
            "discussion_rounds": discussion_rounds,
            "participating_models": active_models,
            "consensus_reached": final_consensus >= consensus_threshold
        }
    
    async def _get_agent_response(self, agent: AIAgent, question: str, context: List[Dict] = None) -> str:
        """Get response from a single agent"""
        try:
            return await agent.generate_response(question, context)
        except Exception as e:
            return f"Error from {agent.name}: {str(e)}"
    
    def _calculate_consensus(self, responses: Dict[str, str]) -> float:
        """Calculate consensus score based on response similarity"""
        if len(responses) < 2:
            return 1.0
        
        # Basit konsensüs hesaplama - gerçek uygulamada NLP similarity kullanılabilir
        response_list = list(responses.values())
        total_comparisons = 0
        similar_pairs = 0
        
        for i in range(len(response_list)):
            for j in range(i + 1, len(response_list)):
                total_comparisons += 1
                # Basit benzerlik kontrolü (kelime sayısı, anahtar kelimeler vs.)
                similarity = self._simple_similarity(response_list[i], response_list[j])
                if similarity > 0.5:  # %50 benzerlik eşiği
                    similar_pairs += 1
        
        return similar_pairs / total_comparisons if total_comparisons > 0 else 0.0
    
    def _simple_similarity(self, text1: str, text2: str) -> float:
        """Simple text similarity calculation"""
        words1 = set(text1.lower().split())
        words2 = set(text2.lower().split())
        
        intersection = words1.intersection(words2)
        union = words1.union(words2)
        
        return len(intersection) / len(union) if union else 0.0
    
    def _select_best_answer(self, responses: Dict[str, str]) -> str:
        """Select the best answer from responses"""
        if not responses:
            return "Yanıt alınamadı."
        
        # En uzun ve en detaylı yanıtı seç (basit heuristic)
        best_response = ""
        max_length = 0
        
        for model, response in responses.items():
            if len(response) > max_length and "Error" not in response:
                max_length = len(response)
                best_response = response
        
        # Eğer hiç geçerli yanıt yoksa, ilk yanıtı döndür
        return best_response if best_response else list(responses.values())[0]