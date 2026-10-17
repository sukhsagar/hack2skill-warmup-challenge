import { Language } from '@/types';

export interface CommunityHelpDictionary {
  pageTitle: string;
  pageSubtitle: string;
  tabLegal: string;
  tabMedical: string;
  tabRequests: string;
  tabSafety: string;

  // Persistence banner
  storageLocalNotice: string;
  cloudNotConnectedBadge: string;
  localStorageActiveBadge: string;

  // Emergency banner
  emergencyHeading: string;
  emergencyNotice: string;
  callAmbulance: string;
  callEmergency: string;

  // Legal Help form
  legalFormTitle: string;
  legalFormDesc: string;
  categoryLabel: string;
  cityLabel: string;
  cityPlaceholder: string;
  cityHint: string;
  languageLabel: string;
  urgencyLabel: string;
  urgencyRoutine: string;
  urgencyUrgent: string;
  urgencyImmediate: string;
  summaryLabel: string;
  summaryPlaceholder: string;
  summaryHint: string;
  sensitiveDataWarning: string;
  legalConsentLabel: string;
  legalDisclaimer: string;
  submitLegalBtn: string;

  // Medical Aid form
  medicalFormTitle: string;
  medicalFormDesc: string;
  medicalCategoryLabel: string;
  contactPrefLabel: string;
  contactInApp: string;
  contactPhoneRelay: string;
  contactEmailRelay: string;
  medicalDetailsLabel: string;
  medicalDetailsPlaceholder: string;
  medicalDetailsHint: string;
  medicalConsentLabel: string;
  medicalDisclaimer: string;
  submitMedicalBtn: string;

  // Status & Requests
  myRequestsTab: string;
  sampleRequestsTab: string;
  sampleBadge: string;
  noRequestsTitle: string;
  noRequestsDesc: string;
  createRequestBtn: string;
  closeRequestBtn: string;
  markResolvedBtn: string;
  deleteBtn: string;
  statusOpen: string;
  statusInReview: string;
  statusResolved: string;
  statusClosed: string;

  // Feedback messages
  submitting: string;
  submittedSuccess: string;
  submittedNote: string;
  submitError: string;
  closedSuccess: string;
}

