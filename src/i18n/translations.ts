// ─── KisanAlert 360° – UI Translation Strings ───────────────────
// Supports: English | Hindi | Odia

export type Language = 'English' | 'Hindi' | 'Odia';

type Translations = {
  // Sidebar
  nav_dashboard: string;
  nav_digital_twin: string;
  nav_ai_insights: string;
  nav_disease: string;
  nav_voice: string;
  nav_community: string;
  nav_weather: string;
  nav_water: string;
  nav_impact: string;
  nav_notifications: string;
  nav_profile: string;
  nav_schemes: string;
  nav_reports: string;
  nav_settings: string;
  nav_core: string;
  nav_operations: string;
  nav_portal: string;
  // Header
  hdr_search_placeholder: string;
  hdr_live_stream: string;
  hdr_resume_stream: string;
  // Dashboard
  dash_title: string;
  dash_subtitle: string;
  dash_soil_moisture: string;
  dash_temperature: string;
  dash_humidity: string;
  dash_health: string;
  dash_nitrogen: string;
  dash_water_level: string;
  dash_ai_advisory: string;
  dash_water_saved: string;
  dash_electricity: string;
  dash_yield: string;
  // Voice
  voice_title: string;
  voice_subtitle: string;
  voice_listening: string;
  voice_processing: string;
  voice_click_mic: string;
  voice_presets: string;
  voice_farmer: string;
  voice_ai_response: string;
  // Disease
  disease_title: string;
  disease_subtitle: string;
  disease_upload: string;
  disease_browse: string;
  disease_presets: string;
  disease_download: string;
  disease_speak: string;
  // Settings
  settings_title: string;
  settings_dark_mode: string;
  settings_iot_interval: string;
  settings_voice_vol: string;
  settings_alerts: string;
  settings_reset: string;
  settings_save: string;
  // Profile
  profile_title: string;
  profile_name: string;
  profile_phone: string;
  profile_crop: string;
  profile_farm_size: string;
  profile_location: string;
  profile_save: string;
  // Notifications
  notif_title: string;
  notif_archive: string;
  notif_empty: string;
  // Weather
  weather_title: string;
  weather_search: string;
  weather_5day: string;
  // Schemes
  schemes_title: string;
  schemes_search: string;
  schemes_apply: string;
  schemes_eligibility: string;
  // Reports
  reports_title: string;
  reports_generate: string;
  reports_download: string;
  // Common
  btn_back: string;
  btn_save: string;
  btn_cancel: string;
  btn_refresh: string;
  lbl_status: string;
  lbl_live: string;
  lbl_optimal: string;
  lbl_warning: string;
};

