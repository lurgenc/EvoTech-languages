#!/usr/bin/env python3
"""
AI Konsültasyon Sistemi Test Script
Bu script sistemin çalışıp çalışmadığını test eder.
"""

import asyncio
import os
from ai_agents import AIConsultationSystem

async def test_consultation_system():
    """Test the AI consultation system with a sample question"""
    
    print("🧪 AI Konsültasyon Sistemi Test Başlatılıyor...")
    print("=" * 50)
    
    # Sistem örneği oluştur
    ai_system = AIConsultationSystem()
    
    # Model durumlarını kontrol et
    print("📋 Model Durumları Kontrol Ediliyor...")
    model_status = await ai_system.check_model_availability()
    
    for model, status in model_status.items():
        status_icon = "✅" if status else "❌"
        print(f"  {status_icon} {model}: {'Kullanılabilir' if status else 'Kullanılamaz'}")
    
    # Kullanılabilir modelleri filtrele
    available_models = [model for model, status in model_status.items() if status]
    
    if not available_models:
        print("\n❌ Hiçbir AI modeli kullanılabilir durumda değil!")
        print("Lütfen API anahtarlarınızı kontrol edin ve .env dosyasını ayarlayın.")
        return
    
    print(f"\n✅ {len(available_models)} model kullanılabilir: {', '.join(available_models)}")
    
    # Test sorusu
    test_question = "Python'da en iyi web framework'ü hangisidir ve neden?"
    
    print(f"\n🤔 Test Sorusu: {test_question}")
    print("\n🤖 Konsültasyon başlatılıyor...")
    print("-" * 50)
    
    try:
        # Konsültasyonu başlat
        result = await ai_system.conduct_consultation(
            question=test_question,
            models=available_models[:3],  # İlk 3 modeli kullan
            max_rounds=2,  # Test için 2 round yeterli
            consensus_threshold=0.7
        )
        
        # Sonuçları göster
        print(f"\n📊 KONSÜLTASYON SONUÇLARI")
        print("=" * 50)
        print(f"Soru: {result['question']}")
        print(f"Konsensüs: {'✅ Sağlandı' if result['consensus_reached'] else '⚠️ Kısmi'}")
        print(f"Güven Skoru: {result['confidence_score']:.2f}")
        print(f"Katılan Modeller: {', '.join(result['participating_models'])}")
        
        print(f"\n🎯 EN İYİ CEVAP:")
        print("-" * 30)
        print(result['final_answer'][:300] + "..." if len(result['final_answer']) > 300 else result['final_answer'])
        
        print(f"\n💬 TARTIŞMA SÜRECİ:")
        print("-" * 30)
        for round_data in result['discussion_rounds']:
            print(f"\nRound {round_data['round']}:")
            for model, response in round_data['responses'].items():
                print(f"  • {model}: {response[:100]}...")
        
        print(f"\n✅ Test başarıyla tamamlandı!")
        
    except Exception as e:
        print(f"\n❌ Test sırasında hata oluştu: {str(e)}")
        return False
    
    return True

def check_environment():
    """Check if required environment variables are set"""
    print("🔧 Ortam Değişkenleri Kontrolü...")
    
    required_vars = [
        "OPENAI_API_KEY",
        "GOOGLE_API_KEY", 
        "ANTHROPIC_API_KEY"
    ]
    
    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
        else:
            print(f"  ✅ {var}: Ayarlanmış")
    
    if missing_vars:
        print(f"\n⚠️  Eksik environment variables:")
        for var in missing_vars:
            print(f"  ❌ {var}")
        print("\n💡 .env dosyasını kontrol edin ve API anahtarlarınızı ekleyin.")
        return False
    
    return True

async def main():
    """Main test function"""
    print("🤖 AI KONSÜLTASYON SİSTEMİ TEST")
    print("=" * 60)
    
    # Environment kontrol
    if not check_environment():
        print("\n❌ Environment kontrol başarısız. Test durduruluyor.")
        return
    
    # Ana test
    success = await test_consultation_system()
    
    if success:
        print("\n" + "=" * 60)
        print("🎉 TÜM TESTLER BAŞARILI!")
        print("🌐 Artık web arayüzünü kullanabilirsiniz: http://localhost:3000")
    else:
        print("\n" + "=" * 60)
        print("❌ Test başarısız. Lütfen konfigürasyonu kontrol edin.")

if __name__ == "__main__":
    asyncio.run(main())