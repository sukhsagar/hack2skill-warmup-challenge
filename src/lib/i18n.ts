import { Language, ProblemCategory } from '@/types';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  subTagline: string;
  shortDesc: string;
  navRights: string;
  navComplaint: string;
  navDrafts: string;
  signInGoogle: string;
  tryDemoMode: string;
  signOut: string;
  welcomeGuest: string;
  activeLanguage: string;
  categories: Record<ProblemCategory, string>;
  categoryDescs: Record<ProblemCategory, string>;
  rightsHeading: string;
  rightsSubtitle: string;
  rightsInputPlaceholder: string;
  askButton: string;
  thinking: string;
  suggestedQuestions: string[];
  explanationTitle: string;
  protectionsTitle: string;
  nextStepsTitle: string;
  evidenceTitle: string;
  clarificationsTitle: string;
  officialResourcesTitle: string;
  legalDisclaimerTitle: string;
  legalDisclaimerText: string;
  turnIntoComplaintBtn: string;
  complaintHeading: string;
  complaintSubtitle: string;
  platformLabel: string;
  categoryLabel: string;
  incidentDescLabel: string;
  incidentDescPlaceholder: string;
  incidentDateLabel: string;
  disputedAmountLabel: string;
  workerIdLabel: string;
  desiredResolutionLabel: string;
  desiredResolutionPlaceholder: string;
  generateComplaintBtn: string;
  generatingComplaint: string;
  complaintPreviewTitle: string;
  copyBtn: string;
  copiedBtn: string;
  regenerateBtn: string;
  saveDraftBtn: string;
  savedDraftBtn: string;
  startNewBtn: string;
  deleteDraftBtn: string;
  myDraftsTitle: string;
  noDraftsMessage: string;
  draftsDisclaimer: string;
  demoModeNotice: string;
  apiKeyMissingNotice: string;
}

