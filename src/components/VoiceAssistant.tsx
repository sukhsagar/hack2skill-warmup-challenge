'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language, ProblemCategory } from '@/types';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  RotateCcw,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Edit3,
} from 'lucide-react';

interface VoiceAssistantProps {
  language: Language;
  onSendToRights: (query: string, category?: ProblemCategory) => void;
  onSendToComplaint: (query: string, category?: ProblemCategory) => void;
  lastResponseText?: string;
}

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
      length: number;
    };
    length: number;
  };
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: { error: string }) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
  abort: () => void;
}

export function VoiceAssistant({
  language,
  onSendToRights,
  onSendToComplaint,
  lastResponseText,
}: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [editedTranscript, setEditedTranscript] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [detectedIntent, setDetectedIntent] = useState<'rights' | 'complaint' | 'speak' | null>(null);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  // Check SpeechRecognition support on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowWithSpeech = window as unknown as {
        SpeechRecognition?: new () => SpeechRecognitionInstance;
        webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
      };
      const hasSpeech = Boolean(windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition);
      setIsSupported(hasSpeech);
    }
  }, []);

  // Set recognition language
  const getRecognitionLang = (lang: Language) => {
    switch (lang) {
      case 'hi':
        return 'hi-IN';
      case 'pa':
        return 'pa-IN';
      default:
        return 'en-IN';
    }
  };

  // Start speech recognition
  const startListening = () => {
    setRecognitionError(null);
    setDetectedIntent(null);

    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: new () => SpeechRecognitionInstance;
      webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
    };

    const SpeechRec = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRec) {
      setIsSupported(false);
      setRecognitionError(
        language === 'hi'
          ? 'आपका ब्राउज़र वॉयस रिकॉग्निशन को सपोर्ट नहीं करता है। कृपया नीचे लिखकर बताएं।'
          : language === 'pa'
          ? 'ਤੁਹਾਡਾ ਬ੍ਰਾਊਜ਼ਰ ਵੌਇਸ ਰਿਕੋਗਨੀਸ਼ਨ ਨੂੰ ਸਪੋਰਟ ਨਹੀਂ ਕਰਦਾ। ਕਿਰਪਾ ਕਰਕੇ ਲਿਖ ਕੇ ਦੱਸੋ।'
          : 'Speech recognition is not supported in this browser. Please type your request.'
      );
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = getRecognitionLang(language);

      recognition.onresult = (e: SpeechRecognitionEvent) => {
        let currentText = '';
        for (let i = 0; i < e.results.length; ++i) {
          currentText += e.results[i][0].transcript;
        }
        setTranscript(currentText);
        setEditedTranscript(currentText);
        analyzeIntent(currentText);
      };

      recognition.onerror = (event: { error: string }) => {
        console.warn('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setRecognitionError(
            language === 'hi'
              ? 'माइक्रोफ़ोन की अनुमति अस्वीकृत कर दी गई है। कृपया ब्राउज़र सेटिंग्स में अनुमति दें।'
              : language === 'pa'
              ? 'ਮਾਈਕ੍ਰੋਫੋਨ ਦੀ ਇਜਾਜ਼ਤ ਰੱਦ ਕੀਤੀ ਗਈ ਹੈ। ਕਿਰਪਾ ਕਰਕੇ ਬ੍ਰਾਊਜ਼ਰ ਸੈਟਿੰਗਜ਼ ਚੈੱਕ ਕਰੋ।'
              : 'Microphone permission was denied. Please allow microphone access in browser settings.'
          );
        } else if (event.error !== 'no-speech') {
          setRecognitionError(`Recognition issue: ${event.error}. Please try speaking again or use text.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
      setIsListening(true);
    } catch (err) {
      console.error('Failed to start speech recognition:', err);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    setIsListening(false);
  };

  // Rule-based quick intent parsing
  const analyzeIntent = (text: string) => {
    const lower = text.toLowerCase();

    if (
      lower.includes('read') ||
      lower.includes('speak') ||
      lower.includes('bol kar') ||
      lower.includes('padho') ||
      lower.includes('ਪੜ੍ਹੋ') ||
      lower.includes('sunao')
    ) {
      setDetectedIntent('speak');
    } else if (
      lower.includes('complaint') ||
      lower.includes('letter') ||
      lower.includes('notice') ||
      lower.includes('shikayat') ||
      lower.includes('शिकायत') ||
      lower.includes('draft') ||
      lower.includes('appeal')
    ) {
      setDetectedIntent('complaint');
    } else {
      setDetectedIntent('rights');
    }
  };

  // Text-to-Speech using browser speechSynthesis
  const speakText = (textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel(); // clear previous queue

    const cleanText = textToSpeak.replace(/[#*`_]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Pick best matching voice
    utterance.lang = language === 'hi' ? 'hi-IN' : language === 'pa' ? 'pa-IN' : 'en-IN';
    utterance.rate = 0.95; // slightly slower for high clarity

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleAction = (action: 'rights' | 'complaint') => {
    const finalQuery = editedTranscript.trim() || transcript.trim();
    if (!finalQuery) return;

    if (action === 'rights') {
      onSendToRights(finalQuery);
    } else {
      onSendToComplaint(finalQuery);
    }
  };

  return (
    <div className="bg-white border border-[#E5E4DD] rounded-2xl p-4 sm:p-5 shadow-xs space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E4DD]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary-light text-primary flex items-center justify-center">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-on-surface">
              {language === 'hi'
                ? 'आवाज़ सहायक (Voice Assistant)'
                : language === 'pa'
                ? 'ਅਵਾਜ਼ ਸਹਾਇਕ (Voice Assistant)'
                : 'Awaaz Voice Assistant'}
            </h3>
            <p className="text-xs text-secondary">
              {language === 'hi'
                ? 'बोलकर सवाल पूछें या शिकायत दर्ज करें'
                : language === 'pa'
                ? 'ਬੋਲ ਕੇ ਸਵਾਲ ਪੁੱਛੋ ਜਾਂ ਸ਼ਿਕਾਇਤ ਲਿਖੋ'
                : 'Speak, review transcript, and trigger guidance or complaint'}
            </p>
          </div>
        </div>

        {/* Read last response button if available */}
        {lastResponseText && (
          <button
            type="button"
            onClick={() => speakText(lastResponseText)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
              isSpeaking
                ? 'bg-error-container text-error animate-pulse'
                : 'bg-primary-light text-primary hover:bg-primary-light/80'
            }`}
            title="Read guidance aloud"
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Stop</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span>Listen Aloud</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Main Microphone Interaction Button */}
      <div className="flex flex-col items-center justify-center py-2">
        <button
          type="button"
          onClick={isListening ? stopListening : startListening}
          className={`w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-md active:scale-95 ${
            isListening
              ? 'bg-error-container text-error ring-4 ring-error/30 animate-pulse'
              : 'bg-primary hover:bg-primary-dark text-white'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start speaking'}
        >
          {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
        </button>

        <p className="text-sm font-bold text-on-surface mt-3">
          {isListening
            ? language === 'hi'
              ? 'सुन रहा हूँ... बोलिए'
              : language === 'pa'
              ? 'ਸੁਣ ਰਿਹਾ ਹਾਂ... ਬੋਲੋ'
              : 'Listening... Speak now'
            : language === 'hi'
            ? 'माइक दबाकर बोलें'
            : language === 'pa'
            ? 'ਮਾਈਕ ਦਬਾ ਕੇ ਬੋਲੋ'
            : 'Tap mic to speak your problem'}
        </p>
        <span className="text-xs text-secondary mt-0.5">
          {language === 'hi'
            ? 'उदा: "मेरा पिछले हफ्ते का इंसेंटिव रुक गया है"'
            : language === 'pa'
            ? 'ਜਿਵੇਂ: "ਮੇਰਾ ਪਿਛਲੇ ਹਫ਼ਤੇ ਦਾ ਇਨਸੈਂਟਿਵ ਰੋਕਿਆ ਗਿਆ ਹੈ"'
            : 'E.g., "Weekly payout docked without explanation"'}
        </span>
      </div>

      {/* Recognition Error Banner */}
      {recognitionError && (
        <div className="p-3 rounded-xl bg-error-container text-error text-xs font-medium flex items-start gap-2 border border-error/30">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span>{recognitionError}</span>
          </div>
        </div>
      )}

      {/* Transcript Review & Confirmation Area */}
      {(transcript || isListening || !isSupported) && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider flex items-center gap-1">
              <Edit3 className="w-3.5 h-3.5 text-primary" />
              <span>Review & Edit Before Submitting</span>
            </span>
            {transcript && (
              <button
                type="button"
                onClick={() => {
                  setTranscript('');
                  setEditedTranscript('');
                  setDetectedIntent(null);
                }}
                className="text-xs text-secondary hover:text-error flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear</span>
              </button>
            )}
          </div>

          <textarea
            rows={3}
            value={editedTranscript}
            onChange={(e) => {
              setEditedTranscript(e.target.value);
              analyzeIntent(e.target.value);
            }}
            placeholder={
              language === 'hi'
                ? 'आपकी आवाज़ यहाँ टेक्स्ट में दिखाई देगी। आप इसे भेजते समय एडिट भी कर सकते हैं...'
                : language === 'pa'
                ? 'ਤੁਹਾਡੀ ਅਵਾਜ਼ ਇੱਥੇ ਟੈਕਸਟ ਵਿੱਚ ਦਿਖਾਈ ਦੇਵੇਗੀ...'
                : 'Your speech will appear here. You can review or edit before submitting...'
            }
            className="w-full p-3.5 text-base rounded-xl border border-[#E5E4DD] bg-[#FAF9F5] focus:bg-white focus:border-primary focus:outline-none text-on-surface font-medium placeholder:text-outline"
          />

          {/* Action Triggers based on confirmed transcript */}
          {editedTranscript.trim() && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
              <div className="text-xs text-secondary flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>
                  {detectedIntent === 'complaint'
                    ? 'Complaint intent detected'
                    : 'Rights guidance intent detected'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAction('rights')}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    detectedIntent !== 'complaint'
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-xs'
                      : 'bg-[#F2F1EA] text-secondary hover:text-on-surface'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explain Rights</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAction('complaint')}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    detectedIntent === 'complaint'
                      ? 'bg-primary text-white hover:bg-primary-dark shadow-xs'
                      : 'bg-[#F2F1EA] text-secondary hover:text-on-surface'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Draft Complaint</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
