import React from 'react';
import { Person } from '../types';

interface Props {
  data: Person;
  onChange: (data: Person) => void;
  onNext: () => void;
}

export const StepPersonal: React.FC<Props> = ({ data, onChange, onNext }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const isValid = data.fullName && data.idNumber && data.address;

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">立遗嘱人信息</h3>
      <p className="text-slate-500 mb-8">请填写您的基本个人信息。这将用于确认遗嘱的主体。</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">全名 (Full Name)</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="例如：张三"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">身份证号 / 护照号</label>
          <input
            type="text"
            name="idNumber"
            value={data.idNumber}
            onChange={handleChange}
            placeholder="例如：S1234567D"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">居住地址</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            rows={3}
            placeholder="填写您的详细居住地址"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            isValid 
              ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          下一步：遗嘱执行人 &rarr;
        </button>
      </div>
    </div>
  );
};