const en: Translations = {
  nav_dashboard: 'Dashboard',
  nav_digital_twin: 'Digital Twin',
  nav_ai_insights: 'AI Insights',
  nav_disease: 'Disease Detection',
  nav_voice: 'Voice Assistant',
  nav_community: 'Community Intelligence',
  nav_weather: 'Weather',
  nav_water: 'Water Budget Planner',
  nav_impact: 'Impact Analytics',
  nav_notifications: 'Notifications',
  nav_profile: 'Farmer Profile',
  nav_schemes: 'Government Schemes',
  nav_reports: 'Reports',
  nav_settings: 'Settings',
  nav_core: 'Core System',
  nav_operations: 'Operations',
  nav_portal: 'Farmer Portal',
  hdr_search_placeholder: 'Search farm metrics, AI insights, schemes...',
  hdr_live_stream: 'Live Streaming',
  hdr_resume_stream: 'Resume stream',
  dash_title: 'Farm Command Center',
  dash_subtitle: "Your farm's real-time digital twin overview",
  dash_soil_moisture: 'Soil Moisture',
  dash_temperature: 'Temperature',
  dash_humidity: 'Humidity',
  dash_health: 'Health Score',
  dash_nitrogen: 'Nitrogen (N)',
  dash_water_level: 'Water Level',
  dash_ai_advisory: 'AI Advisory',
  dash_water_saved: 'Water Saved',
  dash_electricity: 'Electricity Saved',
  dash_yield: 'Yield Improvement',
  voice_title: 'Multilingual Voice AI Assistant',
  voice_subtitle: 'Ask farming queries and receive voice suggestions. Supported: English, Hindi, and Odia.',
  voice_listening: 'Listening to speech...',
  voice_processing: 'Processing AI advisory...',
  voice_click_mic: 'Click microphone to speak or use presets below',
  voice_presets: 'Voice Presets Simulator',
  voice_farmer: 'Farmer',
  voice_ai_response: 'Kisan AI Response',
  disease_title: 'AI Crop Leaf Diagnosis',
  disease_subtitle: 'Upload a photo of crop leaves. Gemini 1.5 Pro detects infections and suggests treatment plans.',
  disease_upload: 'Drag and drop leaf image',
  disease_browse: 'Browse Files',
  disease_presets: 'Demo Simulation Presets',
  disease_download: 'Download Report',
  disease_speak: 'Play Voice Summary',
  settings_title: 'System Settings',
  settings_dark_mode: 'Application Dark Mode',
  settings_iot_interval: 'GCP IoT Pub/Sub Sync Interval',
  settings_voice_vol: 'Voice Assistant Volume',
  settings_alerts: 'Critical Outbreak Alarms',
  settings_reset: 'Reset Baseline Data',
  settings_save: 'Save Configurations',
  profile_title: 'Farmer Profile Portal',
  profile_name: 'Full Name',
  profile_phone: 'Contact Number',
  profile_crop: 'Cropping Category',
  profile_farm_size: 'Farm Acreage',
  profile_location: 'Farm Location',
  profile_save: 'Save Profile Credentials',
  notif_title: 'System Notification Center',
  notif_archive: 'Archive All Alerts',
  notif_empty: 'No outstanding alerts from farm sensor grids.',
  weather_title: 'Hyper-Local Microclimate Forecast',
  weather_search: 'Search district...',
  weather_5day: '5-Day Outlook',
  schemes_title: 'Government Schemes Portal',
  schemes_search: 'Search schemes...',
  schemes_apply: 'Verify eligibility & Apply',
  schemes_eligibility: 'Eligibility Criteria',
  reports_title: 'AI Farm Reports',
  reports_generate: 'Generate New Report',
  reports_download: 'Download',
  btn_back: 'Return to Dashboard',
  btn_save: 'Save',
  btn_cancel: 'Cancel',
  btn_refresh: 'Refresh',
  lbl_status: 'Status',
  lbl_live: 'LIVE',
  lbl_optimal: 'OPTIMAL',
  lbl_warning: 'WARNING',
};

