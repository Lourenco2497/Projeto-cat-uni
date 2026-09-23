import React from 'react';
import { useApp } from '../store/AppContext';
import { calculateStats } from '../lib/statsCalculator';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  Legend 
} from 'recharts';
import { 
  Flame, 
  Trophy, 
  TrendingDown, 
  Sparkles, 
  RotateCcw, 
  Activity,
  Heart,
  CheckCircle2
} from 'lucide-react';

export const StatsPage: React.FC = () => {
  const { workoutLogs, resetDemoData } = useApp();
  const stats = calculateStats(workoutLogs);

  // Anel de progresso SVG (raio 40, perímetro = 2 * PI * 40 ~= 251.3)
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (stats.weeklyRatePercentage / 100) * circumference;

  return (
    <div className="space-y-4 animate-fade-in text-left">
      
      {/* Título do Ecrã */}
      <div className="flex items-center justify-between py-1">
        <div>
          <h1 className="text-xl font-bold text-[#4A154B] tracking-tight">
            Estatísticas & Evolução
          </h1>
          <p className="text-xs text-[#6E5C6F]">
            Progresso contínuo e resposta aos exercícios
          </p>
        </div>

        <button
          onClick={resetDemoData}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-[#7B287D] text-xs font-semibold border border-[#F3D5D1] shadow-2xs transition-colors cursor-pointer"
          title="Recarregar histórico de exemplo"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Repor Demo</span>
        </button>
      </div>

      {/* Cartão de Frase de Insight em Linguagem Simples (Requisito) */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#4A154B] to-[#7B287D] text-white shadow-md relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-2xl bg-white/20 shrink-0">
            <Sparkles className="w-5 h-5 text-[#E07A5F]" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">
              Insight Clínico da Semana
            </span>
            <p className="text-xs font-semibold leading-relaxed mt-0.5">
              "{stats.simpleInsight}"
            </p>
          </div>
        </div>
      </div>

      {/* Métricas Rápidas: Anel Semanal, Streak e Total Concluídos */}
      <div className="grid grid-cols-3 gap-2.5">
        
        {/* Anel de Progresso Semanal */}
        <div className="bg-white rounded-3xl p-3 shadow-xs border border-[#F3D5D1] flex flex-col items-center justify-center text-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 90 90">
              <circle
                cx="45"
                cy="45"
                r={radius}
                stroke="#F4E8F4"
                strokeWidth="7"
                fill="none"
              />
              <circle
                cx="45"
                cy="45"
                r={radius}
                stroke="#7B287D"
                strokeWidth="7"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-[#2D1E2F]">
                {stats.weeklyRatePercentage}%
              </span>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#6E5C6F] mt-1">Meta Semanal</span>
          <span className="text-[10px] text-[#7B287D] font-semibold">{stats.weeklyCompleted}/{stats.weeklyTarget} treinos</span>
        </div>

        {/* Sequência (Streak) */}
        <div className="bg-white rounded-3xl p-3 shadow-xs border border-[#F3D5D1] flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-[#FFF1EE] text-[#E07A5F] flex items-center justify-center mb-1">
            <Flame className="w-6 h-6 fill-current" />
          </div>
          <span className="text-lg font-bold text-[#2D1E2F] leading-tight">
            {stats.streak} {stats.streak === 1 ? 'dia' : 'dias'}
          </span>
          <span className="text-[10px] text-[#6E5C6F] font-semibold">Sequência</span>
          <span className="text-[9px] text-[#1E7E68] font-bold">Ativa 🔥</span>
        </div>

        {/* Total Concluídos */}
        <div className="bg-white rounded-3xl p-3 shadow-xs border border-[#F3D5D1] flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-[#E8F5F2] text-[#1E7E68] flex items-center justify-center mb-1">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-lg font-bold text-[#2D1E2F] leading-tight">
            {stats.totalCompleted}
          </span>
          <span className="text-[10px] text-[#6E5C6F] font-semibold">Exercícios</span>
          <span className="text-[9px] text-[#6E5C6F]">Realizados</span>
        </div>
      </div>

      {/* Gráfico 1: Linha de Dor Média vs Dificuldade Média ao Longo do Tempo */}
      <div className="bg-white rounded-3xl p-4 shadow-xs border border-[#F3D5D1] space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold text-[#2D1E2F] uppercase tracking-wider">
              Evolução da Dor vs Dificuldade
            </h2>
            <p className="text-[11px] text-[#1E7E68] font-semibold mt-0.5 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" />
              <span>{stats.painTrendText}</span>
            </p>
          </div>
          <div className="flex items-center gap-3 text-[10px] font-semibold">
            <span className="flex items-center gap-1 text-[#C53030]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C53030]" />
              Dor (0-10)
            </span>
            <span className="flex items-center gap-1 text-[#7B287D]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#7B287D]" />
              Dificuldade
            </span>
          </div>
        </div>

        <div className="h-44 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stats.painVsDifficultyChart} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
              <XAxis dataKey="dayLabel" tick={{ fontSize: 10, fill: '#6E5C6F' }} stroke="#F3D5D1" />
              <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: '#6E5C6F' }} stroke="#F3D5D1" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#FFF7F6', borderRadius: '12px', border: '1px solid #F3D5D1', fontSize: '11px' }}
                labelStyle={{ fontWeight: 'bold', color: '#2D1E2F' }}
              />
              <Line 
                type="monotone" 
                dataKey="dor" 
                stroke="#C53030" 
                strokeWidth={2.5} 
                dot={{ r: 3, fill: '#C53030' }} 
                activeDot={{ r: 5 }}
                name="Nível de Dor"
              />
              <Line 
                type="monotone" 
                dataKey="dificuldade" 
                stroke="#7B287D" 
                strokeWidth={2} 
                strokeDasharray="4 4"
                dot={{ r: 3, fill: '#7B287D' }} 
                name="Dificuldade Percebida"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Grid com Gráficos 2 e 3: Barras e Donut */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        
        {/* Gráfico 2: Exercícios por Semana */}
        <div className="bg-white rounded-3xl p-4 shadow-xs border border-[#F3D5D1] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#2D1E2F] uppercase tracking-wider">
              Exercícios por Semana
            </h2>
            <span className="text-[10px] text-[#6E5C6F]">Último mês</span>
          </div>

          <div className="h-36 w-full pt-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.weeklyWorkoutsChart} margin={{ top: 5, right: 5, left: -30, bottom: 0 }}>
                <XAxis dataKey="weekLabel" tick={{ fontSize: 10, fill: '#6E5C6F' }} stroke="#F3D5D1" />
                <YAxis domain={[0, 7]} tick={{ fontSize: 10, fill: '#6E5C6F' }} stroke="#F3D5D1" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF7F6', borderRadius: '12px', border: '1px solid #F3D5D1', fontSize: '11px' }}
                />
                <Bar dataKey="treinos" fill="#7B287D" radius={[6, 6, 0, 0]} name="Sessões concluídas" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico 3: Donut por Tipo de Exercício */}
        <div className="bg-white rounded-3xl p-4 shadow-xs border border-[#F3D5D1] space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-[#2D1E2F] uppercase tracking-wider">
              Tipo de Exercício
            </h2>
            <span className="text-[10px] text-[#6E5C6F]">Distribuição</span>
          </div>

          <div className="h-36 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryDistributionChart}
                  cx="50%"
                  cy="50%"
                  innerRadius={32}
                  outerRadius={52}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {stats.categoryDistributionChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#FFF7F6', borderRadius: '12px', border: '1px solid #F3D5D1', fontSize: '11px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-1 text-[10px] font-medium text-[#6E5C6F] pt-1">
            {stats.categoryDistributionChart.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                <span className="truncate">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
