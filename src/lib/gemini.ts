import { GoogleGenerativeAI } from '@google/generative-ai';
import { Language, RightsResponse, ComplaintFormData } from '@/types';
import { OFFICIAL_RESOURCES } from './resources';

const DEFAULT_MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

export function getGeminiClient(): { ai: GoogleGenerativeAI | null; modelName: string; isConfigured: boolean } {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY' || apiKey.trim() === '') {
    return { ai: null, modelName: DEFAULT_MODEL, isConfigured: false };
  }
  return {
    ai: new GoogleGenerativeAI(apiKey),
    modelName: DEFAULT_MODEL,
    isConfigured: true,
  };
}

export const SAMPLE_RIGHTS_RESPONSES: Record<Language, RightsResponse> = {
  en: {
    plainExplanation:
      'Under Indian consumer and intermediary fair-practice principles, delivery platforms (like Zomato, Swiggy, Uber) cannot arbitrarily hold earnings or impose penalties without transparent calculation and written notification. While gig workers are currently contracted as independent partners, state legislation (e.g. Rajasthan Platform Based Gig Workers Act 2023) and the Code on Social Security 2020 recognize statutory protections and grievance rights.',
    relevantProtections: [
      'Code on Social Security 2020 (Sections 113 & 114: Platform worker welfare & registration)',
      'Intermediary Guidelines & Consumer Protection (E-Commerce) Rules: Mandatory Grievance Officer and 48-hour response requirement',
      'Contract Law Principle of Natural Justice: Deductions require verifiable breach notification and dispute opportunity',
    ],
    practicalNextSteps: [
      'Raise a formal written support ticket inside the partner app requesting an itemized breakdown of withheld earnings or deduction reasons.',
      'Export and save all trip logs, delivery completion timestamps, rate cards, and deduction notifications.',
      'If unresolved within 48-72 hours, escalate the issue to the platform designated Grievance Officer with your formal complaint draft.',
      'Register a grievance with the National Consumer Helpline (Call 1915 or online) if the platform refuses to provide an itemized justification.',
    ],
    documentsToCollect: [
      'Screenshots of payout statement and weekly summary showing the deduction or missing balance',
      'Order ID / Trip IDs completed during the incentive or dispute period',
      'In-app chat transcripts with rider support team',
      'Active Partner ID and registered mobile number',
    ],
    clarifyingQuestions: [
      'Did the app specify a reason code (e.g., customer complaint, cancellation, GPS mismatch)?',
      'Was this an automatic deduction or a manual penalty imposed by team lead / hub manager?',
    ],
    disclaimer:
      'General informational guidance only. This does not constitute certified legal representation or government determinations.',
    verifiedResources: OFFICIAL_RESOURCES.slice(0, 3),
    isSampleResponse: true,
  },
  hi: {
    plainExplanation:
      'उपभोक्ता संरक्षण और डिजिटल प्लेटफॉर्म नियमों के तहत, कोई भी डिलीवरी कंपनी (जैसे Zomato, Swiggy, Uber) बिना स्पष्ट लिखित कारण या गणना के आपकी मेहनत की कमाई या इंसेंटिव नहीं रोक सकती। हालांकि गिग वर्कर अनुबंध पर काम करते हैं, लेकिन सामाजिक सुरक्षा संहिता 2020 और राजस्थान गिग वर्कर्स कानून के तहत आपको पारदर्शी व्यवहार और शिकायत दर्ज कराने का पूरा अधिकार है।',
    relevantProtections: [
      'सामाजिक सुरक्षा संहिता 2020 (गिग और प्लेटफॉर्म कामगारों के लिए सामाजिक सुरक्षा और शिकायत निवारण व्यवस्था)',
      'मध्यस्थ दिशानिर्देश (IT Rules): कंपनी द्वारा 48 घंटे में शिकायत पावती (acknowledgment) देना अनिवार्य',
      'स्वाभाविक न्याय का सिद्धांत: बिना मौका दिए या बिना सबूत के आर्थिक दंड नहीं लगाया जा सकता',
    ],
    practicalNextSteps: [
      'पार्टनर ऐप में तुरंत टिकट बनाकर रोकी गई राशि और कटौती के लिखित कारण की मांग करें।',
      'उस हफ्ते के सभी पूरे किए गए ऑर्डर्स, ट्रिप्स, टाइमस्टैम्प और पे-आउट स्क्रीनशॉट सुरक्षित रखें।',
      'यदि 48-72 घंटे में समाधान न मिले, तो कंपनी के ग्रीवेंस ऑफिसर को लिखित शिकायत भेजें।',
      'राष्ट्रीय उपभोक्ता हेल्पलाइन (1915) पर "अनुचित व्यापार व्यवहार" (Unfair Trade Practice) की शिकायत दर्ज कराएं।',
    ],
    documentsToCollect: [
      'पेआउट स्क्रीनशॉट जिसमें कटी हुई या रुकी हुई राशि दिख रही हो',
      'इंसेंटिव टारगेट पूरा होने के समय का स्क्रीनशॉट या आर्डर आईडी सूची',
      'सपोर्ट चैट या हेल्पडेस्क टिकट के स्क्रीनशॉट',
      'पार्टनर आईडी और रजिस्टर्ड मोबाइल नंबर',
    ],
    clarifyingQuestions: [
      'क्या ऐप में कटौती का कोई विशेष कारण (जैसे कैंसिलेशन या देरी) लिखा है?',
      'क्या यह कटौती हब मैनेजर या लीड द्वारा की गई है अथवा सिस्टम से ऑटोमेटिक कटी है?',
    ],
    disclaimer:
      'यह केवल सामान्य मार्गदर्शन है। यह कोई औपचारिक कानूनी फैसला या सलाह नहीं है।',
    verifiedResources: OFFICIAL_RESOURCES.slice(0, 3),
    isSampleResponse: true,
  },
  pa: {
    plainExplanation:
      'ਭਾਰਤੀ ਨਿਯਮਾਂ ਅਨੁਸਾਰ ਡਿਲੀਵਰੀ ਕੰਪਨੀਆਂ (ਜਿਵੇਂ Zomato, Swiggy, Uber) ਬਿਨਾਂ ਸਪਸ਼ਟ ਲਿਖਤੀ ਕਾਰਨ ਦੱਸੇ ਤੁਹਾਡੀ ਹਫ਼ਤੇ ਦੀ ਕਮਾਈ ਜਾਂ ਇਨਸੈਂਟਿਵ ਨਹੀਂ ਰੋਕ ਸਕਦੀਆਂ। ਗਿੱਗ ਵਰਕਰਾਂ ਨੂੰ ਪਾਰਦਰਸ਼ੀ ਹਿਸਾਬ-ਕਿਤਾਬ ਮੰਗਣ ਅਤੇ ਆਪਣਾ ਪੱਖ ਰੱਖਣ ਦਾ ਪੂਰਾ ਹੱਕ ਹੈ।',
    relevantProtections: [
      'ਸੋਸ਼ਲ ਸਕਿਓਰਿਟੀ ਕੋਡ 2020 (ਗਿੱਗ ਕਾਮਿਆਂ ਲਈ ਭਲਾਈ ਅਤੇ ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ ਫਰੇਮਵਰਕ)',
      'ਆਈਟੀ ਨਿਯਮਾਂ ਤਹਿਤ ਪਲੇਟਫਾਰਮਾਂ ਲਈ ਨੋਡਲ ਗ੍ਰੀਵੈਂਸ ਅਧਿਕਾਰੀ ਰੱਖਣਾ ਅਤੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਸੁਣਵਾਈ ਸ਼ੁਰੂ ਕਰਨਾ ਲਾਜ਼ਮੀ ਹੈ',
      'ਕੰਟਰੈਕਟ ਸਿਧਾਂਤ: ਬਿਨਾਂ ਸਬੂਤ ਜੁਰਮਾਨਾ ਕੱਟਣਾ ਗਲਤ ਵਪਾਰਕ ਅਭਿਆਸ ਹੈ',
    ],
    practicalNextSteps: [
      'ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਐਪ ਅੰਦਰ ਟਿਕਟ ਦਰਜ ਕਰਕੇ ਰੋਕੇ ਪੈਸਿਆਂ ਦਾ ਪੂਰਾ ਲਿਖਤੀ ਵੇਰਵਾ ਮੰਗੋ।',
      'ਸਾਰੇ ਆਰਡਰਾਂ, ਟ੍ਰਿਪਾਂ, ਇਨਸੈਂਟਿਵ ਟਾਰਗੇਟ ਅਤੇ ਪੇ-ਆਊਟ ਦੇ ਸਕ੍ਰੀਨਸ਼ਾਟ ਸੰਭਾਲ ਕੇ ਰੱਖੋ।',
      'ਜੇ 48 ਘੰਟਿਆਂ ਵਿੱਚ ਹੱਲ ਨਾ ਹੋਵੇ, ਤਾਂ ਕੰਪਨੀ ਦੇ ਨੋਡਲ ਗ੍ਰੀਵੈਂਸ ਅਧਿਕਾਰੀ ਨੂੰ ਲਿਖਤੀ ਚਿੱਠੀ ਭੇਜੋ।',
      'ਨੈਸ਼ਨਲ ਕੰਜ਼ਿਊਮਰ ਹੈਲਪਲਾਈਨ (1915) ਤੇ ਮੁਫ਼ਤ ਸ਼ਿਕਾਇਤ ਦਰਜ ਕਰਵਾਓ।',
    ],
    documentsToCollect: [
      'ਪੇ-ਆਊਟ ਸਮਰੀ ਅਤੇ ਬੈਂਕ ਖਾਤੇ ਦੇ ਸਕ੍ਰੀਨਸ਼ਾਟ',
      'ਵਿਵਾਦ ਵਾਲੇ ਸਮੇਂ ਦੌਰਾਨ ਪੂਰੇ ਕੀਤੇ ਗਏ ਆਰਡਰਾਂ ਦੀ ਲਿਸਟ',
      'ਸਪੋਰਟ ਟੀਮ ਨਾਲ ਹੋਈ ਗੱਲਬਾਤ ਦੇ ਸਕ੍ਰੀਨਸ਼ਾਟ',
      'ਪਾਰਟਨਰ ਆਈਡੀ ਨੰਬਰ',
    ],
    clarifyingQuestions: [
      'ਕੀ ਐਪ ਵਿੱਚ ਜੁਰਮਾਨੇ ਦਾ ਕੋਈ ਕਾਰਨ ਦੱਸਿਆ ਗਿਆ ਹੈ?',
    ],
    disclaimer:
      'ਇਹ ਸਿਰਫ਼ ਆਮ ਮਾਰਗਦਰਸ਼ਨ ਹੈ ਅਤੇ ਕੋਈ ਕਾਨੂੰਨੀ ਅਦਾਲਤੀ ਫੈਸਲਾ ਨਹੀਂ ਹੈ।',
    verifiedResources: OFFICIAL_RESOURCES.slice(0, 3),
    isSampleResponse: true,
  },
};

