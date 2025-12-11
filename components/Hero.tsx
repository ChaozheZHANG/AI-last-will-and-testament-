import React from 'react';

interface HeroProps {
  onStart: () => void;
  onLearnMore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onLearnMore }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-6">
          <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          智能法律科技驱动
        </div>
        <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight font-serif mb-6 leading-tight">
          为您的爱与责任<br />
          <span className="text-blue-600">立下一份恒久的承诺</span>
        </h2>
        <p className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          无需昂贵的律师费用，只需选择适合您的模板，回答几个简单的问题，我们的智能助手将在几分钟内为您起草一份专业的遗嘱草稿。安全、私密、便捷。
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all transform hover:-translate-y-0.5"
          >
            开始免费起草
          </button>
          <button 
            onClick={onLearnMore}
            className="w-full sm:w-auto px-8 py-4 bg-white text-slate-700 border border-slate-200 text-lg font-semibold rounded-xl hover:bg-slate-50 transition-all"
          >
            了解更多
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 text-left">
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">多种模板</h3>
            <p className="text-slate-600 text-sm">提供标准版、家庭版、双语版等多种选择，满足不同场景需求。</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">专业格式</h3>
            <p className="text-slate-600 text-sm">基于法律文档标准模板，语言严谨，结构清晰。</p>
          </div>
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">私密安全</h3>
            <p className="text-slate-600 text-sm">您的数据仅在本地和生成时使用，我们不会存储您的个人信息。</p>
          </div>
        </div>
      </div>
    </div>
  );
};