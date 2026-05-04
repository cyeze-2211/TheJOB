import { useState } from 'react';
import { 
  Users, 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  PieChart, 
  Settings, 
  Bell, 
  Search, 
  Filter, 
  MoreHorizontal,
  ChevronRight,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { MOCK_CANDIDATES, MOCK_VACANCIES } from '../../constants';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line,
  Cell
} from 'recharts';

const pipelineData = [
  { name: 'NEW', value: 120, color: '#3b82f6' },
  { name: 'FILTERED', value: 60, color: '#6366f1' },
  { name: 'INTERVIEW', value: 30, color: '#a855f7' },
  { name: 'READY', value: 25, color: '#10b981' },
  { name: 'SENT', value: 15, color: '#f59e0b' },
];

const conversionData = [
  { day: '06.05', val: 12 },
  { day: '07.05', val: 18 },
  { day: '08.05', val: 15 },
  { day: '09.05', val: 25 },
  { day: '10.05', val: 20 },
  { day: '11.05', val: 30 },
  { day: '12.05', val: 28 },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Briefcase size={20} />
          </div>
          <span className="font-bold text-lg tracking-tight">THE KASB</span>
        </div>

        <nav className="flex-1 px-4 space-y-2 py-4">
          <SideItem icon={<LayoutDashboard size={20} />} label="Bosh sahifa" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <SideItem icon={<Users size={20} />} label="Nomzodlar" active={activeTab === 'candidates'} onClick={() => setActiveTab('candidates')} />
          <SideItem icon={<Briefcase size={20} />} label="Vakansiyalar" active={activeTab === 'vacancies'} onClick={() => setActiveTab('vacancies')} />
          <SideItem icon={<FileText size={20} />} label="Arizalar" active={activeTab === 'applications'} onClick={() => setActiveTab('applications')} />
          <SideItem icon={<PieChart size={20} />} label="Hisobotlar" active={activeTab === 'reports'} onClick={() => setActiveTab('reports')} />
          <SideItem icon={<Settings size={20} />} label="Sozlamalar" active={activeTab === 'settings'} onClick={() => setActiveTab('settings')} />
        </nav>

        <div className="p-4 mt-auto border-t border-slate-800">
          <div className="flex items-center gap-3 bg-slate-800/50 p-3 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">Admin</div>
            <div className="flex-1">
              <p className="text-xs font-bold">Admin</p>
              <p className="text-[10px] text-slate-400">superadmin</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-10">
          <h1 className="text-xl font-bold">Bosh sahifa</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input className="bg-slate-100 border-none rounded-xl pl-10 pr-4 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/10 w-64" placeholder="Qidirish..." />
            </div>
            <button className="relative w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
              <Bell size={20} />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-6">
            <StatCard label="Yangi nomzodlar" value="127" change="+12.5%" color="bg-blue-600" />
            <StatCard label="Arizalar" value="46" change="+5.2%" color="bg-indigo-600" />
            <StatCard label="READY nomzodlar" value="32" change="+3.1%" color="bg-emerald-600" />
            <StatCard label="Kutilayotgan daromad" value="28 450 €" change="+8.9%" color="bg-blue-600" isCurrency />
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Pipeline Chart */}
            <div className="col-span-12 lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold">Nomzodlar oqimi (pipeline)</h3>
                <MoreHorizontal size={20} className="text-slate-400 cursor-pointer" />
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={pipelineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                    <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]} barSize={40}>
                      {pipelineData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conversion Chart */}
            <div className="col-span-12 lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold">Grafik: Konversiya dinamikasi</h3>
                  <p className="text-[10px] text-slate-400">Oxirgi 7 kun</p>
                </div>
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">
                  <TrendingUp size={14} /> 21.2%
                </div>
              </div>
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 600, fill: '#64748b' }} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} />
                    <Line type="monotone" dataKey="val" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {/* Recent Candidates */}
            <div className="col-span-12 lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="font-bold">Nomzodlar bazasi</h3>
                <button className="text-blue-600 text-xs font-bold flex items-center gap-1 hover:underline">
                  Barchasini ko'rish <ChevronRight size={14} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-100 text-[10px] uppercase font-bold text-slate-400">
                      <th className="px-6 py-4">Nomzod</th>
                      <th className="px-6 py-4">Kasb</th>
                      <th className="px-6 py-4">Til</th>
                      <th className="px-6 py-4">Satus</th>
                      <th className="px-6 py-4 text-center">Score</th>
                      <th className="px-6 py-4">Amallar</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_CANDIDATES.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-500 overflow-hidden">
                              {c.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-xs font-bold text-slate-700">{c.name}</p>
                              <p className="text-[10px] text-slate-400">{c.age} yosh</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-xs font-medium text-slate-600">{c.profession}</td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded-full">{c.languageLevel}</span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-full",
                            c.status === 'READY' ? "bg-emerald-100 text-emerald-600" :
                            c.status === 'FILTERED' ? "bg-indigo-100 text-indigo-600" :
                            c.status === 'INTERVIEW' ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                          )}>
                            {c.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="text-xs font-bold text-slate-700">{c.score}%</span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg transition-colors">
                            Yuborish
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Side Stats */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold mb-4">Tezkor ishlar 🔥</h3>
                <div className="space-y-4">
                  {MOCK_VACANCIES.map((v) => (
                    <div key={v.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors group cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-lg">{v.country === 'Germaniya' ? '🇩🇪' : v.country === 'Polsha' ? '🇵🇱' : '🇮🇱'}</div>
                        <div>
                          <p className="text-xs font-bold">{v.country} - {v.title}</p>
                          <p className="text-[10px] text-slate-400">A2 til, 2 yil tajriba</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-700">15 ta joy</p>
                        <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-blue-500 transition-colors" />
                      </div>
                    </div>
                  ))}
                  <button className="w-full text-xs font-bold text-blue-600 py-2">Barchasini ko'rish</button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <h3 className="font-bold mb-4">Kasblar bo'yicha (top 5)</h3>
                <div className="space-y-3">
                  <KasbProgress name="Quruvchi" count={1560} percentage={90} color="bg-yellow-500" />
                  <KasbProgress name="Elektrik" count={1120} percentage={75} color="bg-blue-500" />
                  <KasbProgress name="Ombor ishchisi" count={980} percentage={65} color="bg-orange-500" />
                  <KasbProgress name="Haydovchi" count={760} percentage={50} color="bg-emerald-500" />
                  <KasbProgress name="Santexnik" count={540} percentage={35} color="bg-purple-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SideItem({ icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
        active ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
      )}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ label, value, change, color, isCurrency }: { label: string, value: string, change: string, color: string, isCurrency?: boolean }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col gap-4 group hover:shadow-md transition-all">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{label}</p>
        <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{change}</span>
      </div>
      <div className="flex items-end justify-between">
        <h2 className="text-2xl font-bold">{value}</h2>
        <div className={cn("w-2 h-8 rounded-full opacity-20 group-hover:opacity-100 transition-all", color)} />
      </div>
      <p className="text-[10px] text-slate-400">Bugun jami</p>
    </div>
  );
}

function KasbProgress({ name, count, percentage, color }: { name: string, count: number, percentage: number, color: string }) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center text-[10px] font-bold">
        <span>{name}</span>
        <span className="text-slate-400">{count}</span>
      </div>
      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={cn("h-full transition-all duration-500", color)} style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
}
