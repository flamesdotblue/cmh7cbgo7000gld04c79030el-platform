import { useEffect, useState } from 'react';
import { User, Settings } from 'lucide-react';

function ProfileCard() {
  const [name, setName] = useState('Alex Kim');
  const [role, setRole] = useState('Hearing User');
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add('dark');
    else root.classList.remove('dark');
  }, [dark]);

  return (
    <section className="mx-auto max-w-4xl px-4 py-10">
      <div className="mb-6 flex items-center gap-3">
        <User />
        <h2 className="text-2xl font-bold">Profile</h2>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-gradient-to-tr from-neutral-200 to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 grid place-items-center">
            <User />
          </div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="text-sm text-neutral-500">{role}</div>
        </div>

        <div className="md:col-span-2 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="mb-4 flex items-center gap-2">
            <Settings />
            <div className="font-semibold">Settings</div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <label className="flex flex-col gap-1">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">Display Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/20 dark:border-white/10 dark:bg-neutral-900"
              />
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-sm text-neutral-600 dark:text-neutral-300">User Type</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="rounded-xl border border-black/10 bg-white px-3 py-2 text-sm outline-none ring-0 focus:border-black/20 dark:border-white/10 dark:bg-neutral-900"
              >
                <option>Hearing User</option>
                <option>Deaf User</option>
              </select>
            </label>

            <label className="flex items-center justify-between rounded-xl border border-black/10 bg-white px-3 py-3 text-sm dark:border-white/10 dark:bg-neutral-900">
              <span className="text-neutral-700 dark:text-neutral-300">Dark Mode</span>
              <input type="checkbox" checked={dark} onChange={(e) => setDark(e.target.checked)} />
            </label>
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-black/5 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-neutral-950">
        <div className="mb-3 text-sm font-semibold text-neutral-600 dark:text-neutral-300">About</div>
        <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          This prototype demonstrates the planned user experience for SignBridge: real-time sign language interpretation with optional
          speech output, session analytics, and a modern, accessible UI.
        </p>
      </div>
    </section>
  );
}

export default ProfileCard;
