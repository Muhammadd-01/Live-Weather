export type Translations = {
  [key: string]: string
  weatherAlerts: string
}

export type Language = "en" | "es" | "fr" | "de" | "ja" | "zh" | "ru" | "ar" | "hi" | "ur"

export const translations: { [key in Language]: Translations } = {
  en: {
    settings: "Settings",
    appearance: "Appearance",
    theme: "Theme",
    themeDescription: "Choose between light and dark mode",
    toggleTheme: "Toggle theme",
    units: "Units",
    metric: "Metric",
    metricDescription: "Use Celsius for temperature",
    imperial: "Imperial",
    imperialDescription: "Use Fahrenheit for temperature",
    notifications: "Notifications",
    weatherAlerts: "Weather Alerts",
    weatherAlertsDescription: "Receive notifications for severe weather",
    toggleNotifications: "Toggle notifications",
    language: "Language",
    selectLanguage: "Select Language",
    english: "English",
    spanish: "Spanish",
    french: "French",
    german: "German",
    japanese: "Japanese",
    chinese: "Chinese",
    russian: "Russian",
    arabic: "Arabic",
    hindi: "Hindi",
    search: "Search",
    currentWeather: "Current Weather",
    feelsLike: "Feels Like",
    humidity: "Humidity",
    wind: "Wind",
    pressure: "Pressure",
    visibility: "Visibility",
    sunrise: "Sunrise",
    sunset: "Sunset",
    hourlyForecast: "Hourly Forecast",
    weeklyForecast: "5-Day Forecast",
    home: "Home",
    forecast: "Forecast",
    news: "News",
    emergency: "Emergency",
    about: "About",
    switchToLightMode: "Switch to light mode",
    switchToDarkMode: "Switch to dark mode",
    toggleSearch: "Toggle search",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    viewFullForecast: "View Full Forecast",
    weatherAlert: "Weather Alert",
    weatherMap: "Weather Map",
    footerAbout: "Weather App provides real-time weather information to help you plan your day and stay safe.",
    quickLinks: "Quick Links",
    connect: "Connect",
    allRightsReserved: "All rights reserved.",
    weatherDetails: "Weather Details",
    windSpeed: "Wind Speed",
    windDirection: "Wind Direction",
    precipitation: "Precipitation",
  },
  es: {
    settings: "Configuraciones",
    appearance: "Apariencia",
    theme: "Tema",
    themeDescription: "Elige entre modo claro y oscuro",
    toggleTheme: "Alternar tema",
    units: "Unidades",
    metric: "Métrico",
    metricDescription: "Usar Celsius para la temperatura",
    imperial: "Imperial",
    imperialDescription: "Usar Fahrenheit para la temperatura",
    notifications: "Notificaciones",
    weatherAlerts: "Alertas meteorológicas",
    weatherAlertsDescription: "Recibe notificaciones sobre clima severo",
    toggleNotifications: "Activar/desactivar notificaciones",
    language: "Idioma",
    selectLanguage: "Seleccionar idioma",
    english: "Inglés",
    spanish: "Español",
    french: "Francés",
    german: "Alemán",
    japanese: "Japonés",
    chinese: "Chino",
    russian: "Ruso",
    arabic: "Árabe",
    hindi: "Hindi",
    search: "Buscar",
    currentWeather: "Clima actual",
    feelsLike: "Sensación térmica",
    humidity: "Humedad",
    wind: "Viento",
    pressure: "Presión",
    visibility: "Visibilidad",
    sunrise: "Amanecer",
    sunset: "Atardecer",
    hourlyForecast: "Pronóstico por hora",
    weeklyForecast: "Pronóstico de 5 días",
    home: "Inicio",
    forecast: "Pronóstico",
    news: "Noticias",
    emergency: "Emergencia",
    about: "Acerca de",
    switchToLightMode: "Cambiar a modo claro",
    switchToDarkMode: "Cambiar a modo oscuro",
    toggleSearch: "Activar/desactivar búsqueda",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    viewFullForecast: "Ver pronóstico completo",
    weatherAlert: "Alerta meteorológica",
    weatherMap: "Mapa meteorológico",
    footerAbout: "La aplicación del clima proporciona información meteorológica en tiempo real para ayudarte a planificar tu día y mantenerte seguro.",
    quickLinks: "Enlaces rápidos",
    connect: "Conectar",
    allRightsReserved: "Todos los derechos reservados.",
    weatherDetails: "Detalles del clima",
    windSpeed: "Velocidad del viento",
    windDirection: "Dirección del viento",
    precipitation: "Precipitación",
  },
  fr: {
    settings: "Paramètres",
    appearance: "Apparence",
    theme: "Thème",
    themeDescription: "Choisissez entre le mode clair et sombre",
    toggleTheme: "Changer de thème",
    units: "Unités",
    metric: "Métrique",
    metricDescription: "Utiliser Celsius pour la température",
    imperial: "Impérial",
    imperialDescription: "Utiliser Fahrenheit pour la température",
    notifications: "Notifications",
    weatherAlerts: "Alertes météo",
    weatherAlertsDescription: "Recevez des notifications pour les intempéries",
    toggleNotifications: "Activer/désactiver les notifications",
    language: "Langue",
    selectLanguage: "Sélectionner la langue",
    english: "Anglais",
    spanish: "Espagnol",
    french: "Français",
    german: "Allemand",
    japanese: "Japonais",
    chinese: "Chinois",
    russian: "Russe",
    arabic: "Arabe",
    hindi: "Hindi",
    search: "Rechercher",
    currentWeather: "Météo actuelle",
    feelsLike: "Ressenti",
    humidity: "Humidité",
    wind: "Vent",
    pressure: "Pression",
    visibility: "Visibilité",
    sunrise: "Lever du soleil",
    sunset: "Coucher du soleil",
    hourlyForecast: "Prévisions horaires",
    weeklyForecast: "Prévisions sur 5 jours",
    home: "Accueil",
    forecast: "Prévisions",
    news: "Actualités",
    emergency: "Urgence",
    about: "À propos",
    switchToLightMode: "Passer en mode clair",
    switchToDarkMode: "Passer en mode sombre",
    toggleSearch: "Activer/désactiver la recherche",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    viewFullForecast: "Voir les prévisions complètes",
    weatherAlert: "Alerte météo",
    weatherMap: "Carte météo",
    footerAbout: "L'application météo fournit des informations météorologiques en temps réel pour vous aider à organiser votre journée et rester en sécurité.",
    quickLinks: "Liens rapides",
    connect: "Se connecter",
    allRightsReserved: "Tous droits réservés.",
    weatherDetails: "Détails de la météo",
    windSpeed: "Vitesse du vent",
    windDirection: "Direction du vent",
    precipitation: "Précipitations",
  },
  de: {
    settings: "Einstellungen",
    appearance: "Darstellung",
    theme: "Thema",
    themeDescription: "Wählen Sie zwischen hellem und dunklem Modus",
    toggleTheme: "Thema umschalten",
    units: "Einheiten",
    metric: "Metrisch",
    metricDescription: "Verwenden Sie Celsius für die Temperatur",
    imperial: "Imperial",
    imperialDescription: "Verwenden Sie Fahrenheit für die Temperatur",
    notifications: "Benachrichtigungen",
    weatherAlerts: "Wetterwarnungen",
    weatherAlertsDescription: "Benachrichtigungen bei schwerem Wetter erhalten",
    toggleNotifications: "Benachrichtigungen umschalten",
    language: "Sprache",
    selectLanguage: "Sprache auswählen",
    english: "Englisch",
    spanish: "Spanisch",
    french: "Französisch",
    german: "Deutsch",
    japanese: "Japanisch",
    chinese: "Chinesisch",
    russian: "Russisch",
    arabic: "Arabisch",
    hindi: "Hindi",
    search: "Suche",
    currentWeather: "Aktuelles Wetter",
    feelsLike: "Gefühlt wie",
    humidity: "Luftfeuchtigkeit",
    wind: "Wind",
    pressure: "Luftdruck",
    visibility: "Sichtweite",
    sunrise: "Sonnenaufgang",
    sunset: "Sonnenuntergang",
    hourlyForecast: "Stündliche Vorhersage",
    weeklyForecast: "5-Tage-Vorhersage",
    home: "Startseite",
    forecast: "Vorhersage",
    news: "Nachrichten",
    emergency: "Notfall",
    about: "Über",
    switchToLightMode: "Zum hellen Modus wechseln",
    switchToDarkMode: "Zum dunklen Modus wechseln",
    toggleSearch: "Suche umschalten",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    viewFullForecast: "Vollständige Vorhersage anzeigen",
    weatherAlert: "Wetterwarnung",
    weatherMap: "Wetterkarte",
    footerAbout: "Die Wetter-App bietet Echtzeit-Wetterinformationen, um Ihnen bei der Planung Ihres Tages zu helfen und Sie sicher zu halten.",
    quickLinks: "Schnellzugriff",
    connect: "Verbinden",
    allRightsReserved: "Alle Rechte vorbehalten.",
    weatherDetails: "Wetterdetails",
    windSpeed: "Windgeschwindigkeit",
    windDirection: "Windrichtung",
    precipitation: "Niederschlag",
},
ja: {
  settings: "設定",
  appearance: "外観",
  theme: "テーマ",
  themeDescription: "ライトモードとダークモードを選択",
  toggleTheme: "テーマを切り替え",
  units: "単位",
  metric: "メートル法",
  metricDescription: "温度に摂氏を使用",
  imperial: "インペリアル",
  imperialDescription: "温度に華氏を使用",
  notifications: "通知",
  weatherAlerts: "天気警報",
  weatherAlertsDescription: "悪天候の通知を受け取る",
  toggleNotifications: "通知を切り替え",
  language: "言語",
  selectLanguage: "言語を選択",
  english: "英語",
  spanish: "スペイン語",
  french: "フランス語",
  german: "ドイツ語",
  japanese: "日本語",
  chinese: "中国語",
  russian: "ロシア語",
  arabic: "アラビア語",
  hindi: "ヒンディー語",
  search: "検索",
  currentWeather: "現在の天気",
  feelsLike: "体感温度",
  humidity: "湿度",
  wind: "風",
  pressure: "気圧",
  visibility: "視程",
  sunrise: "日の出",
  sunset: "日没",
  hourlyForecast: "1時間ごとの予報",
  weeklyForecast: "5日間の予報",
  home: "ホーム",
  forecast: "予報",
  news: "ニュース",
  emergency: "緊急",
  about: "について",
  switchToLightMode: "ライトモードに切り替え",
  switchToDarkMode: "ダークモードに切り替え",
  toggleSearch: "検索を切り替え",
  openMenu: "メニューを開く",
  closeMenu: "メニューを閉じる",
  viewFullForecast: "詳細な予報を見る",
  weatherAlert: "天気警報",
  weatherMap: "天気図",
  footerAbout: "天気アプリは、リアルタイムの天気情報を提供し、あなたの一日を計画し、安全を守るのに役立ちます。",
  quickLinks: "クイックリンク",
  connect: "接続",
  allRightsReserved: "全著作権所有。",
  weatherDetails: "天気の詳細",
  windSpeed: "風速",
  windDirection: "風向",
  precipitation: "降水量",
},
  zh: {
    settings: "设置",
    appearance: "外观",
    theme: "主题",
    themeDescription: "选择浅色或深色模式",
    toggleTheme: "切换主题",
    units: "单位",
    metric: "公制",
    metricDescription: "使用摄氏度表示温度",
    imperial: "英制",
    imperialDescription: "使用华氏度表示温度",
    notifications: "通知",
    weatherAlerts: "天气警报",
    weatherAlertsDescription: "接收恶劣天气通知",
    toggleNotifications: "切换通知",
    language: "语言",
    selectLanguage: "选择语言",
    english: "英语",
    spanish: "西班牙语",
    french: "法语",
    german: "德语",
    japanese: "日语",
    chinese: "中文",
    russian: "俄语",
    arabic: "阿拉伯语",
    hindi: "印地语",
    search: "搜索",
    currentWeather: "当前天气",
    feelsLike: "体感温度",
    humidity: "湿度",
    wind: "风速",
    pressure: "气压",
    visibility: "能见度",
    sunrise: "日出",
    sunset: "日落",
    hourlyForecast: "每小时预报",
    weeklyForecast: "5天预报",
    home: "首页",
    forecast: "预报",
    news: "新闻",
    emergency: "紧急情况",
    about: "关于",
    switchToLightMode: "切换到浅色模式",
    switchToDarkMode: "切换到深色模式",
    toggleSearch: "切换搜索",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    weatherAlerts: "天气警报",
    precipitation: "Precipitation",
    windDirection: "Wind Direction",
  },
  ru: {
    settings: "Настройки",
    appearance: "Внешний вид",
    theme: "Тема",
    themeDescription: "Выберите между светлым и темным режимом",
    toggleTheme: "Переключить тему",
    units: "Единицы измерения",
    metric: "Метрические",
    metricDescription: "Использовать градусы Цельсия для температуры",
    imperial: "Имперские",
    imperialDescription: "Использовать градусы Фаренгейта для температуры",
    notifications: "Уведомления",
    weatherAlerts: "Погодные оповещения",
    weatherAlertsDescription: "Получать уведомления о суровой погоде",
    toggleNotifications: "Переключить уведомления",
    language: "Язык",
    selectLanguage: "Выбрать язык",
    english: "Английский",
    spanish: "Испанский",
    french: "Французский",
    german: "Немецкий",
    japanese: "Японский",
    chinese: "Китайский",
    russian: "Русский",
    arabic: "Арабский",
    hindi: "Хинди",
    search: "Поиск",
    currentWeather: "Текущая погода",
    feelsLike: "Ощущается как",
    humidity: "Влажность",
    wind: "Ветер",
    pressure: "Давление",
    visibility: "Видимость",
    sunrise: "Восход",
    sunset: "Закат",
    hourlyForecast: "Почасовой прогноз",
    weeklyForecast: "Прогноз на 5 дней",
    home: "Главная",
    forecast: "Прогноз",
    news: "Новости",
    emergency: "Чрезвычайные ситуации",
    about: "О нас",
    switchToLightMode: "Переключить на светлый режим",
    switchToDarkMode: "Переключить на темный режим",
    toggleSearch: "Переключить поиск",
    openMenu: "Открыть меню",
    closeMenu: "Закрыть меню",
    weatherAlerts: "Погодные оповещения",
    precipitation: "Precipitation",
    windDirection: "Wind Direction",
  },
  ar: {
    settings: "الإعدادات",
    appearance: "المظهر",
    theme: "السمة",
    themeDescription: "اختر بين الوضع الفاتح والداكن",
    toggleTheme: "تبديل السمة",
    units: "الوحدات",
    metric: "متري",
    metricDescription: "استخدام درجة مئوية للحرارة",
    imperial: "إمبراطوري",
    imperialDescription: "استخدام فهرنهايت للحرارة",
    notifications: "الإشعارات",
    weatherAlerts: "تنبيهات الطقس",
    weatherAlertsDescription: "تلقي إشعارات عن الطقس القاسي",
    toggleNotifications: "تبديل الإشعارات",
    language: "اللغة",
    selectLanguage: "اختر اللغة",
    english: "الإنجليزية",
    spanish: "الإسبانية",
    french: "الفرنسية",
    german: "الألمانية",
    japanese: "اليابانية",
    chinese: "الصينية",
    russian: "الروسية",
    arabic: "العربية",
    hindi: "الهندية",
    search: "بحث",
    currentWeather: "الطقس الحالي",
    feelsLike: "الشعور كأنه",
    humidity: "الرطوبة",
    wind: "الرياح",
    pressure: "الضغط",
    visibility: "الرؤية",
    sunrise: "شروق الشمس",
    sunset: "غروب الشمس",
    hourlyForecast: "التوقعات الساعية",
    weeklyForecast: "توقعات 5 أيام",
    home: "الرئيسية",
    forecast: "التوقعات",
    news: "الأخبار",
    emergency: "الطوارئ",
    about: "حول",
    switchToLightMode: "التبديل إلى الوضع الفاتح",
    switchToDarkMode: "التبديل إلى الوضع الداكن",
    toggleSearch: "تبديل البحث",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    weatherAlerts: "تنبيهات الطقس",
    precipitation: "Precipitation",
    windDirection: "Wind Direction",
  },
  hi: {
    settings: "सेटिंग्स",
    appearance: "दिखावट",
    theme: "थीम",
    themeDescription: "लाइट और डार्क मोड के बीच चुनें",
    toggleTheme: "थीम टॉगल करें",
    units: "इकाइयाँ",
    metric: "मेट्रिक",
    metricDescription: "तापमान के लिए सेल्सियस का उपयोग करें",
    imperial: "इम्पीरियल",
    imperialDescription: "तापमान के लिए फ़ारेनहाइट का उपयोग करें",
    notifications: "सूचनाएँ",
    weatherAlerts: "मौसम चेतावनियाँ",
    weatherAlertsDescription: "गंभीर मौसम के लिए सूचनाएँ प्राप्त करें",
    toggleNotifications: "सूचनाएँ टॉगल करें",
    language: "भाषा",
    selectLanguage: "भाषा चुनें",
    english: "अंग्रेज़ी",
    spanish: "स्पेनिश",
    french: "फ्रेंच",
    german: "जर्मन",
    japanese: "जापानी",
    chinese: "चीनी",
    russian: "रूसी",
    arabic: "अरबी",
    hindi: "हिंदी",
    search: "खोज",
    currentWeather: "वर्तमान मौसम",
    feelsLike: "अनुभव",
    humidity: "आर्द्रता",
    wind: "हवा",
    pressure: "दबाव",
    visibility: "दृश्यता",
    sunrise: "सूर्योदय",
    sunset: "सूर्यास्त",
    hourlyForecast: "घंटेवार पूर्वानुमान",
    weeklyForecast: "5-दिवसीय पूर्वानुमान",
    home: "होम",
    forecast: "पूर्वानुमान",
    news: "समाचार",
    emergency: "आपातकाल",
    about: "हमारे बारे में",
    switchToLightMode: "लाइट मोड में स्विच करें",
    switchToDarkMode: "डार्क मोड में स्विच करें",
    toggleSearch: "खोज टॉगल करें",
    openMenu: "मेनू खोलें",
    closeMenu: "मेनू बंद करें",
    weatherAlerts: "मौसम चेतावनियाँ",
    precipitation: "Precipitation",
    windDirection: "Wind Direction",
  },
  ur: {
    settings: "ترتیبات",
    appearance: "ظاہری شکل",
    theme: "تھیم",
    themeDescription: "لائٹ اور ڈارک موڈ کے درمیان انتخاب کریں",
    toggleTheme: "تھیم تبدیل کریں",
    units: "یونٹس",
    metric: "میٹرک",
    metricDescription: "درجہ حرارت کے لیے سیلسیس استعمال کریں",
    imperial: "امپیریل",
    imperialDescription: "درجہ حرارت کے لیے فارن ہائٹ استعمال کریں",
    notifications: "اطلاعات",
    weatherAlerts: "موسمی انتباہات",
    weatherAlertsDescription: "شدید موسم کے لیے اطلاعات وصول کریں",
    toggleNotifications: "اطلاعات کو ٹوگل کریں",
    language: "زبان",
    selectLanguage: "زبان منتخب کریں",
    english: "انگریزی",
    spanish: "ہسپانوی",
    french: "فرانسیسی",
    german: "جرمن",
    japanese: "جاپانی",
    chinese: "چینی",
    russian: "روسی",
    arabic: "عربی",
    hindi: "ہندی",
    urdu: "اردو",
    search: "تلاش کریں",
    currentWeather: "موجودہ موسم",
    feelsLike: "محسوس ہوتا ہے",
    humidity: "نمی",
    wind: "ہوا",
    pressure: "دباؤ",
    visibility: "رویت",
    sunrise: "طلوع آفتاب",
    sunset: "غروب آفتاب",
    hourlyForecast: "گھنٹہ وار پیش گوئی",
    weeklyForecast: "5 روزہ پیش گوئی",
    home: "ہوم",
    forecast: "پیش گوئی",
    news: "خبریں",
    emergency: "ہنگامی صورتحال",
    about: "ہمارے بارے میں",
    switchToLightMode: "لائٹ موڈ پر سوئچ کریں",
    switchToDarkMode: "ڈارک موڈ پر سوئچ کریں",
    toggleSearch: "تلاش کو ٹوگل کریں",
    openMenu: "مینو کھولیں",
    closeMenu: "مینو بند کریں",
    viewFullForecast: "مکمل پیش گوئی دیکھیں",
    weatherAlert: "موسمی انتباہ",
    weatherMap: "موسمی نقشہ",
    footerAbout:
      "موسم ایپ آپ کو اپنے دن کی منصوبہ بندی اور محفوظ رہنے میں مدد کے لیے حقیقی وقت کی موسمی معلومات فراہم کرتا ہے۔",
    quickLinks: "فوری لنکس",
    connect: "رابطہ کریں",
    allRightsReserved: "جملہ حقوق محفوظ ہیں۔",
    weatherAlerts: "موسمی انتباہات",
    precipitation: "Precipitation",
    windDirection: "Wind Direction",
  },
}

