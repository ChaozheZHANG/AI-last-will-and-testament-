import React from 'react';
import { Person } from '../types';

interface Props {
  data: Person;
  onChange: (data: Person) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepExecutor: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...data, [e.target.name]: e.target.value });
  };

  const isValid = data.fullName && data.idNumber;

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">指定遗嘱执行人</h3>
      <p className="text-slate-500 mb-8">执行人是在您过世后，负责按照遗嘱分配遗产的人。建议选择值得信赖的亲属或专业人士。</p>

      <div className="space-y-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">执行人姓名</label>
          <input
            type="text"
            name="fullName"
            value={data.fullName}
            onChange={handleChange}
            placeholder="例如：李四"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">执行人身份证号</label>
          <input
            type="text"
            name="idNumber"
            value={data.idNumber}
            onChange={handleChange}
            placeholder="证件号码"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">执行人地址</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleChange}
            rows={2}
            placeholder="执行人联系地址"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 focus:border-slate-500 outline-none transition-all"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-between">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-all"
        >
          &larr; 上一步
        </button>
        <button
          onClick={onNext}
          disabled={!isValid}
          className={`px-8 py-3 rounded-xl font-semibold transition-all ${
            isValid 
              ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-md' 
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          下一步：资产清单 &rarr;
        </button>
      </div>
    </div>
  );
};