export const languages = {
  english: {
    name: 'English',
    nativeName: 'English',
    code: 'en',
    flag: '🇺🇸',
    lessons: [
      {
        id: 1,
        title: 'Temel Selamlaşma',
        description: 'Merhaba, nasılsın gibi temel selamlaşma ifadeleri',
        level: 'Başlangıç',
        duration: '10 dk',
        words: [
          { word: 'Hello', translation: 'Merhaba', pronunciation: 'həˈloʊ' },
          { word: 'Goodbye', translation: 'Güle güle', pronunciation: 'ˌɡʊdˈbaɪ' },
          { word: 'Thank you', translation: 'Teşekkür ederim', pronunciation: 'ˈθæŋk ju' },
          { word: 'Please', translation: 'Lütfen', pronunciation: 'pliz' },
          { word: 'Yes', translation: 'Evet', pronunciation: 'jes' },
          { word: 'No', translation: 'Hayır', pronunciation: 'noʊ' },
          { word: 'How are you?', translation: 'Nasılsın?', pronunciation: 'haʊ ɑr ju' },
          { word: 'I am fine', translation: 'İyiyim', pronunciation: 'aɪ æm faɪn' }
        ]
      },
      {
        id: 2,
        title: 'Sayılar',
        description: '1\'den 20\'ye kadar sayılar',
        level: 'Başlangıç',
        duration: '15 dk',
        words: [
          { word: 'One', translation: 'Bir', pronunciation: 'wʌn' },
          { word: 'Two', translation: 'İki', pronunciation: 'tu' },
          { word: 'Three', translation: 'Üç', pronunciation: 'θri' },
          { word: 'Four', translation: 'Dört', pronunciation: 'fɔr' },
          { word: 'Five', translation: 'Beş', pronunciation: 'faɪv' },
          { word: 'Six', translation: 'Altı', pronunciation: 'sɪks' },
          { word: 'Seven', translation: 'Yedi', pronunciation: 'ˈsɛvən' },
          { word: 'Eight', translation: 'Sekiz', pronunciation: 'eɪt' },
          { word: 'Nine', translation: 'Dokuz', pronunciation: 'naɪn' },
          { word: 'Ten', translation: 'On', pronunciation: 'tɛn' }
        ]
      }
    ]
  },
  spanish: {
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
    flag: '🇪🇸',
    lessons: [
      {
        id: 1,
        title: 'Saludos Básicos',
        description: 'Expresiones básicas de saludo como hola, cómo estás',
        level: 'Principiante',
        duration: '10 min',
        words: [
          { word: 'Hola', translation: 'Merhaba', pronunciation: 'ˈola' },
          { word: 'Adiós', translation: 'Güle güle', pronunciation: 'aˈðjos' },
          { word: 'Gracias', translation: 'Teşekkür ederim', pronunciation: 'ˈɡɾaθjas' },
          { word: 'Por favor', translation: 'Lütfen', pronunciation: 'poɾ faˈβoɾ' },
          { word: 'Sí', translation: 'Evet', pronunciation: 'si' },
          { word: 'No', translation: 'Hayır', pronunciation: 'no' },
          { word: '¿Cómo estás?', translation: 'Nasılsın?', pronunciation: 'ˈkomo esˈtas' },
          { word: 'Estoy bien', translation: 'İyiyim', pronunciation: 'esˈtoj βjen' }
        ]
      }
    ]
  },
  french: {
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    flag: '🇫🇷',
    lessons: [
      {
        id: 1,
        title: 'Salutations de Base',
        description: 'Expressions de salutation de base comme bonjour, comment allez-vous',
        level: 'Débutant',
        duration: '10 min',
        words: [
          { word: 'Bonjour', translation: 'Merhaba', pronunciation: 'bɔ̃ˈʒuʁ' },
          { word: 'Au revoir', translation: 'Güle güle', pronunciation: 'o ʁəˈvwaʁ' },
          { word: 'Merci', translation: 'Teşekkür ederim', pronunciation: 'mɛʁˈsi' },
          { word: 'S\'il vous plaît', translation: 'Lütfen', pronunciation: 'sil vu plɛ' },
          { word: 'Oui', translation: 'Evet', pronunciation: 'wi' },
          { word: 'Non', translation: 'Hayır', pronunciation: 'nɔ̃' },
          { word: 'Comment allez-vous?', translation: 'Nasılsın?', pronunciation: 'kɔmɑ̃ ale vu' },
          { word: 'Je vais bien', translation: 'İyiyim', pronunciation: 'ʒə vɛ bjɛ̃' }
        ]
      }
    ]
  },
  german: {
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de',
    flag: '🇩🇪',
    lessons: [
      {
        id: 1,
        title: 'Grundlegende Begrüßungen',
        description: 'Grundlegende Begrüßungsausdrücke wie hallo, wie geht es dir',
        level: 'Anfänger',
        duration: '10 min',
        words: [
          { word: 'Hallo', translation: 'Merhaba', pronunciation: 'ˈhalo' },
          { word: 'Auf Wiedersehen', translation: 'Güle güle', pronunciation: 'aʊf ˈviːdɐzeːən' },
          { word: 'Danke', translation: 'Teşekkür ederim', pronunciation: 'ˈdaŋkə' },
          { word: 'Bitte', translation: 'Lütfen', pronunciation: 'ˈbɪtə' },
          { word: 'Ja', translation: 'Evet', pronunciation: 'jaː' },
          { word: 'Nein', translation: 'Hayır', pronunciation: 'naɪn' },
          { word: 'Wie geht es dir?', translation: 'Nasılsın?', pronunciation: 'viː ɡeːt əs diːɐ' },
          { word: 'Mir geht es gut', translation: 'İyiyim', pronunciation: 'miːɐ ɡeːt əs ɡuːt' }
        ]
      }
    ]
  },
  bulgarian: {
    name: 'Bulgarian',
    nativeName: 'Български',
    code: 'bg',
    flag: '🇧🇬',
    lessons: [
      {
        id: 1,
        title: 'Основни Поздрави',
        description: 'Основни поздрави като здравей, как си',
        level: 'Начинаещ',
        duration: '10 мин',
        words: [
          { word: 'Здравей', translation: 'Merhaba', pronunciation: 'ˈzdravɛj' },
          { word: 'Довиждане', translation: 'Güle güle', pronunciation: 'doˈviʒdɐnɛ' },
          { word: 'Благодаря', translation: 'Teşekkür ederim', pronunciation: 'blɐɡoˈdarjɐ' },
          { word: 'Моля', translation: 'Lütfen', pronunciation: 'ˈmɔljɐ' },
          { word: 'Да', translation: 'Evet', pronunciation: 'dɐ' },
          { word: 'Не', translation: 'Hayır', pronunciation: 'nɛ' },
          { word: 'Как си?', translation: 'Nasılsın?', pronunciation: 'kɐk si' },
          { word: 'Добре съм', translation: 'İyiyim', pronunciation: 'doˈbrɛ sɐm' }
        ]
      },
      {
        id: 2,
        title: 'Числа',
        description: 'Числа от 1 до 20',
        level: 'Начинаещ',
        duration: '15 мин',
        words: [
          { word: 'Едно', translation: 'Bir', pronunciation: 'ˈɛdno' },
          { word: 'Две', translation: 'İki', pronunciation: 'dvɛ' },
          { word: 'Три', translation: 'Üç', pronunciation: 'tri' },
          { word: 'Четири', translation: 'Dört', pronunciation: 'tʃɛˈtiri' },
          { word: 'Пет', translation: 'Beş', pronunciation: 'pɛt' },
          { word: 'Шест', translation: 'Altı', pronunciation: 'ʃɛst' },
          { word: 'Седем', translation: 'Yedi', pronunciation: 'ˈsɛdɛm' },
          { word: 'Осем', translation: 'Sekiz', pronunciation: 'ˈɔsɛm' },
          { word: 'Девет', translation: 'Dokuz', pronunciation: 'ˈdɛvɛt' },
          { word: 'Десет', translation: 'On', pronunciation: 'ˈdɛsɛt' }
        ]
      },
      {
        id: 3,
        title: 'Цветове',
        description: 'Основни цветове на български',
        level: 'Начинаещ',
        duration: '12 мин',
        words: [
          { word: 'Червен', translation: 'Kırmızı', pronunciation: 'ˈtʃɛrvɛn' },
          { word: 'Син', translation: 'Mavi', pronunciation: 'sin' },
          { word: 'Зелен', translation: 'Yeşil', pronunciation: 'ˈzɛlɛn' },
          { word: 'Жълт', translation: 'Sarı', pronunciation: 'ʒɐɫt' },
          { word: 'Бял', translation: 'Beyaz', pronunciation: 'bjɐɫ' },
          { word: 'Черен', translation: 'Siyah', pronunciation: 'ˈtʃɛrɛn' },
          { word: 'Оранжев', translation: 'Turuncu', pronunciation: 'oˈrɐnʒɛf' },
          { word: 'Розов', translation: 'Pembe', pronunciation: 'ˈrɔzof' }
        ]
      },
      {
        id: 4,
        title: 'Семейство',
        description: 'Семейни членове на български',
        level: 'Начинаещ',
        duration: '15 мин',
        words: [
          { word: 'Семейство', translation: 'Aile', pronunciation: 'sɛˈmɛjstvo' },
          { word: 'Майка', translation: 'Anne', pronunciation: 'ˈmajkɐ' },
          { word: 'Баща', translation: 'Baba', pronunciation: 'ˈbɐʃtɐ' },
          { word: 'Сестра', translation: 'Kız kardeş', pronunciation: 'sɛˈstrɐ' },
          { word: 'Брат', translation: 'Erkek kardeş', pronunciation: 'brɐt' },
          { word: 'Дъщеря', translation: 'Kız', pronunciation: 'dɐʃˈtɛrjɐ' },
          { word: 'Син', translation: 'Oğul', pronunciation: 'sin' },
          { word: 'Бабушка', translation: 'Büyükanne', pronunciation: 'ˈbɐbuʃkɐ' },
          { word: 'Дядо', translation: 'Büyükbaba', pronunciation: 'ˈdjɐdo' }
        ]
      },
      {
        id: 5,
        title: 'Храни и Напитки',
        description: 'Основни храни и напитки на български',
        level: 'Начинаещ',
        duration: '18 мин',
        words: [
          { word: 'Хляб', translation: 'Ekmek', pronunciation: 'xljɐp' },
          { word: 'Мляко', translation: 'Süt', pronunciation: 'ˈmljɐko' },
          { word: 'Вода', translation: 'Su', pronunciation: 'voˈdɐ' },
          { word: 'Кафе', translation: 'Kahve', pronunciation: 'kɐˈfɛ' },
          { word: 'Чай', translation: 'Çay', pronunciation: 'tʃaj' },
          { word: 'Ябълка', translation: 'Elma', pronunciation: 'ˈjɐbɐlkɐ' },
          { word: 'Банан', translation: 'Muz', pronunciation: 'bɐˈnɐn' },
          { word: 'Месо', translation: 'Et', pronunciation: 'ˈmɛso' },
          { word: 'Риба', translation: 'Balık', pronunciation: 'ˈribɐ' },
          { word: 'Сирене', translation: 'Peynir', pronunciation: 'ˈsirɛnɛ' }
        ]
      }
    ]
  },
  italian: {
    name: 'Italian',
    nativeName: 'Italiano',
    code: 'it',
    flag: '🇮🇹',
    lessons: [
      {
        id: 1,
        title: 'Saluti di Base',
        description: 'Espressioni di saluto di base come ciao, come stai',
        level: 'Principiante',
        duration: '10 min',
        words: [
          { word: 'Ciao', translation: 'Merhaba', pronunciation: 'ˈtʃao' },
          { word: 'Arrivederci', translation: 'Güle güle', pronunciation: 'arriˈvedertʃi' },
          { word: 'Grazie', translation: 'Teşekkür ederim', pronunciation: 'ˈɡrattsje' },
          { word: 'Per favore', translation: 'Lütfen', pronunciation: 'per faˈvore' },
          { word: 'Sì', translation: 'Evet', pronunciation: 'si' },
          { word: 'No', translation: 'Hayır', pronunciation: 'no' },
          { word: 'Come stai?', translation: 'Nasılsın?', pronunciation: 'ˈkome ˈstai' },
          { word: 'Sto bene', translation: 'İyiyim', pronunciation: 'sto ˈbene' }
        ]
      }
    ]
  },
  portuguese: {
    name: 'Portuguese',
    nativeName: 'Português',
    code: 'pt',
    flag: '🇵🇹',
    lessons: [
      {
        id: 1,
        title: 'Saudações Básicas',
        description: 'Expressões básicas de saudação como olá, como está',
        level: 'Iniciante',
        duration: '10 min',
        words: [
          { word: 'Olá', translation: 'Merhaba', pronunciation: 'oˈla' },
          { word: 'Adeus', translation: 'Güle güle', pronunciation: 'ɐˈdewʃ' },
          { word: 'Obrigado', translation: 'Teşekkür ederim', pronunciation: 'obɾiˈɡadu' },
          { word: 'Por favor', translation: 'Lütfen', pronunciation: 'puɾ fɐˈvoɾ' },
          { word: 'Sim', translation: 'Evet', pronunciation: 'sĩ' },
          { word: 'Não', translation: 'Hayır', pronunciation: 'nɐ̃w' },
          { word: 'Como está?', translation: 'Nasılsın?', pronunciation: 'ˈkomu ɨʃˈta' },
          { word: 'Estou bem', translation: 'İyiyim', pronunciation: 'ɨʃˈto bɐ̃j' }
        ]
      }
    ]
  },
  russian: {
    name: 'Russian',
    nativeName: 'Русский',
    code: 'ru',
    flag: '🇷🇺',
    lessons: [
      {
        id: 1,
        title: 'Основные Приветствия',
        description: 'Основные приветствия как привет, как дела',
        level: 'Начинающий',
        duration: '10 мин',
        words: [
          { word: 'Привет', translation: 'Merhaba', pronunciation: 'prʲɪˈvʲet' },
          { word: 'До свидания', translation: 'Güle güle', pronunciation: 'də svʲɪˈdanʲɪjə' },
          { word: 'Спасибо', translation: 'Teşekkür ederim', pronunciation: 'spɐˈsʲibə' },
          { word: 'Пожалуйста', translation: 'Lütfen', pronunciation: 'pɐˈʐalʊstə' },
          { word: 'Да', translation: 'Evet', pronunciation: 'da' },
          { word: 'Нет', translation: 'Hayır', pronunciation: 'nʲet' },
          { word: 'Как дела?', translation: 'Nasılsın?', pronunciation: 'kak dʲɪˈla' },
          { word: 'Хорошо', translation: 'İyiyim', pronunciation: 'xərɐˈʂo' }
        ]
      }
    ]
  }
};

export const getLanguageByCode = (code) => {
  return Object.values(languages).find(lang => lang.code === code);
};

export const getAllLanguages = () => {
  return Object.values(languages);
};