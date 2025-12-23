import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Search, Bell, Activity, ArrowUp, ArrowDown } from 'lucide-react';

const data = [
  { name: 'Mon', btc: 4000, eth: 2400 },
  { name: 'Tue', btc: 3000, eth: 1398 },
  { name: 'Wed', btc: 2000, eth: 9800 },
  { name: 'Thu', btc: 2780, eth: 3908 },
  { name: 'Fri', btc: 1890, eth: 4800 },
  { name: 'Sat', btc: 2390, eth: 3800 },
  { name: 'Sun', btc: 3490, eth: 4300 },
];

const transactions = [
  { id: 'tx_1', user: 'Alice Freeman', avatar: 'AF', type: 'received', amount: '+0.45 BTC', value: '$12,450.00', time: '2 min ago' },
  { id: 'tx_2', user: 'Coinbase Pro', avatar: 'CP', type: 'sent', amount: '-1.20 ETH', value: '$2,800.00', time: '14 min ago' },
  { id: 'tx_3', user: 'Swap Router', avatar: 'SR', type: 'swap', amount: 'USDC -> SOL', value: '$500.00', time: '1 hr ago' },
  { id: 'tx_4', user: 'Bob Wilson', avatar: 'BW', type: 'received', amount: '+1500 USDT', value: '$1,500.00', time: '3 hr ago' },
];

export const Preview: React.FC<{ ready: boolean }> = ({ ready }) => {
  if (!ready) {
    return (
      <div className="h-full w-full bg-white flex flex-col items-center justify-center text-studio-400 bg-gray-50">
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin mb-4" />
        <p className="font-medium">Waiting for development server...</p>
        <p className="text-xs mt-2 text-gray-400">localhost:3000</p>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-slate-900 text-slate-100 font-sans overflow-auto">
      {/* Mock Header */}
      <div className="border-b border-slate-800 p-4 flex justify-between items-center bg-slate-900/50 backdrop-blur sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">C</div>
          <span className="font-bold text-lg">CryptoDash</span>
        </div>
        <div className="flex gap-4 items-center">
           <Search className="w-5 h-5 text-slate-400" />
           <Bell className="w-5 h-5 text-slate-400" />
           <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        </div>
      </div>

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: 'Total Portfolio', val: '$124,592.00', change: '+12.5%', isUp: true },
            { label: 'Bitcoin (BTC)', val: '$43,200.00', change: '+2.1%', isUp: true },
            { label: 'Ethereum (ETH)', val: '$2,800.00', change: '-0.8%', isUp: false },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-800 p-5 rounded-xl border border-slate-700">
              <div className="text-slate-400 text-sm font-medium">{stat.label}</div>
              <div className="flex items-end justify-between mt-2">
                <div className="text-2xl font-bold">{stat.val}</div>
                <div className={`flex items-center text-sm ${stat.isUp ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.isUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" /> Market Activity
            </h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="btc" stroke="#3b82f6" fillOpacity={1} fill="url(#colorBtc)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-800 p-6 rounded-xl border border-slate-700">
             <h3 className="font-semibold mb-4">Asset Distribution</h3>
             <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <BarChart data={data}>
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    cursor={{fill: '#334155'}}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                  />
                  <Bar dataKey="eth" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Transactions - Added for Data Diversity */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
          <div className="p-4 border-b border-slate-700 flex justify-between items-center">
            <h3 className="font-semibold flex items-center gap-2">
              Recent Transactions <span className="text-xs text-slate-500 font-normal ml-2">(Mock Data: src/lib/mockData.ts)</span>
            </h3>
            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
          </div>
          <div className="divide-y divide-slate-700">
            {transactions.map((tx) => (
              <div key={tx.id} className="p-4 flex items-center justify-between hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                    {tx.avatar}
                  </div>
                  <div>
                    <div className="font-medium text-sm">{tx.user}</div>
                    <div className="text-xs text-slate-400">{tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${tx.type === 'received' ? 'text-green-400' : tx.type === 'sent' ? 'text-white' : 'text-blue-400'}`}>
                    {tx.amount}
                  </div>
                  <div className="text-xs text-slate-500">{tx.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};