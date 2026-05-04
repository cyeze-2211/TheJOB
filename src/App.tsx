import { useState } from 'react';
import MobileApp from './components/mobile/MobileApp';
import AdminPanel from './components/admin/AdminPanel';

export default function App() {
  const [view, setView] = useState<'mobile' | 'admin'>('mobile');

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Dev Navigation Switcher */}
      <div className="fixed bottom-4 left-4 z-50 flex gap-2 rounded-full bg-white p-2 shadow-xl border border-slate-200">
        <button
          onClick={() => setView('mobile')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            view === 'mobile' ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          Mobile App
        </button>
        <button
          onClick={() => setView('admin')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            view === 'admin' ? 'bg-blue-600 text-white' : 'hover:bg-slate-100 text-slate-600'
          }`}
        >
          Admin Panel
        </button>
      </div>

      <main>
        {view === 'mobile' ? <MobileApp /> : <AdminPanel />}
      </main>
    </div>
  );
}