export const translations: Record<Language, TranslationDictionary> = {
  en: {
    appName: 'Awaaz',
    tagline: 'Har Mazdoor Ki Awaaz',
    subTagline: 'Know Your Rights. Raise Your Voice.',
    shortDesc: 'AI-powered rights guidance and formal grievance assistant empowering delivery partners, drivers, daily-wage earners, and platform workers across India.',
    navRights: 'Know Your Rights',
    navComplaint: 'Raise a Complaint',
    navDrafts: 'Saved Drafts',
    signInGoogle: 'Continue with Google',
    tryDemoMode: 'Explore Demo Mode (Instant Access)',
    signOut: 'Sign Out',
    welcomeGuest: 'Welcome to Awaaz',
    activeLanguage: 'Language',
    categories: {
      delayed_wages: 'Delayed or Unpaid Wages',
      unfair_deductions: 'Unfair Deductions',
      missing_incentives: 'Missing Incentives',
      account_suspension: 'Account Suspension & ID Block',
      workplace_safety: 'Workplace Safety & Accidents',
      welfare_schemes: 'Welfare Schemes & Social Security',
      other: 'Other Platform / Wage Issue',
    },
    categoryDescs: {
      delayed_wages: 'Payout stuck, weekly settlement missing, or trip earnings not credited.',
      unfair_deductions: 'Penalties for customer cancellations, bad weather delays, or arbitrary fines.',
      missing_incentives: 'Surge target completed but incentive reward withheld or denied.',
      account_suspension: 'Sudden ID deactivation without a show-cause notice or transparent appeal.',
      workplace_safety: 'Road accidents, customer harassment, medical emergency support.',
      welfare_schemes: 'e-Shram card benefits, accidental insurance, state gig worker boards.',
      other: 'App glitches, rating disputes, or contract condition changes.',
    },
    rightsHeading: 'Know Your Rights & Options',
    rightsSubtitle: 'Ask any question about platform rules, government schemes, or your lawful protections.',
    rightsInputPlaceholder: 'e.g., My payout has been delayed for 10 days by Zomato. What can I do legally?',
    askButton: 'Get Guidance',
    thinking: 'Analyzing rules and legal protections...',
    suggestedQuestions: [
      'Can the platform hold my weekly payout without written explanation?',
      'How do I appeal an unfair Swiggy or Zomato ID deactivation?',
      'Am I eligible for accidental insurance coverage under e-Shram?',
      'What can I do if a ₹500 penalty was deducted for customer cancellation?',
    ],
    explanationTitle: 'Plain Language Explanation',
    protectionsTitle: 'Relevant Protections & Frameworks',
    nextStepsTitle: 'Recommended Practical Steps',
    evidenceTitle: 'Evidence & Documents to Collect',
    clarificationsTitle: 'Important Details to Check',
    officialResourcesTitle: 'Verified Official Portals & Helplines',
    legalDisclaimerTitle: 'Important Information Disclaimer',
    legalDisclaimerText: 'This information provides practical guidance based on general platform policies and statutory frameworks. It does not constitute formal legal counsel. Entitlements depend on your specific agreement, city, and verified facts.',
    turnIntoComplaintBtn: 'Draft Formal Grievance for This Issue →',
    complaintHeading: 'Professional Grievance Builder',
    complaintSubtitle: 'Generate a polished, fact-based complaint letter ready to email or submit to platform grievance officers.',
    platformLabel: 'Platform / Employer / Company',
    categoryLabel: 'Issue Category',
    incidentDescLabel: 'Describe What Happened',
    incidentDescPlaceholder: 'Include key facts: e.g., On 12th Oct, I completed 24 delivery orders achieving the weekly surge incentive of ₹1,800. In the settlement statement, this was deducted citing arbitrary breach...',
    incidentDateLabel: 'Date of Incident (Optional)',
    disputedAmountLabel: 'Disputed Amount in ₹ (Optional)',
    workerIdLabel: 'Partner / Delivery / Driver ID (Optional)',
    desiredResolutionLabel: 'Requested Resolution',
    desiredResolutionPlaceholder: 'e.g., Immediate release of withheld ₹1,800 incentive and waiver of penalty.',
    generateComplaintBtn: 'Generate Professional Grievance',
    generatingComplaint: 'Drafting structured grievance letter with Gemini...',
    complaintPreviewTitle: 'Official Grievance Draft',
    copyBtn: 'Copy Grievance Text',
    copiedBtn: 'Copied to Clipboard!',
    regenerateBtn: 'Regenerate',
    saveDraftBtn: 'Save to My Drafts',
    savedDraftBtn: 'Saved in Browser',
    startNewBtn: 'Start New Grievance',
    deleteDraftBtn: 'Delete Draft',
    myDraftsTitle: 'My Saved Grievance Drafts',
    noDraftsMessage: 'No saved drafts yet. Drafts you save will appear here securely in your browser.',
    draftsDisclaimer: 'Notice: Drafts are stored locally in your browser storage and are never automatically sent to any third party.',
    demoModeNotice: 'Running in Demo Mode. Connect Firebase in .env.local to enable real Google authentication.',
    apiKeyMissingNotice: 'Gemini API Key is not configured. Displaying a structured sample response for evaluation.',
  },
  hi: {
    appName: 'आवाज़',
    tagline: 'हर मज़दूर की आवाज़',
    subTagline: 'अधिकार पहचानें। आवाज़ उठाएं।',
    shortDesc: 'डिलीवरी पार्टनर्स, कैब ड्राइवर्स, दैनिक वेतनभोगियों और गिग कामगारों के लिए एआई-संचालित कानूनी अधिकार मार्गदर्शक और शिकायत निर्माता।',
    navRights: 'अपने अधिकार जानें',
    navComplaint: 'शिकायत तैयार करें',
    navDrafts: 'सुरक्षित ड्राफ्ट',
    signInGoogle: 'Google से साइन इन करें',
    tryDemoMode: 'डेमो मोड आज़माएं (तुरंत प्रवेश)',
    signOut: 'लॉग आउट',
    welcomeGuest: 'आवाज़ में आपका स्वागत है',
    activeLanguage: 'भाषा',
    categories: {
      delayed_wages: 'बकाया या देरी से भुगतान',
      unfair_deductions: 'अनुचित पेनल्टी व कटौती',
      missing_incentives: 'लापता या रुका हुआ इंसेंटिव',
      account_suspension: 'आईडी बंद या सस्पेंड होना',
      workplace_safety: 'सुरक्षा, दुर्घटना व आपातकाल',
      welfare_schemes: 'सरकारी कल्याणकारी योजनाएं',
      other: 'अन्य प्लेटफॉर्म व मजदूरी समस्या',
    },
    categoryDescs: {
      delayed_wages: 'हफ़्ते की कमाई अटकी हो, सेटलमेंट न मिला हो या ट्रिप का पैसा न जुड़ा हो।',
      unfair_deductions: 'ग्राहक द्वारा कैंसिलेशन या बारिश की देरी पर गलत पेनल्टी कटी हो।',
      missing_incentives: 'टारगेट पूरा करने के बाद भी बोनस या इंसेंटिव का पैसा न दिया गया हो।',
      account_suspension: 'बिना कारण बताए अचानक आईडी या खाता ब्लॉक कर दिया गया हो।',
      workplace_safety: 'सड़क दुर्घटना, मेडिकल मदद या ग्राहक द्वारा दुर्व्यवहार।',
      welfare_schemes: 'ई-श्रम कार्ड, बीमा सुरक्षा, राज्य गिग कामगार बोर्ड लाभ।',
      other: 'रेटिंग विवाद, ऐप खराबी या नए नियम की समस्या।',
    },
    rightsHeading: 'अपने अधिकार और विकल्प जानें',
    rightsSubtitle: 'प्लेटफॉर्म के नियमों, श्रम कानूनों और सरकारी योजनाओं पर सरल भाषा में स्पष्ट जानकारी पाएं।',
    rightsInputPlaceholder: 'जैसे: Zomato ने बिना वजह मेरी 10 दिन की कमाई रोक रखी है। मैं क्या कर सकता हूँ?',
    askButton: 'मार्गदर्शन प्राप्त करें',
    thinking: 'नियमों और कानूनी अधिकारों का विश्लेषण हो रहा है...',
    suggestedQuestions: [
      'क्या कंपनी बिना लिखित कारण बताए मेरी हफ्ते की कमाई रोक सकती है?',
      'गलत तरीके से बंद की गई Swiggy या Zomato आईडी कैसे चालू करवाएं?',
      'क्या ई-श्रम कार्ड से डिलीवरी पार्टनर को दुर्घटना बीमा मिलता है?',
      'ग्राहक के आर्डर कैंसिल करने पर ₹500 पेनल्टी कट जाए तो क्या करें?',
    ],
    explanationTitle: 'सरल शब्दों में स्थिति',
    protectionsTitle: 'लागू होने वाले अधिकार व नियम',
    nextStepsTitle: 'आपको क्या ठोस कदम उठाने चाहिए',
    evidenceTitle: 'इकट्ठा करने योग्य ज़रूरी सबूत व दस्तावेज़',
    clarificationsTitle: 'जांचने योग्य ज़रूरी बातें',
    officialResourcesTitle: 'सत्यापित सरकारी पोर्टल व हेल्पलाइन',
    legalDisclaimerTitle: 'महत्वपूर्ण सूचना',
    legalDisclaimerText: 'यह जानकारी सामान्य नियमों और उपलब्ध दिशानिर्देशों पर आधारित व्यावहारिक मार्गदर्शन है। यह कोई औपचारिक कानूनी सलाह नहीं है। अंतिम अधिकार आपके अनुबंध और राज्य के नियमों पर निर्भर करते हैं।',
    turnIntoComplaintBtn: 'इस मामले पर औपचारिक शिकायत लिखें →',
    complaintHeading: 'पेशेवर शिकायत निर्माता',
    complaintSubtitle: 'कंपनी के नोडल ग्रीवेंस ऑफिसर को भेजने के लिए तथ्यपूर्ण और प्रभावशाली शिकायत पत्र तैयार करें।',
    platformLabel: 'कंपनी / नियोक्ता / प्लेटफॉर्म',
    categoryLabel: 'समस्या का प्रकार',
    incidentDescLabel: 'अपनी समस्या विस्तार से लिखें',
    incidentDescPlaceholder: 'स्पष्ट जानकारी दें: जैसे- 12 अक्टूबर को मैंने 24 डिलीवरी पूरी करके ₹1,800 का इंसेंटिव हासिल किया था। लेकिन सेटलमेंट में इसे बिना वजह काट लिया गया...',
    incidentDateLabel: 'घटना की तारीख (वैकल्पिक)',
    disputedAmountLabel: 'विवादित राशि ₹ (वैकल्पिक)',
    workerIdLabel: 'पार्टनर / राइडर आईडी (वैकल्पिक)',
    desiredResolutionLabel: 'आप क्या समाधान चाहते हैं',
    desiredResolutionPlaceholder: 'जैसे- रोकी गई ₹1,800 की राशि तुरंत जारी की जाए और पेनल्टी वापस ली जाए।',
    generateComplaintBtn: 'औपचारिक शिकायत तैयार करें',
    generatingComplaint: 'Gemini द्वारा पेशेवर शिकायत तैयार की जा रही है...',
    complaintPreviewTitle: 'तैयार शिकायत पत्र',
    copyBtn: 'शिकायत कॉपी करें',
    copiedBtn: 'कॉपी हो गया!',
    regenerateBtn: 'फिर से बनाएं',
    saveDraftBtn: 'ड्राफ्ट सुरक्षित करें',
    savedDraftBtn: 'ब्राउज़र में सहेजा गया',
    startNewBtn: 'नई शिकायत शुरू करें',
    deleteDraftBtn: 'ड्राफ्ट हटाएं',
    myDraftsTitle: 'मेरे सहेजे गए ड्राफ्ट',
    noDraftsMessage: 'अभी कोई सहेजा गया ड्राफ्ट नहीं है। यहां आपके ड्राफ्ट सुरक्षित रहेंगे।',
    draftsDisclaimer: 'सूचना: आपके ड्राफ्ट केवल आपके ब्राउज़र में सुरक्षित हैं और किसी कंपनी को अपने-आप नहीं भेजे जाते।',
    demoModeNotice: 'डेमो मोड सक्रिय है। असली Google साइन इन के लिए .env.local में Firebase क्रेडेंशियल जोड़ें।',
    apiKeyMissingNotice: 'Gemini API Key सेट नहीं है। मूल्यांकन के लिए संदर्भ नमूना दिखाया जा रहा है।',
  },
  pa: {
    appName: 'ਅਵਾਜ਼',
    tagline: 'ਹਰ ਮਜ਼ਦੂਰ ਦੀ ਅਵਾਜ਼',
    subTagline: 'ਹੱਕ ਪਛਾਣੋ। ਆਵਾਜ਼ ਬੁਲੰਦ ਕਰੋ।',
    shortDesc: 'ਡਿਲੀਵਰੀ ਪਾਰਟਨਰਾਂ, ਡਰਾਈਵਰਾਂ, ਦਿਹਾੜੀਦਾਰਾਂ ਅਤੇ ਗਿੱਗ ਕਾਮਿਆਂ ਲਈ ਏਆਈ-ਅਧਾਰਤ ਅਧਿਕਾਰ ਮਾਰਗਦਰਸ਼ਕ ਅਤੇ ਸ਼ਿਕਾਇਤ ਸਹਾਇਕ।',
    navRights: 'ਆਪਣੇ ਹੱਕ ਜਾਣੋ',
    navComplaint: 'ਸ਼ਿਕਾਇਤ ਤਿਆਰ ਕਰੋ',
    navDrafts: 'ਸੰਭਾਲੇ ਡਰਾਫਟ',
    signInGoogle: 'Google ਨਾਲ ਸਾਈਨ ਇਨ ਕਰੋ',
    tryDemoMode: 'ਡੈਮੋ ਮੋਡ ਅਜ਼ਮਾਓ (ਤੁਰੰਤ ਪਹੁੰਚ)',
    signOut: 'ਲਾਗ ਆਊਟ',
    welcomeGuest: 'ਅਵਾਜ਼ ਵਿੱਚ ਤੁਹਾਡਾ ਸੁਆਗਤ ਹੈ',
    activeLanguage: 'ਭਾਸ਼ਾ',
    categories: {
      delayed_wages: 'ਬਕਾਇਆ ਜਾਂ ਦੇਰੀ ਨਾਲ ਮਿਲੀ ਕਮਾਈ',
      unfair_deductions: 'ਗਲਤ ਕਟੌਤੀਆਂ ਜਾਂ ਜੁਰਮਾਨੇ',
      missing_incentives: 'ਰੁਕਿਆ ਜਾਂ ਲਾਪਤਾ ਇਨਸੈਂਟਿਵ',
      account_suspension: 'ਆਈਡੀ ਬੰਦ ਜਾਂ ਸਸਪੈਂਡ ਹੋਣਾ',
      workplace_safety: 'ਕੰਮ ਵਾਲੀ ਥਾਂ ਸੁਰੱਖਿਆ ਤੇ ਹਾਦਸੇ',
      welfare_schemes: 'ਸਰਕਾਰੀ ਭਲਾਈ ਸਕੀਮਾਂ',
      other: 'ਹੋਰ ਪਲੇਟਫਾਰਮ ਜਾਂ ਦਿਹਾੜੀ ਮੁੱਦੇ',
    },
    categoryDescs: {
      delayed_wages: 'ਹਫ਼ਤੇ ਦੀ ਕਮਾਈ ਫਸੀ ਹੋਵੇ ਜਾਂ ਖਾਤੇ ਵਿੱਚ ਪੈਸੇ ਜਮ੍ਹਾਂ ਨਾ ਹੋਏ ਹੋਣ।',
      unfair_deductions: 'ਗਾਹਕ ਵੱਲੋਂ ਆਰਡਰ ਰੱਦ ਕਰਨ ਜਾਂ ਮੀਂਹ ਕਾਰਨ ਦੇਰੀ ਤੇ ਗਲਤ ਜੁਰਮਾਨਾ।',
      missing_incentives: 'ਟਾਰਗੇਟ ਪੂਰਾ ਹੋਣ ਦੇ ਬਾਵਜੂਦ ਬੋਨਸ ਜਾਂ ਇਨਸੈਂਟਿਵ ਰੋਕ ਲੈਣਾ।',
      account_suspension: 'ਬਿਨਾਂ ਕਿਸੇ ਲਿਖਤੀ ਕਾਰਨ ਦੇ ਅਚਾਨਕ ਖਾਤਾ ਜਾਂ ਆਈਡੀ ਬਲਾਕ ਕਰ ਦੇਣਾ।',
      workplace_safety: 'ਸੜਕ ਹਾਦਸੇ, ਮੈਡੀਕਲ ਐਮਰਜੈਂਸੀ ਜਾਂ ਗਾਹਕ ਵੱਲੋਂ ਬਦਸਲੂਕੀ।',
      welfare_schemes: 'ਈ-ਸ਼੍ਰਮ ਕਾਰਡ, ਦੁਰਘਟਨਾ ਬੀਮਾ ਅਤੇ ਸੂਬਾਈ ਗਿੱਗ ਵਰਕਰ ਬੋਰਡ ਸਕੀਮਾਂ।',
      other: 'ਰੇਟਿੰਗ ਵਿਵਾਦ ਜਾਂ ਐਪ ਵਿੱਚ ਗੜਬੜ।',
    },
    rightsHeading: 'ਆਪਣੇ ਹੱਕ ਅਤੇ ਕਾਨੂੰਨੀ ਵਿਕਲਪ ਜਾਣੋ',
    rightsSubtitle: 'ਪਲੇਟਫਾਰਮ ਨਿਯਮਾਂ ਅਤੇ ਸਰਕਾਰੀ ਸਕੀਮਾਂ ਬਾਰੇ ਸੌਖੀ ਪੰਜਾਬੀ ਵਿੱਚ ਜਾਣਕਾਰੀ ਲਵੋ।',
    rightsInputPlaceholder: 'ਉਦਾਹਰਣ: ਜ਼ੋਮੈਟੋ ਨੇ ਪਿਛਲੇ 10 ਦਿਨਾਂ ਤੋਂ ਮੇਰੇ ਪੈਸੇ ਰੋਕੇ ਹੋਏ ਹਨ। ਮੈਂ ਕੀ ਕਰਾਂ?',
    askButton: 'ਜਾਣਕਾਰੀ ਲਵੋ',
    thinking: 'ਨਿਯਮਾਂ ਅਤੇ ਕਾਨੂੰਨੀ ਹੱਕਾਂ ਦੀ ਜਾਂਚ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
    suggestedQuestions: [
      'ਕੀ ਕੰਪਨੀ ਬਿਨਾਂ ਲਿਖਤੀ ਕਾਰਨ ਦੱਸੇ ਮੇਰੇ ਹਫ਼ਤੇ ਦੀ ਕਮਾਈ ਰੋਕ ਸਕਦੀ ਹੈ?',
      'ਸਵਿਗੀ ਜਾਂ ਜ਼ੋਮੈਟੋ ਆਈਡੀ ਬੰਦ ਹੋਣ ਤੇ ਕਿਵੇਂ ਅਪੀਲ ਕਰੀਏ?',
      'ਕੀ ਈ-ਸ਼੍ਰਮ ਕਾਰਡ ਨਾਲ ਗਿੱਗ ਵਰਕਰਾਂ ਨੂੰ ਦੁਰਘਟਨਾ ਬੀਮਾ ਮਿਲਦਾ ਹੈ?',
      'ਗਾਹਕ ਵੱਲੋਂ ਆਰਡਰ ਰੱਦ ਹੋਣ ਤੇ ਕੰਪਨੀ ਨੇ ₹500 ਜੁਰਮਾਨਾ ਕੱਟ ਲਿਆ, ਕੀ ਕਰੀਏ?',
    ],
    explanationTitle: 'ਸੌਖੇ ਸ਼ਬਦਾਂ ਵਿੱਚ ਵੇਰਵਾ',
    protectionsTitle: 'ਲਾਗੂ ਹੁੰਦੇ ਅਧਿਕਾਰ ਤੇ ਨਿਯਮ',
    nextStepsTitle: 'ਲੋੜੀਂਦੇ ਅਮਲੀ ਕਦਮ',
    evidenceTitle: 'ਸੰਭਾਲਣ ਯੋਗ ਸਬੂਤ ਅਤੇ ਦਸਤਾਵੇਜ਼',
    clarificationsTitle: 'ਧਿਆਨ ਦੇਣ ਯੋਗ ਜ਼ਰੂਰੀ ਨੁਕਤੇ',
    officialResourcesTitle: 'ਸਰਕਾਰੀ ਪੋਰਟਲ ਅਤੇ ਹੈਲਪਲਾਈਨ',
    legalDisclaimerTitle: 'ਜ਼ਰੂਰੀ ਸੂਚਨਾ',
    legalDisclaimerText: 'ਇਹ ਜਾਣਕਾਰੀ ਆਮ ਨਿਯਮਾਂ ਤੇ ਅਧਾਰਤ ਅਮਲੀ ਸਲਾਹ ਹੈ ਅਤੇ ਇਹ ਕੋਈ ਕਾਨੂੰਨੀ ਫੈਸਲਾ ਨਹੀਂ ਹੈ। ਅਸਲ ਹੱਕ ਤੁਹਾਡੇ ਕੰਟਰੈਕਟ ਅਤੇ ਸੂਬੇ ਦੇ ਨਿਯਮਾਂ ਤੇ ਨਿਰਭਰ ਕਰਦੇ ਹਨ।',
    turnIntoComplaintBtn: 'ਇਸ ਮਸਲੇ ਤੇ ਰਸਮੀ ਸ਼ਿਕਾਇਤ ਲਿਖੋ →',
    complaintHeading: 'ਰਸਮੀ ਸ਼ਿਕਾਇਤ ਬਿਲਡਰ',
    complaintSubtitle: 'ਕੰਪਨੀ ਦੇ ਗ੍ਰੀਵੈਂਸ ਅਧਿਕਾਰੀ ਨੂੰ ਭੇਜਣ ਲਈ ਠੋਸ ਅਤੇ ਪ੍ਰਭਾਵਸ਼ਾਲੀ ਚਿੱਠੀ ਤਿਆਰ ਕਰੋ।',
    platformLabel: 'ਕੰਪਨੀ / ਮਾਲਕ / ਪਲੇਟਫਾਰਮ',
    categoryLabel: 'ਮਸਲੇ ਦੀ ਸ਼੍ਰੇਣੀ',
    incidentDescLabel: 'ਆਪਣੀ ਸਮੱਸਿਆ ਬਾਰੇ ਲਿਖੋ',
    incidentDescPlaceholder: 'ਜ਼ਰੂਰੀ ਜਾਣਕਾਰੀ ਦਿਓ: ਜਿਵੇਂ 12 ਅਕਤੂਬਰ ਨੂੰ ਮੈਂ 24 ਆਰਡਰ ਪੂਰੇ ਕਰਕੇ ₹1,800 ਦਾ ਇਨਸੈਂਟਿਵ ਜਿੱਤਿਆ ਸੀ, ਪਰ ਕੰਪਨੀ ਨੇ ਬਿਨਾਂ ਵਜ੍ਹਾ ਕੱਟ ਲਿਆ...',
    incidentDateLabel: 'ਘਟਨਾ ਦੀ ਮਿਤੀ (ਚੋਣਵੀਂ)',
    disputedAmountLabel: 'ਰੁਕੀ ਰਕਮ ₹ (ਚੋਣਵੀਂ)',
    workerIdLabel: 'ਪਾਰਟਨਰ ਜਾਂ ਰਾਈਡਰ ਆਈਡੀ (ਚੋਣਵੀਂ)',
    desiredResolutionLabel: 'ਤੁਸੀਂ ਕੀ ਹੱਲ ਚਾਹੁੰਦੇ ਹੋ',
    desiredResolutionPlaceholder: 'ਜਿਵੇਂ- ਰੋਕਿਆ ਗਿਆ ₹1,800 ਤੁਰੰਤ ਜਾਰੀ ਕੀਤਾ ਜਾਵੇ ਅਤੇ ਜੁਰਮਾਨਾ ਰੱਦ ਹੋਵੇ।',
    generateComplaintBtn: 'ਰਸਮੀ ਸ਼ਿਕਾਇਤ ਤਿਆਰ ਕਰੋ',
    generatingComplaint: 'Gemini ਰਾਹੀਂ ਸ਼ਿਕਾਇਤ ਤਿਆਰ ਕੀਤੀ ਜਾ ਰਹੀ ਹੈ...',
    complaintPreviewTitle: 'ਤਿਆਰ ਕੀਤੀ ਗਈ ਸ਼ਿਕਾਇਤ',
    copyBtn: 'ਸ਼ਿਕਾਇਤ ਕਾਪੀ ਕਰੋ',
    copiedBtn: 'ਕਾਪੀ ਹੋ ਗਿਆ!',
    regenerateBtn: 'ਦੁਬਾਰਾ ਬਣਾਓ',
    saveDraftBtn: 'ਡਰਾਫਟ ਸੰਭਾਲੋ',
    savedDraftBtn: 'ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਸੰਭਾਲਿਆ ਗਿਆ',
    startNewBtn: 'ਨਵੀਂ ਸ਼ਿਕਾਇਤ ਸ਼ੁਰੂ ਕਰੋ',
    deleteDraftBtn: 'ਡਰਾਫਟ ਹਟਾਓ',
    myDraftsTitle: 'ਮੇਰੇ ਸੰਭਾਲੇ ਹੋਏ ਡਰਾਫਟ',
    noDraftsMessage: 'ਅਜੇ ਕੋਈ ਸੰਭਾਲਿਆ ਡਰਾਫਟ ਨਹੀਂ ਹੈ।',
    draftsDisclaimer: 'ਸੂਚਨਾ: ਤੁਹਾਡੇ ਡਰਾਫਟ ਸਿਰਫ਼ ਤੁਹਾਡੇ ਬ੍ਰਾਊਜ਼ਰ ਵਿੱਚ ਸੰਭਾਲੇ ਜਾਂਦੇ ਹਨ ਅਤੇ ਕਿਸੇ ਕੰਪਨੀ ਨੂੰ ਆਪਣੇ ਆਪ ਨਹੀਂ ਭੇਜੇ ਜਾਂਦੇ।',
    demoModeNotice: 'ਡੈਮੋ ਮੋਡ ਚੱਲ ਰਿਹਾ ਹੈ। ਅਸਲ ਗੂਗਲ ਲਾਗਇਨ ਲਈ .env.local ਵਿੱਚ Firebase ਕੁੰਜੀਆਂ ਜੋੜੋ।',
    apiKeyMissingNotice: 'Gemini API Key ਮੌਜੂਦ ਨਹੀਂ ਹੈ। ਪ੍ਰੀਖਿਆ ਲਈ ਨਮੂਨਾ ਦਿਖਾਇਆ ਜਾ ਰਿਹਾ ਹੈ।',
  },
};
