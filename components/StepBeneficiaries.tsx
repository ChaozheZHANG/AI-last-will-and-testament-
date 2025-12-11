import React from 'react';
import { Person } from '../types';

interface Props {
  data: Person[];
  onChange: (data: Person[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepBeneficiaries: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const addBeneficiary = () => {
    onChange([
      ...data,
      { fullName: '', idNumber: '', address: '', relationship: '' }
    ]);
  };

  const removeBeneficiary = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateBeneficiary = (index: number, field: keyof Person, value: string) => {
    onChange(data.map((b, i) => i === index ? { ...b, [field]: value } : b));
  };

  const isValid = data.length > 0 && data.every(b => b.fullName && b.relationship);

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">受益人分配</h3>
      <p className="text-slate-500 mb-8">列出您希望继承您遗产的人。默认情况下，这些受益人将平均分配您的所有剩余财产。</p>

      <div className="space-y-4 mb-6">
        {data.map((person, index) => (
          <div key={index} className="relative bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <button 
              onClick={() => removeBeneficiary(index)}
              className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">姓名</label>
                <input
                  type="text"
                  value={person.fullName}
                  onChange={(e) => updateBeneficiary(index, 'fullName', e.target.value)}
                  placeholder="受益人姓名"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">关系</label>
                <input
                  type="text"
                  value={person.relationship}
                  onChange={(e) => updateBeneficiary(index, 'relationship', e.target.value)}
                  placeholder="例如：配偶、儿子、女儿"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">身份证号</label>
                <input
                  type="text"
                  value={person.idNumber}
                  onChange={(e) => updateBeneficiary(index, 'idNumber', e.target.value)}
                  placeholder="证件号码"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">地址</label>
                <input
                  type="text"
                  value={person.address}
                  onChange={(e) => updateBeneficiary(index, 'address', e.target.value)}
                  placeholder="联系地址"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addBeneficiary}
          className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-slate-500 hover:text-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          添加一位受益人
        </button>
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
          下一步：预览 &rarr;
        </button>
      </div>
    </div>
  );
};