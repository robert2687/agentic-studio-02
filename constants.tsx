import { FileNode } from './types';
import React from 'react';

export const INITIAL_FILES: FileNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'app', type: 'folder', children: [
        { name: 'page.tsx', type: 'file' },
        { name: 'layout.tsx', type: 'file' },
        { name: 'global.css', type: 'file' }
      ]},
      { name: 'components', type: 'folder', children: [
        { name: 'Dashboard.tsx', type: 'file' },
        { name: 'Header.tsx', type: 'file' },
        { name: 'MetricCard.tsx', type: 'file' },
        { name: 'Card.tsx', type: 'file' } // Added to satisfy import in patched code
      ]},
      { name: 'lib', type: 'folder', children: [
        { name: 'utils.ts', type: 'file' },
        { name: 'mockData.ts', type: 'file' } // The "Mock Data Mandate"
      ]}
    ]
  },
  { name: 'package.json', type: 'file' },
  { name: 'theme.json', type: 'file' }, // The "Design System"
  { name: 'next.config.js', type: 'file' }
];

export const MOCK_CODE_HEADER = `import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { theme } from '@/theme.json';

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-studio-700 bg-studio-900">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <span className="font-bold text-white">AS</span>
        </div>
        <h1 className="font-bold text-lg text-white">CryptoDash</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search assets..." 
            className="pl-9 pr-4 py-2 bg-studio-800 border border-studio-600 rounded-md text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="p-2 hover:bg-studio-700 rounded-full relative">
          <Bell className="w-5 h-5 text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
      </div>
    </div>
  );
};`;

export const MOCK_CODE_ERROR = `import React from 'react';
import { Card } from '@/components/ui/card'; // <-- ERROR: Module not found
import { theme } from '@/theme.json';

export const MetricCard = ({ title, value, change }) => {
  return (
    <Card className="p-6 bg-studio-800 border-studio-700">
      <h3 className="text-studio-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={change > 0 ? 'text-green-500' : 'text-red-500'}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </Card>
  );
};`;

export const MOCK_CODE_PATCHED = `import React from 'react';
// PATCHED: Fixed import path based on file structure
import { Card } from '@/components/Card'; 
import { theme } from '@/theme.json';

export const MetricCard = ({ title, value, change }) => {
  return (
    <div className="p-6 rounded-xl bg-studio-800 border border-studio-700 shadow-sm">
      <h3 className="text-studio-500 text-sm font-medium">{title}</h3>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white">{value}</span>
        <span className={\`text-sm font-medium \${change > 0 ? 'text-green-500' : 'text-red-500'}\`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
      </div>
    </div>
  );
};`;