const hi: Translations = {
  nav_dashboard: 'डैशबोर्ड',
  nav_digital_twin: 'डिजिटल ट्विन',
  nav_ai_insights: 'AI सुझाव',
  nav_disease: 'रोग पहचान',
  nav_voice: 'वॉयस असिस्टेंट',
  nav_community: 'सामुदायिक सूचना',
  nav_weather: 'मौसम',
  nav_water: 'जल बजट योजनाकार',
  nav_impact: 'प्रभाव विश्लेषण',
  nav_notifications: 'सूचनाएं',
  nav_profile: 'किसान प्रोफ़ाइल',
  nav_schemes: 'सरकारी योजनाएं',
  nav_reports: 'रिपोर्ट',
  nav_settings: 'सेटिंग्स',
  nav_core: 'मुख्य प्रणाली',
  nav_operations: 'संचालन',
  nav_portal: 'किसान पोर्टल',
  hdr_search_placeholder: 'खेत मेट्रिक्स, AI सुझाव, योजनाएं खोजें...',
  hdr_live_stream: 'लाइव स्ट्रीमिंग',
  hdr_resume_stream: 'स्ट्रीम फिर शुरू करें',
  dash_title: 'खेत कमांड सेंटर',
  dash_subtitle: 'आपके खेत का रियल-टाइम डिजिटल ट्विन अवलोकन',
  dash_soil_moisture: 'मिट्टी की नमी',
  dash_temperature: 'तापमान',
  dash_humidity: 'आर्द्रता',
  dash_health: 'स्वास्थ्य स्कोर',
  dash_nitrogen: 'नाइट्रोजन (N)',
  dash_water_level: 'जल स्तर',
  dash_ai_advisory: 'AI सलाह',
  dash_water_saved: 'जल बचत',
  dash_electricity: 'बिजली बचत',
  dash_yield: 'उपज सुधार',
  voice_title: 'बहुभाषी वॉयस AI असिस्टेंट',
  voice_subtitle: 'खेती से जुड़े सवाल पूछें और आवाज में सुझाव पाएं। समर्थित: हिंदी, अंग्रेज़ी, और ओड़िया।',
  voice_listening: 'आवाज़ सुन रहा है...',
  voice_processing: 'AI सलाह प्रोसेस हो रही है...',
  voice_click_mic: 'बोलने के लिए माइक्रोफ़ोन दबाएं या नीचे से प्रीसेट चुनें',
  voice_presets: 'वॉयस प्रीसेट सिम्युलेटर',
  voice_farmer: 'किसान',
  voice_ai_response: 'किसान AI उत्तर',
  disease_title: 'AI फसल पत्ती निदान',
  disease_subtitle: 'फसल की पत्ती की फोटो अपलोड करें। Gemini 1.5 Pro संक्रमण का पता लगाएगा और उपचार सुझाएगा।',
  disease_upload: 'पत्ती की छवि खींचकर छोड़ें',
  disease_browse: 'फ़ाइल चुनें',
  disease_presets: 'डेमो सिमुलेशन प्रीसेट',
  disease_download: 'रिपोर्ट डाउनलोड करें',
  disease_speak: 'आवाज़ में सुनें',
  settings_title: 'सिस्टम सेटिंग्स',
  settings_dark_mode: 'डार्क मोड',
  settings_iot_interval: 'GCP IoT स्ट्रीम सिंक अंतराल',
  settings_voice_vol: 'वॉयस असिस्टेंट वॉल्यूम',
  settings_alerts: 'रोग प्रकोप अलर्ट',
  settings_reset: 'डेटा रीसेट करें',
  settings_save: 'सेटिंग्स सहेजें',
  profile_title: 'किसान प्रोफ़ाइल पोर्टल',
  profile_name: 'पूरा नाम',
  profile_phone: 'मोबाइल नंबर',
  profile_crop: 'फसल श्रेणी',
  profile_farm_size: 'खेत का आकार',
  profile_location: 'खेत का स्थान',
  profile_save: 'प्रोफ़ाइल सहेजें',
  notif_title: 'सूचना केंद्र',
  notif_archive: 'सभी अलर्ट संग्रहीत करें',
  notif_empty: 'कोई लंबित अलर्ट नहीं है।',
  weather_title: 'स्थानीय मौसम पूर्वानुमान',
  weather_search: 'जिला खोजें...',
  weather_5day: '5 दिन का अनुमान',
  schemes_title: 'सरकारी योजना पोर्टल',
  schemes_search: 'योजना खोजें...',
  schemes_apply: 'पात्रता जांचें और आवेदन करें',
  schemes_eligibility: 'पात्रता मापदंड',
  reports_title: 'AI खेत रिपोर्ट',
  reports_generate: 'नई रिपोर्ट बनाएं',
  reports_download: 'डाउनलोड',
  btn_back: 'डैशबोर्ड पर वापस जाएं',
  btn_save: 'सहेजें',
  btn_cancel: 'रद्द करें',
  btn_refresh: 'ताज़ा करें',
  lbl_status: 'स्थिति',
  lbl_live: 'लाइव',
  lbl_optimal: 'उत्तम',
  lbl_warning: 'चेतावनी',
};