export const communityI18n: Record<Language, CommunityHelpDictionary> = {
  en: {
    pageTitle: 'Community Help',
    pageSubtitle: 'Request peer support, voluntary legal direction, and practical medical aid without bureaucracy.',
    tabLegal: 'Legal Help',
    tabMedical: 'Medical Aid',
    tabRequests: 'My Requests',
    tabSafety: 'Safety & Disclaimers',

    storageLocalNotice:
      'Shared cloud service (Firestore) is not connected. All requests below are securely stored on your device only.',
    cloudNotConnectedBadge: 'Cloud Sync: Offline',
    localStorageActiveBadge: 'Device Storage: Active',

    emergencyHeading: 'In an Emergency? Call 112 or 108 Immediately',
    emergencyNotice:
      'Awaaz is NOT an emergency dispatch or hospital service. If you are experiencing acute trauma, severe bleeding, or chest pain, please call emergency services immediately.',
    callAmbulance: 'Call Ambulance (108 / 102)',
    callEmergency: 'National Emergency (112)',

    legalFormTitle: 'Request Legal Guidance',
    legalFormDesc:
      'Post a non-confidential overview of your platform dispute to receive voluntary peer and paralegal direction.',
    categoryLabel: 'Issue Category',
    cityLabel: 'City / Region',
    cityPlaceholder: 'e.g., Bengaluru North, South Delhi',
    cityHint: 'Do not provide full street addresses or pin codes. City or district is sufficient.',
    languageLabel: 'Preferred Language for Help',
    urgencyLabel: 'Urgency Level',
    urgencyRoutine: 'Standard (within 3-5 days)',
    urgencyUrgent: 'Urgent (needs attention within 24-48 hrs)',
    urgencyImmediate: 'Time-Sensitive Dispute (e.g., imminent hearing)',
    summaryLabel: 'Short Summary of Dispute',
    summaryPlaceholder:
      'Explain what happened (e.g., ID blocked after customer dispute, ₹1,800 rain incentive deducted). Do NOT include bank account numbers, passwords, OTPs, or Aadhaar numbers.',
    summaryHint: 'Keep this concise and factual. Confidential case documents can be shared later via direct consultation.',
    sensitiveDataWarning: 'Warning: Please remove bank account numbers, OTPs, or 12-digit Aadhaar numbers from this public summary.',
    legalConsentLabel:
      'I consent to sharing this non-confidential summary with community volunteers. I understand this does not constitute legal representation, attorney-client privilege, or a guaranteed outcome.',
    legalDisclaimer:
      'Notice: Awaaz is an open peer assistance initiative. Community volunteers and contributors are not retained counsel. No formal legal representation is formed through this request.',
    submitLegalBtn: 'Submit Legal Help Request',

    medicalFormTitle: 'Request Practical Medical Aid',
    medicalFormDesc:
      'Request non-critical practical assistance (e.g. road accident support, hospital navigation, or emergency fund guidance).',
    medicalCategoryLabel: 'Type of Medical Support Needed',
    contactPrefLabel: 'Preferred Volunteer Contact Method',
    contactInApp: 'In-App Message (Recommended for Privacy)',
    contactPhoneRelay: 'Phone Relay (Via Community Coordinator)',
    contactEmailRelay: 'Email Notification',
    medicalDetailsLabel: 'Describe Practical Help Needed',
    medicalDetailsPlaceholder:
      'Describe the assistance required (e.g., need help filing platform rider accident claim form, need directions to public hospital ER). Do not post sensitive personal diagnoses or medical history.',
    medicalDetailsHint: 'Never post medical prescriptions, private diagnostic reports, or patient identification cards.',
    medicalConsentLabel:
      'I consent to sharing this basic request with community aid helpers. I acknowledge Awaaz is NOT an emergency response service.',
    medicalDisclaimer:
      'Notice: Community aid volunteers provide practical logistics and peer solidarity only. We do not provide clinical diagnoses, medical prescriptions, or emergency dispatch services.',
    submitMedicalBtn: 'Submit Medical Aid Request',

    myRequestsTab: 'My Saved Requests',
    sampleRequestsTab: 'Example Community Feed (Demo)',
    sampleBadge: 'DEMO SAMPLE ONLY',
    noRequestsTitle: 'No Requests Found',
    noRequestsDesc: 'You have not submitted any community help requests on this device yet.',
    createRequestBtn: 'Create a New Request',
    closeRequestBtn: 'Close Request',
    markResolvedBtn: 'Mark as Resolved',
    deleteBtn: 'Delete Record',
    statusOpen: 'Open',
    statusInReview: 'In Review',
    statusResolved: 'Resolved',
    statusClosed: 'Closed',

    submitting: 'Saving request to local device...',
    submittedSuccess: 'Request recorded successfully on this device.',
    submittedNote:
      'Note: Because cloud database sync is not currently configured, this request exists on this browser only and has not been broadcast externally.',
    submitError: 'Failed to save request. Please verify device storage permissions and try again.',
    closedSuccess: 'Request status updated successfully.',
  },

  hi: {
    pageTitle: 'कम्युनिटी सहायता (Community Help)',
    pageSubtitle: 'साथी मज़दूरों, स्वयंसेवकों और कानूनी सलाहकारों से पारदर्शी मदद प्राप्त करें।',
    tabLegal: 'कानूनी मदद (Legal Help)',
    tabMedical: 'चिकित्सा सहायता (Medical Aid)',
    tabRequests: 'मेरी अर्जियां (My Requests)',
    tabSafety: 'सुरक्षा और नियम',

    storageLocalNotice:
      'साझा क्लाउड सेवा (Firestore) वर्तमान में कनेक्टेड नहीं है। सभी अर्जियां आपके इसी डिवाइस पर सुरक्षित रूप से सेव हैं।',
    cloudNotConnectedBadge: 'क्लाउड सिंक: ऑफलाइन',
    localStorageActiveBadge: 'डिवाइस स्टोरेज: सक्रिय',

    emergencyHeading: 'आपातकाल में तुरंत 112 या 108 पर कॉल करें',
    emergencyNotice:
      'आवाज़ कोई आपातकालीन एम्बुलेंस या अस्पताल सेवा नहीं है। यदि कोई गंभीर दुर्घटना या जानलेवा स्थिति है, तो तुरंत आपातकालीन नंबरों पर संपर्क करें।',
    callAmbulance: 'एम्बुलेंस कॉल करें (108 / 102)',
    callEmergency: 'राष्ट्रीय आपातकालीन सेवा (112)',

    legalFormTitle: 'कानूनी मार्गदर्शन का अनुरोध',
    legalFormDesc: 'प्लेटफॉर्म से जुड़े विवाद (आईडी ब्लॉक, पेआउट कटौती) के लिए साथी सलाहकारों से मार्गदर्शन पाएं।',
    categoryLabel: 'समस्या का प्रकार',
    cityLabel: 'शहर / ज़िला',
    cityPlaceholder: 'उदा. उत्तर बेंगलुरु, दक्षिण दिल्ली',
    cityHint: 'घर का पूरा पता या पिनकोड न डालें। केवल शहर या क्षेत्र का नाम काफी है।',
    languageLabel: 'सहायता के लिए पसंदीदा भाषा',
    urgencyLabel: 'ज़रूरत की तात्कालिकता',
    urgencyRoutine: 'सामान्य (3-5 दिनों में)',
    urgencyUrgent: 'ज़रूरी (24-48 घंटों में)',
    urgencyImmediate: 'अत्यंत आवश्यक (समय सीमा समाप्त हो रही है)',
    summaryLabel: 'समस्या का संक्षिप्त विवरण',
    summaryPlaceholder:
      'क्या हुआ था बताएं (उदा. कस्टमर विवाद के बाद आईडी सस्पेंड, ₹1500 की अनुचित कटौती)। कृपया बैंक खाता, आधार नंबर या पासवर्ड न लिखें।',
    summaryHint: 'संक्षिप्त और स्पष्ट रखें। गोपनीय दस्तावेज़ सार्वजनिक विवरण में न डालें।',
    sensitiveDataWarning: 'चेतावनी: कृपया इस विवरण से बैंक खाता, ओटीपी या 12 अंकों का आधार नंबर हटा लें।',
    legalConsentLabel:
      'मैं इस सामान्य विवरण को कम्युनिटी सलाहकारों के साथ साझा करने की सहमति देता/देती हूँ। मैं समझता हूँ कि यह औपचारिक अदालती प्रतिनिधित्व नहीं है।',
    legalDisclaimer:
      'सूचना: आवाज़ एक खुला साथी-सहयोग मंच है। स्वयंसेवक आपके निजी वकील नहीं हैं और यह कोई औपचारिक वकालतनामा नहीं है।',
    submitLegalBtn: 'कानूनी सहायता अर्जी दर्ज करें',

    medicalFormTitle: 'चिकित्सा सहायता अनुरोध',
    medicalFormDesc: 'ड्यूटी पर सड़क दुर्घटना, प्राथमिक उपचार सहायता या अस्पताल बीमा मार्गदर्शन के लिए अर्जी दें।',
    medicalCategoryLabel: 'चिकित्सा सहायता का प्रकार',
    contactPrefLabel: 'सहायता के लिए संपर्क का तरीका',
    contactInApp: 'ऐप के भीतर संदेश (गोपनीयता हेतु उत्तम)',
    contactPhoneRelay: 'फोन कॉल (समन्वयक के माध्यम से)',
    contactEmailRelay: 'ईमेल सूचना',
    medicalDetailsLabel: 'ज़रूरी सहायता का विवरण',
    medicalDetailsPlaceholder:
      'आपको किस प्रकार की मदद चाहिए (उदा. एक्सीडेंट क्लेम फॉर्म भरने में मदद, नज़दीकी सरकारी अस्पताल में मार्गदर्शन)। व्यक्तिगत मेडिकल हिस्ट्री न लिखें।',
    medicalDetailsHint: 'दवाओं की पर्चियां या निजी बीमारी की जांच रिपोर्ट सार्वजनिक रूप से पोस्ट न करें।',
    medicalConsentLabel:
      'मैं इस बुनियादी अनुरोध को सहायकों के साथ साझा करने की सहमति देता/देती हूँ। मैं स्वीकार करता/करती हूँ कि आवाज़ कोई एम्बुलेंस सेवा नहीं है।',
    medicalDisclaimer:
      'सूचना: कम्युनिटी स्वयंसेवक केवल व्यावहारिक सहयोग देते हैं। हम कोई डॉक्टर या मेडिकल प्रिस्क्रिप्शन सेवा प्रदान नहीं करते।',
    submitMedicalBtn: 'चिकित्सा सहायता अर्जी दर्ज करें',

    myRequestsTab: 'मेरी सेव की गई अर्जियां',
    sampleRequestsTab: 'उदाहरण फ़ीड (डेमो)',
    sampleBadge: 'केवल डेमो उदाहरण',
    noRequestsTitle: 'कोई अर्जी नहीं मिली',
    noRequestsDesc: 'आपने इस डिवाइस पर अभी तक कोई अर्जी दर्ज नहीं की है।',
    createRequestBtn: 'नई अर्जी बनाएं',
    closeRequestBtn: 'अर्जी बंद करें',
    markResolvedBtn: 'समाधान हुआ मार्क करें',
    deleteBtn: 'रिकॉर्ड हटाएं',
    statusOpen: 'खुली है (Open)',
    statusInReview: 'समीक्षा में (In Review)',
    statusResolved: 'समाधान हुआ (Resolved)',
    statusClosed: 'बंद (Closed)',

    submitting: 'अर्जी डिवाइस पर सेव हो रही है...',
    submittedSuccess: 'अर्जी आपके डिवाइस पर सफलतापूर्वक दर्ज हो गई है।',
    submittedNote:
      'नोट: साझा क्लाउड डेटाबेस कनेक्ट न होने के कारण यह अर्जी केवल इसी ब्राउज़र में सुरक्षित है और बाहर प्रसारित नहीं हुई है।',
    submitError: 'अर्जी सेव करने में त्रुटि। कृपया ब्राउज़र स्टोरेज जांचें और पुनः प्रयास करें।',
    closedSuccess: 'अर्जी की स्थिति अपडेट कर दी गई है।',
  },

  pa: {
    pageTitle: 'ਭਾਈਚਾਰਕ ਸਹਾਇਤਾ (Community Help)',
    pageSubtitle: 'ਸਾਥੀ ਕਾਮਿਆਂ ਅਤੇ ਵਾਲੰਟੀਅਰਾਂ ਤੋਂ ਕਾਨੂੰਨੀ ਅਤੇ ਮੈਡੀਕਲ ਸਹਾਇਤਾ ਪ੍ਰਾਪਤ ਕਰੋ।',
    tabLegal: 'ਕਾਨੂੰਨੀ ਮਦਦ (Legal Help)',
    tabMedical: 'ਮੈਡੀਕਲ ਸਹਾਇਤਾ (Medical Aid)',
    tabRequests: 'ਮੇਰੀਆਂ ਅਰਜ਼ੀਆਂ (My Requests)',
    tabSafety: 'ਸੁਰੱਖਿਆ ਨਿਯਮ',

    storageLocalNotice:
      'ਸਾਂਝਾ ਕਲਾਉਡ (Firestore) ਕੁਨੈਕਟ ਨਹੀਂ ਹੈ। ਸਾਰੀਆਂ ਅਰਜ਼ੀਆਂ ਤੁਹਾਡੇ ਇਸੇ ਡਿਵਾਈਸ ਉੱਤੇ ਸੁਰੱਖਿਅਤ ਹਨ।',
    cloudNotConnectedBadge: 'ਕਲਾਉਡ ਸਿੰਕ: ਆਫ਼ਲਾਈਨ',
    localStorageActiveBadge: 'ਡਿਵਾਈਸ ਸਟੋਰੇਜ: ਐਕਟਿਵ',

    emergencyHeading: 'ਐਮਰਜੈਂਸੀ ਵਿੱਚ ਤੁਰੰਤ 112 ਜਾਂ 108 ਤੇ ਕਾਲ ਕਰੋ',
    emergencyNotice:
      'ਅਵਾਜ਼ ਕੋਈ ਐਮਰਜੈਂਸੀ ਐਂਬੂਲੈਂਸ ਸੇਵਾ ਨਹੀਂ ਹੈ। ਜੇਕਰ ਕੋਈ ਗੰਭੀਰ ਹਾਦਸਾ ਵਾਪਰਿਆ ਹੈ ਤਾਂ ਤੁਰੰਤ ਸਰਕਾਰੀ ਐਮਰਜੈਂਸੀ ਨੰਬਰਾਂ ਤੇ ਸੰਪਰਕ ਕਰੋ।',
    callAmbulance: 'ਐਂਬੂਲੈਂਸ ਕਾਲ ਕਰੋ (108 / 102)',
    callEmergency: 'ਕੌਮੀ ਐਮਰਜੈਂਸੀ (112)',

    legalFormTitle: 'ਕਾਨੂੰਨੀ ਅਗਵਾਈ ਲਈ ਬੇਨਤੀ',
    legalFormDesc: 'ਪਲੇਟਫਾਰਮ ਦੇ ਮਸਲਿਆਂ (ਆਈਡੀ ਬਲਾਕ, ਪੈਸਿਆਂ ਦੀ ਕਟੌਤੀ) ਸੰਬੰਧੀ ਸਾਥੀ ਵਾਲੰਟੀਅਰਾਂ ਤੋਂ ਮਦਦ ਲਵੋ।',
    categoryLabel: 'ਮਸਲੇ ਦੀ ਕਿਸਮ',
    cityLabel: 'ਸ਼ਹਿਰ / ਇਲਾਕਾ',
    cityPlaceholder: 'ਜਿਵੇਂ ਅੰਮ੍ਰਿਤਸਰ, ਲੁਧਿਆਣਾ, ਚੰਡੀਗੜ੍ਹ',
    cityHint: 'ਘਰ ਦਾ ਪੂਰਾ ਪਤਾ ਨਾ ਲਿਖੋ, ਸਿਰਫ਼ ਸ਼ਹਿਰ ਦਾ ਨਾਮ ਕਾਫ਼ੀ ਹੈ।',
    languageLabel: 'ਮਦਦ ਲਈ ਭਾਸ਼ਾ',
    urgencyLabel: 'ਲੋੜ ਦੀ ਜ਼ਰੂਰਤ',
    urgencyRoutine: 'ਆਮ (3-5 ਦਿਨਾਂ ਵਿੱਚ)',
    urgencyUrgent: 'ਜ਼ਰੂਰੀ (24-48 ਘੰਟਿਆਂ ਵਿੱਚ)',
    urgencyImmediate: 'ਅਤਿ ਜ਼ਰੂਰੀ (ਸੁਣਵਾਈ ਦੀ ਮਿਤੀ ਨੇੜੇ ਹੈ)',
    summaryLabel: 'ਮਸਲੇ ਦਾ ਸੰਖੇਪ ਵੇਰਵਾ',
    summaryPlaceholder:
      'ਕੀ ਹੋਇਆ ਸੀ ਦੱਸੋ। ਕਿਰਪਾ ਕਰਕੇ ਬੈਂਕ ਖਾਤਾ, ਆਧਾਰ ਨੰਬਰ ਜਾਂ ਪਾਸਵਰਡ ਨਾ ਲਿਖੋ।',
    summaryHint: 'ਗੁਪਤ ਦਸਤਾਵੇਜ਼ ਜਨਤਕ ਫਾਰਮ ਵਿੱਚ ਨਾ ਭਰੋ।',
    sensitiveDataWarning: 'ਚੇਤਾਵਨੀ: ਕਿਰਪਾ ਕਰਕੇ ਬੈਂਕ ਖਾਤਾ ਨੰਬਰ ਜਾਂ 12 ਅੰਕਾਂ ਦਾ ਆਧਾਰ ਨੰਬਰ ਹਟਾਓ।',
    legalConsentLabel:
      'ਮੈਂ ਇਹ ਜਾਣਕਾਰੀ ਵਾਲੰਟੀਅਰਾਂ ਨਾਲ ਸਾਂਝੀ ਕਰਨ ਦੀ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ। ਮੈਂ ਸਮਝਦਾ/ਸਮਝਦੀ ਹਾਂ ਕਿ ਇਹ ਕੋਈ ਅਦਾਲਤੀ ਵਕਾਲਤਨਾਮਾ ਨਹੀਂ ਹੈ।',
    legalDisclaimer:
      'ਸੂਚਨਾ: ਅਵਾਜ਼ ਇੱਕ ਭਾਈਚਾਰਕ ਮੰਚ ਹੈ। ਵਾਲੰਟੀਅਰ ਤੁਹਾਡੇ ਨਿੱਜੀ ਵਕੀਲ ਨਹੀਂ ਹਨ।',
    submitLegalBtn: 'ਕਾਨੂੰਨੀ ਮਦਦ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ',

    medicalFormTitle: 'ਮੈਡੀਕਲ ਸਹਾਇਤਾ ਲਈ ਅਰਜ਼ੀ',
    medicalFormDesc: 'ਡਿਊਟੀ ਦੌਰਾਨ ਸੜਕ ਹਾਦਸੇ ਜਾਂ ਹਸਪਤਾਲ ਸਹਾਇਤਾ ਲਈ ਅਰਜ਼ੀ ਦਰਜ ਕਰੋ।',
    medicalCategoryLabel: 'ਸਹਾਇਤਾ ਦੀ ਕਿਸਮ',
    contactPrefLabel: 'ਸੰਪਰਕ ਦਾ ਤਰੀਕਾ',
    contactInApp: 'ਐਪ ਰਾਹੀਂ ਮੈਸੇਜ (ਸੁਰੱਖਿਅਤ)',
    contactPhoneRelay: 'ਫ਼ੋਨ ਕਾਲ (ਕੋਆਰਡੀਨੇਟਰ ਰਾਹੀਂ)',
    contactEmailRelay: 'ਈਮੇਲ ਸੂਚਨਾ',
    medicalDetailsLabel: 'ਲੋੜੀਂਦੀ ਮਦਦ ਦਾ ਵੇਰਵਾ',
    medicalDetailsPlaceholder:
      'ਕਿਸ ਤਰ੍ਹਾਂ ਦੀ ਮਦਦ ਚਾਹੀਦੀ ਹੈ (ਜਿਵੇਂ ਇੰਸ਼ੋਰੈਂਸ ਕਲੇਮ ਫਾਰਮ ਭਰਨਾ, ਹਸਪਤਾਲ ਦਾ ਪਤਾ)। ਨਿੱਜੀ ਬਿਮਾਰੀ ਦਾ ਇਤਿਹਾਸ ਨਾ ਲਿਖੋ।',
    medicalDetailsHint: 'ਦਵਾਈਆਂ ਦੀਆਂ ਪਰਚੀਆਂ ਜਨਤਕ ਤੌਰ ਤੇ ਪੋਸਟ ਨਾ ਕਰੋ।',
    medicalConsentLabel:
      'ਮੈਂ ਇਹ ਅਰਜ਼ੀ ਵਾਲੰਟੀਅਰਾਂ ਨਾਲ ਸਾਂਝੀ ਕਰਨ ਦੀ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ। ਮੈਂ ਸਵੀਕਾਰ ਕਰਦਾ/ਕਰਦੀ ਹਾਂ ਕਿ ਅਵਾਜ਼ ਕੋਈ ਐਂਬੂਲੈਂਸ ਨਹੀਂ ਹੈ।',
    medicalDisclaimer:
      'ਸੂਚਨਾ: ਵਾਲੰਟੀਅਰ ਸਿਰਫ਼ ਆਮ ਸਹਿਯੋਗ ਦਿੰਦੇ ਹਨ। ਅਸੀਂ ਕੋਈ ਕਲੀਨਿਕਲ ਇਲਾਜ ਜਾਂ ਦਵਾਈਆਂ ਨਹੀਂ ਦਿੰਦੇ।',
    submitMedicalBtn: 'ਮੈਡੀਕਲ ਸਹਾਇਤਾ ਅਰਜ਼ੀ ਜਮ੍ਹਾਂ ਕਰੋ',

    myRequestsTab: 'ਮੇਰੀਆਂ ਸੁਰੱਖਿਅਤ ਅਰਜ਼ੀਆਂ',
    sampleRequestsTab: 'ਉਦਾਹਰਣ ਫੀਡ (ਡੈਮੋ)',
    sampleBadge: 'ਸਿਰਫ਼ ਡੈਮੋ ਨਮੂਨਾ',
    noRequestsTitle: 'ਕੋਈ ਅਰਜ਼ੀ ਨਹੀਂ ਮਿਲੀ',
    noRequestsDesc: 'ਤੁਸੀਂ ਅਜੇ ਤੱਕ ਇਸ ਡਿਵਾਈਸ ਉੱਤੇ ਕੋਈ ਅਰਜ਼ੀ ਦਰਜ ਨਹੀਂ ਕੀਤੀ ਹੈ।',
    createRequestBtn: 'ਨਵੀਂ ਅਰਜ਼ੀ ਬਣਾਓ',
    closeRequestBtn: 'ਅਰਜ਼ੀ ਬੰਦ ਕਰੋ',
    markResolvedBtn: 'ਹੱਲ ਹੋ ਗਿਆ ਮਾਰਕ ਕਰੋ',
    deleteBtn: 'ਰਿਕਾਰਡ ਹਟਾਓ',
    statusOpen: 'ਖੁੱਲ੍ਹੀ ਹੈ (Open)',
    statusInReview: 'ਜਾਂਚ ਅਧੀਨ (In Review)',
    statusResolved: 'ਹੱਲ ਹੋ ਗਈ (Resolved)',
    statusClosed: 'ਬੰਦ (Closed)',

    submitting: 'ਅਰਜ਼ੀ ਡਿਵਾਈਸ ਤੇ ਸੇਵ ਹੋ ਰਹੀ ਹੈ...',
    submittedSuccess: 'ਅਰਜ਼ੀ ਤੁਹਾਡੇ ਡਿਵਾਈਸ ਉੱਤੇ ਸਫਲਤਾਪੂਰਵਕ ਸੇਵ ਹੋ ਗਈ ਹੈ।',
    submittedNote:
      'ਨੋਟ: ਕਲਾਉਡ ਡਾਟਾਬੇਸ ਚਾਲੂ ਨਾ ਹੋਣ ਕਰਕੇ ਇਹ ਅਰਜ਼ੀ ਸਿਰਫ਼ ਇਸੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਹੈ।',
    submitError: 'ਅਰਜ਼ੀ ਸੇਵ ਕਰਨ ਵਿੱਚ ਨੁਕਸ। ਕਿਰਪਾ ਕਰਕੇ ਮੁੜ ਕੋਸ਼ਿਸ਼ ਕਰੋ।',
    closedSuccess: 'ਅਰਜ਼ੀ ਦੀ ਸਥਿਤੀ ਅੱਪਡੇਟ ਹੋ ਗਈ ਹੈ।',
  },
};