export function getSampleComplaint(data: ComplaintFormData): {
  subject: string;
  complaintBody: string;
  evidenceChecklist: string[];
  suggestedEscalation: string[];
} {
  const platform = data.platform || 'Platform Grievance Cell';
  const partnerId = data.workerIdentifier || '[Insert Partner ID / Driver ID]';
  const incidentDate = data.incidentDate || '[Insert Date of Incident]';
  const amount = data.disputedAmount ? `₹${data.disputedAmount}` : '[Insert Disputed Amount in ₹]';
  const resolution = data.desiredResolution || 'Immediate release and crediting of the withheld amount';

  if (data.language === 'hi') {
    return {
      subject: `औपचारिक शिकायत: ${data.category === 'delayed_wages' ? 'बकाया भुगतान' : 'अनुचित कटौती'} के संबंध में — पार्टनर आईडी: ${partnerId}`,
      complaintBody: `सेवा में,\nनोडल ग्रीवेंस ऑफिसर / पार्टनर सपोर्ट प्रमुख,\n${platform},\n\nविषय: ${incidentDate} को हुए विवाद और ${amount} के अनुचित निलंबन / कटौती के संबंध में औपचारिक शिकायत\n\nमहोदय/महोदया,\n\nमैं, [आपका नाम], आपकी कंपनी ${platform} के साथ पंजीकृत डिलीवरी पार्टनर/ड्राइवर हूँ (पार्टनर आईडी: ${partnerId}, मोबाइल: [पंजीकृत मोबाइल नंबर])।\n\nमैं यह शिकायत निम्नलिखित गंभीर समस्या के संदर्भ में दर्ज करा रहा हूँ:\n\nघटना का विवरण:\n${data.incidentDescription}\n\nमुख्य तथ्य:\n1. घटना की तिथि: ${incidentDate}\n2. विवादित राशि: ${amount}\n3. प्रभावित सर्विस: नियमित डिलीवरी / राइड सर्विस\n\nमैंने कंपनी के नियमों का निष्ठापूर्वक पालन किया है। इसके बावजूद बिना किसी पूर्व सूचना, कारण बताओ नोटिस या पारदर्शी गणना के उक्त कार्रवाई की गई है, जो स्वाभाविक न्याय और पारदर्शी सेवा शर्तों के विपरीत है।\n\nअपेक्षित समाधान:\n${resolution}\n\nकृपया इस मामले की निष्पक्ष जांच कराकर आगामी 48 से 72 घंटों के भीतर समस्या का समाधान करने और मुझे ईमेल/एसएमएस द्वारा सूचित करने की कृपा करें। यदि निर्धारित समयावधि में समाधान नहीं होता है, तो मैं उपभोक्ता मामलों के मंत्रालय (National Consumer Helpline) और संबंधित श्रम आयोग में अपील करने के लिए बाध्य होऊंगा।\n\nसधन्यवाद,\n\n[आपका नाम]\nपार्टनर आईडी: ${partnerId}\nसंपर्क: [आपका फोन नंबर]`,
      evidenceChecklist: [
        'दैनिक/साप्ताहिक पेआउट समरी का स्क्रीनशॉट',
        'संबंधित ऑर्डर्स और डिलीवरी टाइमस्टैम्प की सूची',
        'ऐप हेल्पडेस्क पर उठाई गई पिछली टिकट का संदर्भ',
      ],
      suggestedEscalation: [
        '48 घंटे में समाधान न मिलने पर National Consumer Helpline (1915) पर ऑनलाइन शिकायत दर्ज करें।',
        'e-Shram और श्रम मंत्रालय के SAMADHAN पोर्टल (samadhan.labour.gov.in) पर ग्रीवेंस रजिस्टर करें।',
      ],
    };
  }

  if (data.language === 'pa') {
    return {
      subject: `ਰਸਮੀ ਸ਼ਿਕਾਇਤ: ਗਲਤ ਕਟੌਤੀ ਅਤੇ ਬਕਾਇਆ ਰਕਮ ਬਾਰੇ — ਪਾਰਟਨਰ ਆਈਡੀ: ${partnerId}`,
      complaintBody: `ਸੇਵਾ ਵਿਖੇ,\nਨੋਡਲ ਗ੍ਰੀਵੈਂਸ ਅਫ਼ਸਰ / ਪਾਰਟਨਰ ਸਪੋਰਟ,\n${platform},\n\nਵਿਸ਼ਾ: ਮਿਤੀ ${incidentDate} ਦੀ ਘਟਨਾ ਅਤੇ ${amount} ਦੀ ਅਣਅਧਿਕਾਰਤ ਕਟੌਤੀ ਸੰਬੰਧੀ ਰਸਮੀ ਸ਼ਿਕਾਇਤ\n\nਸ੍ਰੀਮਾਨ ਜੀ,\n\nਮੈਂ [ਤੁਹਾਡਾ ਨਾਮ], ${platform} ਨਾਲ ਰਜਿਸਟਰਡ ਪਾਰਟਨਰ ਹਾਂ (ਆਈਡੀ: ${partnerId})।\n\nਮੈਂ ਹੇਠ ਲਿਖੀ ਸਮੱਸਿਆ ਦੇ ਹੱਲ ਲਈ ਇਹ ਚਿੱਠੀ ਭੇਜ ਰਿਹਾ ਹਾਂ:\n\nਮਸਲੇ ਦਾ ਵੇਰਵਾ:\n${data.incidentDescription}\n\nਮੁੱਖ ਨੁਕਤੇ:\n- ਘਟਨਾ ਦੀ ਮਿਤੀ: ${incidentDate}\n- ਰਕਮ: ${amount}\n\nਮੈਂ ਪਲੇਟਫਾਰਮ ਦੇ ਸਾਰੇ ਨਿਯਮਾਂ ਦੀ ਪਾਲਣਾ ਕੀਤੀ ਹੈ। ਬਿਨਾਂ ਕਿਸੇ ਲਿਖਤੀ ਕਾਰਨ ਦੇ ਪੈਸੇ ਰੋਕਣਾ ਗਲਤ ਹੈ।\n\nਮੇਰੀ ਮੰਗ:\n${resolution}\n\nਕਿਰਪਾ ਕਰਕੇ 48 ਘੰਟਿਆਂ ਦੇ ਅੰਦਰ ਇਸ ਮਸਲੇ ਦਾ ਨਿਪਟਾਰਾ ਕੀਤਾ ਜਾਵੇ।\n\nਧੰਨਵਾਦ ਸਹਿਤ,\n[ਤੁਹਾਡਾ ਨਾਮ]\nਆਈਡੀ: ${partnerId}`,
      evidenceChecklist: [
        'ਪੇ-ਆਊਟ ਸਟੇਟਮੈਂਟ ਦੇ ਸਕ੍ਰੀਨਸ਼ਾਟ',
        'ਪੂਰੇ ਕੀਤੇ ਆਰਡਰਾਂ ਦਾ ਵੇਰਵਾ',
      ],
      suggestedEscalation: [
        'ਨੈਸ਼ਨਲ ਕੰਜ਼ਿਊਮਰ ਹੈਲਪਲਾਈਨ 1915 ਤੇ ਸ਼ਿਕਾਇਤ',
        'ਲੇਬਰ ਕਮਿਸ਼ਨ ਪੋਰਟਲ ਤੇ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
      ],
    };
  }

  // English default
  return {
    subject: `Formal Grievance: Arbitrary Deduction / Delayed Payout of ${amount} — Partner ID: ${partnerId}`,
    complaintBody: `To,\nThe Grievance Redressal Officer / Partner Support Lead,\n${platform},\n\nSubject: Formal Grievance regarding ${data.category.replace('_', ' ')} and withholding of ${amount} on ${incidentDate}\n\nDear Sir/Madam,\n\nI am writing to register a formal grievance regarding my gig partner account with ${platform} (Partner/Driver ID: ${partnerId}, Registered Mobile: [Insert Registered Mobile]).\n\n1. Incident Summary:\n${data.incidentDescription}\n\n2. Key Particulars:\n- Date of Incident: ${incidentDate}\n- Disputed Amount: ${amount}\n- Target Platform: ${platform}\n\nI have consistently fulfilled all contractual obligations and platform standards in good faith. Withholding earned income, imposing unverified penalties, or terminating service access without transparent itemization and a fair hearing violates established principles of fairness and natural justice.\n\n3. Required Resolution:\n${resolution}\n\nI request that your grievance department review this matter and provide a written resolution within 48 to 72 hours in accordance with Intermediary Guidelines. Failing an amicable resolution, I reserve the right to escalate this dispute to the National Consumer Helpline (NCH 1915) and relevant statutory labor conciliation authorities.\n\nSincerely,\n\n[Worker Name]\nPartner ID: ${partnerId}\nContact: [Registered Mobile / Email]`,
    evidenceChecklist: [
      'Weekly earnings statement highlighting the deduction or missing balance',
      'Screenshots of completed orders / trip receipts during the disputed time period',
      'In-app helpdesk support ticket numbers and conversation logs',
    ],
    suggestedEscalation: [
      'Escalate to National Consumer Helpline (Dial 1915 or visit consumerhelpline.gov.in)',
      'File an online complaint on Ministry of Labour SAMADHAN Portal (samadhan.labour.gov.in)',
      'Reach out to State Gig Workers Welfare Board (if operating in your state)',
    ],
  };
}