const od: Translations = {
  nav_dashboard: 'ଡ୍ୟାସବୋର୍ଡ',
  nav_digital_twin: 'ଡିଜିଟାଲ ଟ୍ୱିନ',
  nav_ai_insights: 'AI ସୁଝାବ',
  nav_disease: 'ରୋଗ ଚିହ୍ନଟ',
  nav_voice: 'ଭଏସ ସହାୟକ',
  nav_community: 'ସାମୁଦାୟିକ ସୂଚନା',
  nav_weather: 'ପାଗ',
  nav_water: 'ଜଳ ବଜେଟ ଯୋଜନା',
  nav_impact: 'ପ୍ରଭାବ ବିଶ୍ଳେଷଣ',
  nav_notifications: 'ବିଜ୍ଞପ୍ତି',
  nav_profile: 'କୃଷକ ପ୍ରୋଫାଇଲ',
  nav_schemes: 'ସରକାରୀ ଯୋଜନା',
  nav_reports: 'ରିପୋର୍ଟ',
  nav_settings: 'ସେଟିଂ',
  nav_core: 'ମୂଳ ସିଷ୍ଟମ',
  nav_operations: 'ପରିଚାଳନା',
  nav_portal: 'କୃଷକ ପୋର୍ଟାଲ',
  hdr_search_placeholder: 'ଜମି ମେଟ୍ରିକ୍ସ, AI ସୁଝାବ, ଯୋଜନା ଖୋଜନ୍ତୁ...',
  hdr_live_stream: 'ଲାଇଭ ଷ୍ଟ୍ରିମ',
  hdr_resume_stream: 'ଷ୍ଟ୍ରିମ ଆରମ୍ଭ କରନ୍ତୁ',
  dash_title: 'ଜମି କ୍ମାଣ୍ଡ ସେଣ୍ଟର',
  dash_subtitle: 'ଆପଣଙ୍କ ଜମିର ରିଅଲ-ଟାଇମ ଡିଜିଟାଲ ଟ୍ୱିନ ଅବଲୋକନ',
  dash_soil_moisture: 'ମାଟି ଆଦ୍ରତା',
  dash_temperature: 'ତାପମାତ୍ରା',
  dash_humidity: 'ଆର୍ଦ୍ରତା',
  dash_health: 'ସ୍ବାସ୍ଥ୍ୟ ସ୍କୋର',
  dash_nitrogen: 'ନାଇଟ୍ରୋଜେନ (N)',
  dash_water_level: 'ଜଳ ସ୍ତର',
  dash_ai_advisory: 'AI ପରାମର୍ଶ',
  dash_water_saved: 'ଜଳ ସଂରକ୍ଷଣ',
  dash_electricity: 'ବିଦ୍ୟୁତ ସଞ୍ଚୟ',
  dash_yield: 'ଫସଲ ବୃଦ୍ଧି',
  voice_title: 'ବହୁଭାଷୀ ଭଏସ AI ସହାୟକ',
  voice_subtitle: 'ଚାଷ ସଂକ୍ରାନ୍ତ ପ୍ରଶ୍ନ ପଚାରନ୍ତୁ। ସମର୍ଥିତ: ଇଂରାଜୀ, ହିନ୍ଦୀ, ଏବଂ ଓଡ଼ିଆ।',
  voice_listening: 'ଭଏସ ଶୁଣୁଛି...',
  voice_processing: 'AI ପ୍ରକ୍ରିୟା ଚାଲୁଛି...',
  voice_click_mic: 'ମାଇକ ଦବାନ୍ତୁ ଅଥବା ତଳ ପ୍ରୀସେଟ ବ୍ୟବହାର କରନ୍ତୁ',
  voice_presets: 'ଭଏସ ପ୍ରୀସେଟ ସିମୁଲେଟର',
  voice_farmer: 'କୃଷକ',
  voice_ai_response: 'କିସାନ AI ଉତ୍ତର',
  disease_title: 'AI ଫସଲ ପତ୍ର ନିଦାନ',
  disease_subtitle: 'ଫସଲ ପତ୍ରର ଫଟୋ ଅପଲୋଡ କରନ୍ତୁ। Gemini 1.5 Pro ସଂକ୍ରମଣ ଚିହ୍ନଟ କରିବ।',
  disease_upload: 'ପତ୍ର ଛବି ଟ୍ରେ ଖଣ୍ଡ ଛୋଡ଼ନ୍ତୁ',
  disease_browse: 'ଫାଇଲ ଚୟନ',
  disease_presets: 'ଡେମୋ ସିମୁଲେସନ ପ୍ରୀସେଟ',
  disease_download: 'ରିପୋର୍ଟ ଡାଉନଲୋଡ',
  disease_speak: 'ଭଏସ ଶୁଣନ୍ତୁ',
  settings_title: 'ସିଷ୍ଟମ ସେଟିଂ',
  settings_dark_mode: 'ଡାର୍କ ମୋଡ',
  settings_iot_interval: 'IoT ଷ୍ଟ୍ରିମ ଅବଧି',
  settings_voice_vol: 'ଭଏସ ଭଲ୍ୟୁମ',
  settings_alerts: 'ରୋଗ ଆଲର୍ଟ',
  settings_reset: 'ଡାଟା ରିସେଟ',
  settings_save: 'ସେଟିଂ ସଂରକ୍ଷଣ',
  profile_title: 'କୃଷକ ପ୍ରୋଫାଇଲ ପୋର୍ଟାଲ',
  profile_name: 'ପୂରା ନାମ',
  profile_phone: 'ମୋବାଇଲ ନମ୍ବର',
  profile_crop: 'ଫସଲ ଶ୍ରେଣୀ',
  profile_farm_size: 'ଜମି ଆକାର',
  profile_location: 'ଜମି ଅବସ୍ଥାନ',
  profile_save: 'ପ୍ରୋଫାଇଲ ସଂରକ୍ଷଣ',
  notif_title: 'ବିଜ୍ଞପ୍ତି କେନ୍ଦ୍ର',
  notif_archive: 'ସମସ୍ତ ଆଲର୍ଟ ଆର୍କାଇଭ',
  notif_empty: 'ଜମି ସେନ୍ସରରୁ ଅପ୍ରସ୍ତୁତ ଆଲର୍ଟ ନାହିଁ।',
  weather_title: 'ସ୍ଥାନୀୟ ପାଗ ଅନୁମାନ',
  weather_search: 'ଜିଲ୍ଲା ଖୋଜନ୍ତୁ...',
  weather_5day: '୫ ଦିନ ଅଭିଦୃଷ୍ଟି',
  schemes_title: 'ସରକାରୀ ଯୋଜନା ପୋର୍ଟାଲ',
  schemes_search: 'ଯୋଜନା ଖୋଜନ୍ତୁ...',
  schemes_apply: 'ଯୋଗ୍ୟତା ଯାଞ୍ଚ ଏବଂ ଆବେଦନ',
  schemes_eligibility: 'ଯୋଗ୍ୟତା ମାନଦଣ୍ଡ',
  reports_title: 'AI ଜମି ରିପୋର୍ଟ',
  reports_generate: 'ନୂଆ ରିପୋର୍ଟ ତୈୟାର',
  reports_download: 'ଡାଉନଲୋଡ',
  btn_back: 'ଡ୍ୟାସବୋର୍ଡ କୁ ଫେରନ୍ତୁ',
  btn_save: 'ସଂରକ୍ଷଣ',
  btn_cancel: 'ବାତିଲ',
  btn_refresh: 'ରିଫ୍ରେଶ',
  lbl_status: 'ସ୍ଥିତି',
  lbl_live: 'ଲାଇଭ',
  lbl_optimal: 'ଉତ୍ତମ',
  lbl_warning: 'ଚେତାବନୀ',
};

export const allTranslations: Record<Language, Translations> = { English: en, Hindi: hi, Odia: od };

export function useTranslations(lang: Language): Translations {
  return allTranslations[lang] ?? en;
}
