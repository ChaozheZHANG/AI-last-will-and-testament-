import React from 'react';

interface HeaderProps {
  onHome: () => void;
  onFaq: () => void;
  onLegal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onHome, onFaq, onLegal }) => {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center cursor-pointer" onClick={onHome}>
          <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center mr-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-800 font-serif tracking-tight">AI WillGen <span className="text-slate-400 font-sans text-sm font-normal ml-2">智能遗嘱</span></h1>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm font-medium text-slate-600">
          <button onClick={onHome} className="hover:text-slate-900 transition-colors">首页</button>
          <button onClick={onFaq} className="hover:text-slate-900 transition-colors">常见问题</button>
          <button onClick={onLegal} className="hover:text-slate-900 transition-colors">法律声明</button>
        </nav>
      </div>
    </header>
  );
};