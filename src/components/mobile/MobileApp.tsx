import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  ChevronRight, 
  LayoutGrid, 
  ClipboardList, 
  User, 
  Home, 
  MapPin, 
  Briefcase, 
  CheckCircle2,
  ChevronLeft,
  Search,
  Check
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_VACANCIES } from '../../constants';

type Screen = 'splash' | 'phone' | 'otp' | 'profile1' | 'profile2' | 'profile3' | 'results' | 'applications';

export default function MobileApp() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    name: '',
    age: '',
    city: '',
    profession: '',
    timing: ''
  });

  const nextScreen = (s: Screen) => setScreen(s);

  return (
    <div className="max-w-[430px] mx-auto min-h-screen bg-white shadow-2xl overflow-hidden relative font-sans flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {screen === 'splash' && <SplashScreen key="splash" onStart={() => nextScreen('phone')} />}
          {screen === 'phone' && <PhoneScreen key="phone" value={formData.phone} onChange={(v) => setFormData({...formData, phone: v})} onNext={() => nextScreen('otp')} />}
          {screen === 'otp' && <OTPScreen key="otp" onNext={() => nextScreen('profile1')} />}
          {screen === 'profile1' && <ProfileStep1 key="p1" data={formData} update={(d) => setFormData({...formData, ...d})} onNext={() => nextScreen('profile2')} />}
          {screen === 'profile2' && <ProfileStep2 key="p2" value={formData.profession} onChange={(v) => setFormData({...formData, profession: v})} onNext={() => nextScreen('profile3')} />}
          {screen === 'profile3' && <ProfileStep3 key="p3" value={formData.timing} onChange={(v) => setFormData({...formData, timing: v})} onNext={() => nextScreen('results')} />}
          {screen === 'results' && <ResultsScreen key="results" onNext={() => nextScreen('applications')} />}
          {screen === 'applications' && <ApplicationsScreen key="apps" />}
        </AnimatePresence>
      </div>

      {['results', 'applications'].includes(screen) && (
        <nav className="h-16 border-t flex items-center justify-around bg-white px-4">
          <button 
            onClick={() => nextScreen('results')}
            className={cn("flex flex-col items-center gap-1", screen === 'results' ? "text-blue-600" : "text-slate-400")}
          >
            <Home size={20} />
            <span className="text-[10px] font-medium">Asosiy</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <Search size={20} />
            <span className="text-[10px] font-medium">Ishlar</span>
          </button>
          <button 
            onClick={() => nextScreen('applications')}
            className={cn("flex flex-col items-center gap-1", screen === 'applications' ? "text-blue-600" : "text-slate-400")}
          >
            <ClipboardList size={20} />
            <span className="text-[10px] font-medium">Arizalar</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-slate-400">
            <User size={20} />
            <span className="text-[10px] font-medium">Profil</span>
          </button>
        </nav>
      )}
    </div>
  );
}

function SplashScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col bg-[#0f172a] text-white p-8"
    >
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mb-4">
          <Briefcase size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">THE KASB</h1>
        <p className="text-blue-400 font-medium">To'g'ri kasb — to'g'ri kelajak</p>
        
        <div className="mt-12 space-y-4">
          <h2 className="text-2xl font-bold">Xorijda ishlash imkoniyatlari</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            Ishingiz, maqsadingiz va kelajagingiz biz bilan boshlanadi.
          </p>
        </div>
      </div>
      
      <div className="space-y-3 pb-8">
        <button 
          onClick={onStart}
          className="w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2"
        >
          Boshlash <ChevronRight size={20} />
        </button>
        <button className="w-full py-4 rounded-xl font-semibold text-slate-400 hover:text-white transition-colors">
          Kirish
        </button>
      </div>
    </motion.div>
  );
}

function PhoneScreen({ value, onChange, onNext }: any) {
  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="p-8 pt-16 flex flex-col gap-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">Telefon raqamingizni kiriting</h2>
        <p className="text-slate-500 text-sm">SMS orqali tasdiqlash kodi yuboriladi</p>
      </div>

      <div className="flex gap-3">
        <div className="w-20 bg-slate-100 border border-slate-200 rounded-xl px-4 py-4 text-slate-900 font-semibold">
          +998
        </div>
        <input 
          autoFocus
          placeholder="90 123 45 67"
          className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-4 text-slate-900 font-semibold outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
      >
        SMS kod yuborish
      </button>

      <p className="text-[10px] text-slate-400 text-center leading-relaxed">
        Davom etish orqali siz foydalanuvchi shartlariga rozilik bildirasiz
      </p>
    </motion.div>
  );
}

function OTPScreen({ onNext }: any) {
  return (
    <motion.div 
      initial={{ x: 50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="p-8 pt-16 flex flex-col gap-8"
    >
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-slate-900 leading-tight">SMS kodni kiriting</h2>
        <p className="text-slate-500 text-sm">+998 90 123 45 67 raqamiga yuborilgan kodni kiriting</p>
      </div>

      <div className="flex justify-between gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex-1 aspect-[4/5] bg-slate-100 border border-slate-200 rounded-xl flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-300" />
          </div>
        ))}
      </div>

      <div className="text-center">
        <button className="text-slate-400 text-xs font-medium">Qayta yuborish (00:45)</button>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all"
      >
        Tasdiqlash
      </button>
    </motion.div>
  );
}

