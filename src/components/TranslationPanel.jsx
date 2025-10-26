import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, StopCircle, Volume2, VolumeX, Save, Loader2 } from 'lucide-react';

const DEMO_WORDS = [
  'hello',
  'how',
  'are',
  'you',
  'my',
  'name',
  'is',
  'thank',
  'you',
  'please',
  'good',
  'morning',
  'yes',
  'no',
  'help',
  'where',
  'what',
  'time',
  'meet',
  'later',
];

function useSpeech(enabled) {
  const synthRef = useRef(typeof window !== 'undefined' ? window.speechSynthesis : null);
  const utter = useMemo(() => (typeof window !== 'undefined' ? new SpeechSynthesisUtterance('') : null), []);

  const speak = useCallback(
    (text) => {
      if (!enabled || !synthRef.current || !utter) return;
      try {
        utter.text = text;
        utter.rate = 1.05;
        utter.pitch = 1;
        const voices = synthRef.current.getVoices();
        const en = voices.find((v) => /en(-|\b)/i.test(v.lang));
        if (en) utter.voice = en;
        synthRef.current.speak(utter);
      } catch (e) {
        // silently ignore
      }
    },
    [enabled, utter]
  );

  const cancel = useCallback(() => {
    try {
      synthRef.current?.cancel();
    } catch (e) {}
  }, []);

  return { speak, cancel };
}

function TranslationPanel() {
  const videoRef = useRef(null);
  the const [streaming, setStreaming] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [text, setText] = useState('');
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [sessionSaved, setSessionSaved] = useState(false);
  const intervalRef = useRef(null);
  const { speak, cancel } = useSpeech(ttsEnabled);

  const startCamera = useCallback(async () => {
    setConnecting(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 }, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStreaming(true);
      setSessionSaved(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        const word = DEMO_WORDS[Math.floor(Math.random() * DEMO_WORDS.length)];
        setText((prev) => {
          const next = prev.length ? prev + ' ' + word : word;
          return next;
        });
        if (ttsEnabled) speak(word);
      }, 900);
    } catch (e) {
      console.error(e);
    } finally {
      setConnecting(false);
    }
  }, [speak, ttsEnabled]);

  const stopCamera = useCallback(() => {
    const mediaStream = videoRef.current?.srcObject;
    if (mediaStream) {
      const tracks = mediaStream.getTracks();
      tracks.forEach((t) => t.stop());
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setStreaming(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
    cancel();
  }, [cancel]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const mediaStream = videoRef.current?.srcObject;
      if (mediaStream) mediaStream.getTracks().forEach((t) => t.stop());
    };
  }, []);

  const saveSession = () => {
    try {
      const sessions = JSON.parse(localStorage.getItem('sb_sessions') || '[]');
      const payload = { id: crypto.randomUUID(), text, ts: Date.now(), words: text.split(/\s+/).filter(Boolean).length };
      sessions.unshift(payload);
      localStorage.setItem('sb_sessions', JSON.stringify(sessions.slice(0, 50)));
      setSessionSaved(true);
    } catch (e) {}
  };

  return (
    <section id="demo" className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Live Translation</h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">Webcam feed on the left, real-time text on the right. This demo simulates the AI stream.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={streaming ? stopCamera : startCamera}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition ${
              streaming ? 'bg-red-600 hover:bg-red-700' : 'bg-black hover:bg-neutral-900 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
            }`}
          >
            {streaming ? <StopCircle size={16} /> : <Camera size={16} />}
            {streaming ? 'Stop' : connecting ? 'Starting…' : 'Start Camera'}
          </button>

          <button
            onClick={() => setTtsEnabled((s) => !s)}
            className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black shadow hover:bg-white/90 dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700"
          >
            {ttsEnabled ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {ttsEnabled ? 'Mute' : 'Voice'}
          </button>

          <button
            onClick={saveSession}
            disabled={!text || sessionSaved}
            className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={16} />
            {sessionSaved ? 'Saved' : 'Save Session'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative aspect-video overflow-hidden rounded-2xl border border-black/5 bg-neutral-50 shadow-inner dark:border-white/10 dark:bg-neutral-900">
          <video ref={videoRef} playsInline muted className="h-full w-full object-cover" />
          <AnimatePresence>
            {!streaming && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 grid place-items-center"
              >
                <div className="flex flex-col items-center gap-3 text-center">
                  {connecting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <Camera />
                  )}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Click Start Camera to begin</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex h-full min-h-[18rem] flex-col overflow-hidden rounded-2xl border border-black/5 bg-white shadow dark:border-white/10 dark:bg-neutral-950">
          <div className="border-b border-black/5 p-3 text-xs uppercase tracking-wide text-neutral-500 dark:border-white/10">Real-time Output</div>
          <div className="relative flex-1 overflow-auto p-4">
            <p className="whitespace-pre-wrap text-lg leading-relaxed">
              {text || '… words will appear here as the model decodes your signs'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TranslationPanel;
