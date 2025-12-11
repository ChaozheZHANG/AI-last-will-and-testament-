import React from 'react';
import { WillTemplate } from '../types';

interface Props {
  selected: WillTemplate;
  onChange: (template: WillTemplate) => void;
  onNext: () => void;
}

export const StepTemplate: React.FC<Props> = ({ selected, onChange, onNext }) => {
  const templates: { id: WillTemplate; title: string; desc: string; icon: string }[] = [
    {
      id: 'standard',
      title: '通用标准版',
      desc: '适用于大多数标准情况，包含完整的资产分配和执行人条款。',
      icon: '📋'
    },
    {
      id: 'married_kids',
      title: '家庭守护版 (已婚有子女)',
      desc: '特别强化了未成年子女的监护人指定条款，适合有家庭的人士。',
      icon: '👨‍👩‍👧‍👦'
    },
    {
      id: 'simple',
      title: '极简版',
      desc: '仅包含最核心的遗嘱声明和简单的全额资产分配，适合资产结构简单者。',
      icon: '📝'
    },
    {
      id: 'bilingual',
      title: '中英双语版',
      desc: '生成中英文对照的遗嘱文档，适合有海外资产或跨国背景的人士。',
      icon: '🌏'
    }
  ];

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">选择遗嘱模板</h3>
      <p className="text-slate-500 mb-8">请根据您的具体情况选择最合适的模板类型。</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {templates.map((t) => (
          <div 
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-all hover:shadow-md ${
              selected === t.id 
                ? 'border-slate-900 bg-slate-50' 
                : 'border-slate-200 bg-white hover:border-slate-300'
            }`}
          >
            <div className="text-3xl mb-3">{t.icon}</div>
            <h4 className="font-bold text-slate-900 mb-2">{t.title}</h4>
            <p className="text-sm text-slate-500 leading-relaxed">{t.desc}</p>
            <div className="mt-4 flex items-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === t.id ? 'border-slate-900' : 'border-slate-300'}`}>
                {selected === t.id && <div className="w-2.5 h-2.5 bg-slate-900 rounded-full"></div>}
              </div>
              <span className={`ml-2 text-sm font-medium ${selected === t.id ? 'text-slate-900' : 'text-slate-400'}`}>
                {selected === t.id ? '已选择' : '选择此模板'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          onClick={onNext}
          className="px-8 py-3 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all"
        >
          下一步：个人信息 &rarr;
        </button>
      </div>
    </div>
  );
};