function ProfileStep1({ data, update, onNext }: any) {
  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-8 pt-10 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-blue-600">Profil yaratish</h2>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">1/6</span>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400">Ismingiz</label>
          <input 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500"
            placeholder="Jasur"
            value={data.name}
            onChange={(e) => update({ name: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400">Yoshingiz</label>
          <input 
            type="number"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium outline-none"
            placeholder="28"
            value={data.age}
            onChange={(e) => update({ age: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400">Shaharingiz</label>
          <input 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 font-medium outline-none"
            placeholder="Toshkent"
            value={data.city}
            onChange={(e) => update({ city: e.target.value })}
          />
        </div>
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all mt-4"
      >
        Keyingi
      </button>
    </motion.div>
  );
}

function ProfileStep2({ value, onChange, onNext }: any) {
  const professions = [
    { name: 'Quruvchi', icon: <Briefcase size={20} /> },
    { name: 'Elektrik', icon: <Briefcase size={20} /> },
    { name: 'Santexnik', icon: <Briefcase size={20} /> },
    { name: 'Ofitsiant', icon: <Briefcase size={20} /> },
    { name: 'Haydovchi', icon: <Briefcase size={20} /> },
    { name: 'Ombor ishchisi', icon: <Briefcase size={20} /> },
    { name: 'Payvandchi', icon: <Briefcase size={20} /> },
    { name: 'Boshqa', icon: <Briefcase size={20} /> },
  ];

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-8 pt-10 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-blue-600">Kasbingizni tanlang</h2>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">2/6</span>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {professions.map((p) => (
          <button 
            key={p.name}
            onClick={() => onChange(p.name)}
            className={cn(
              "flex flex-col items-center justify-center aspect-square rounded-xl border-2 gap-2 transition-all p-2",
              value === p.name ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 bg-white text-slate-500 grayscale opacity-80"
            )}
          >
            {p.icon}
            <span className="text-[10px] font-bold text-center leading-tight">{p.name}</span>
          </button>
        ))}
      </div>

      <button 
        onClick={onNext}
        disabled={!value}
        className="w-full bg-blue-600 disabled:opacity-50 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all mt-4"
      >
        Keyingi
      </button>
    </motion.div>
  );
}

function ProfileStep3({ value, onChange, onNext }: any) {
  const options = [
    { id: 'now', label: 'Hozir' },
    { id: '1-3', label: '1-3 oy ichida' },
    { id: 'later', label: 'Keyinroq' },
  ];

  return (
    <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="p-8 pt-10 flex flex-col gap-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-blue-600">Qachon ishlashga tayyorsiz?</h2>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-full">6/6</span>
      </div>

      <div className="space-y-3">
        {options.map((opt) => (
          <button 
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={cn(
              "w-full flex items-center justify-between px-5 py-4 rounded-2xl border-2 transition-all font-bold",
              value === opt.id ? "border-blue-600 bg-blue-50 text-blue-600" : "border-slate-100 bg-white text-slate-600"
            )}
          >
            {opt.label}
            {value === opt.id && <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center"><Check size={12} className="text-white" /></div>}
          </button>
        ))}
      </div>

      <button 
        onClick={onNext}
        className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-blue-500/10 active:scale-[0.98] transition-all mt-4"
      >
        Profilni yaratish
      </button>
    </motion.div>
  );
}

function ResultsScreen({ onNext }: { onNext: () => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-10 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <Briefcase size={24} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">Zo'r! 🎉</h2>
            <p className="text-slate-500 text-xs font-medium">Sizga mos ishlar topildi</p>
          </div>
        </div>
        <button onClick={onNext} className="p-2 bg-slate-100 rounded-xl text-slate-400 hover:text-blue-600 transition-colors">
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="space-y-4">
        {MOCK_VACANCIES.map((job) => (
          <div key={job.id} className="bg-white border-2 border-slate-100 rounded-2xl p-5 shadow-sm space-y-4 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 -rotate-12 translate-x-12 -translate-y-12 rounded-full" />
            
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-2xl">
                  {job.country === 'Germaniya' ? '🇩🇪' : job.country === 'Polsha' ? '🇵🇱' : '🇮🇱'}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{job.country} - {job.title}</h3>
                  <p className="text-[10px] font-bold text-blue-500">{job.salary}</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Rasmiy ish va viza</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-slate-500">
                <CheckCircle2 size={12} className="text-emerald-500" />
                <span>Yotoqxona beriladi</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-600 text-[10px] font-bold hover:bg-slate-200 transition-colors">
                Batafsil ko'rish
              </button>
              <button className="flex-[2] py-3 rounded-xl bg-emerald-500 text-white text-[10px] font-bold shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all">
                Ariza yuborish
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ApplicationsScreen() {
  const apps = [
    { id: '1', title: 'Germaniya - Quruvchi', salary: '1800 - 2200 €', status: 'Ko\'rib chiqilmoqda', date: '12.05.2024', color: 'text-orange-500 bg-orange-50' },
    { id: '2', title: 'Polsha - Ombor ishchisi', salary: '900 - 1200 €', status: 'Intervyuga chaqirildi', date: '10.05.2024', color: 'text-blue-500 bg-blue-50' },
    { id: '3', title: 'Isroil - Elektrik', salary: '2000 - 2500 €', status: 'Tasdiqlandi', date: '08.05.2024', color: 'text-emerald-500 bg-emerald-50' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 pt-10 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">Mening arizalarim</h2>
        <Bell size={20} className="text-slate-400" />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {['Barchasi', 'Jarayonda', 'Tugallandi'].map((tab, i) => (
          <button key={tab} className={cn(
            "px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all",
            i === 0 ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white text-slate-400 border border-slate-100"
          )}>
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {apps.map((app) => (
          <div key={app.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-xl">
                  {app.title.includes('Germasniya') ? '🇩🇪' : app.title.includes('Polsha') ? '🇵🇱' : '🇮🇱'}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{app.title}</h3>
                  <p className="text-[10px] font-bold text-blue-500">{app.salary}</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400">{app.date}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className={cn("text-[10px] font-bold px-3 py-1 rounded-full", app.color)}>
                {app.status}
              </span>
              <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600">Batafsil</button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
