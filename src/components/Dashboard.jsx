import { useEffect, useMemo, useState } from 'react';
import { BarChart3, History } from 'lucide-react';

function formatDate(ts) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function Dashboard() {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem('sb_sessions') || '[]');
      setSessions(s);
    } catch (e) {
      setSessions([]);
    }
  }, []);

  const stats = useMemo(() => {
    const totalSessions = sessions.length;
    const totalWords = sessions.reduce((a, b) => a + (b.words || 0), 0);
    const topWords = (() => {
      const freq = {};
      sessions.forEach((s) => {
        s.text?.split(/\s+/).forEach((w) => {
          if (!w) return;
          freq[w] = (freq[w] || 0) + 1;
        });
      });
      return Object.entries(freq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6);
    })();
    return { totalSessions, totalWords, topWords };
  }, [sessions]);

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <BarChart3 />
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="text-sm text-neutral-500">Total Sessions</div>
          <div className="mt-2 text-3xl font-bold">{stats.totalSessions}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="text-sm text-neutral-500">Total Words Transcribed</div>
          <div className="mt-2 text-3xl font-bold">{stats.totalWords}</div>
        </div>
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="text-sm text-neutral-500">Average Words/Session</div>
          <div className="mt-2 text-3xl font-bold">{stats.totalSessions ? Math.round(stats.totalWords / stats.totalSessions) : 0}</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="mb-4 text-sm font-semibold text-neutral-600 dark:text-neutral-300">Most Recognized Words</div>
          <div className="space-y-3">
            {stats.topWords.length === 0 && <div className="text-sm text-neutral-500">No data yet. Run a translation session.</div>}
            {stats.topWords.map(([word, count]) => (
              <div key={word} className="flex items-center gap-3">
                <div className="w-24 text-sm text-neutral-600 dark:text-neutral-300">{word}</div>
                <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-orange-500"
                    style={{ width: `${Math.min(100, 10 + count * 10)}%` }}
                  />
                </div>
                <div className="w-8 text-right text-sm">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="mb-4 flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
            <History size={16} />
            Recent Sessions
          </div>
          <div className="space-y-4">
            {sessions.length === 0 && <div className="text-sm text-neutral-500">No sessions yet.</div>}
            {sessions.slice(0, 6).map((s) => (
              <div key={s.id} className="rounded-xl border border-black/5 p-4 dark:border-white/10">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">{formatDate(s.ts)}</div>
                  <div className="text-neutral-500">{s.words} words</div>
                </div>
                <div className="mt-2 line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
