import React from 'react';
import { Asset } from '../types';

interface Props {
  data: Asset[];
  onChange: (data: Asset[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepAssets: React.FC<Props> = ({ data, onChange, onNext, onBack }) => {
  const addAsset = () => {
    onChange([
      ...data,
      { id: Date.now().toString(), description: '', type: 'property', details: '' }
    ]);
  };

  const removeAsset = (id: string) => {
    onChange(data.filter(a => a.id !== id));
  };

  const updateAsset = (id: string, field: keyof Asset, value: string) => {
    onChange(data.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  return (
    <div className="animate-fade-in-up">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">资产清单</h3>
      <p className="text-slate-500 mb-8">列出您希望特别分配的主要资产。如果不列出，所有资产将被视为"剩余财产"统一分配。</p>

      <div className="space-y-4 mb-6">
        {data.map((asset, index) => (
          <div key={asset.id} className="relative bg-white p-5 rounded-xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
            <button 
              onClick={() => removeAsset(asset.id)}
              className="absolute top-3 right-3 text-slate-400 hover:text-red-500"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">资产类型</label>
                <select
                  value={asset.type}
                  onChange={(e) => updateAsset(asset.id, 'type', e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                >
                  <option value="property">房产</option>
                  <option value="bank">银行账户</option>
                  <option value="stock">股票/基金</option>
                  <option value="vehicle">车辆</option>
                  <option value="other">其他贵重物品</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">资产名称</label>
                <input
                  type="text"
                  value={asset.description}
                  onChange={(e) => updateAsset(asset.id, 'description', e.target.value)}
                  placeholder="例如：XX花园房产"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-medium text-slate-500 uppercase mb-1">详细描述/地址/账号</label>
                <input
                  type="text"
                  value={asset.details}
                  onChange={(e) => updateAsset(asset.id, 'details', e.target.value)}
                  placeholder="详细地址或账号号码"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 outline-none text-sm"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={addAsset}
          className="w-full py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-medium hover:border-slate-500 hover:text-slate-700 transition-all flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          添加一项资产
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
          className="px-8 py-3 rounded-xl font-semibold bg-slate-900 text-white hover:bg-slate-800 shadow-md transition-all"
        >
          下一步：受益人 &rarr;
        </button>
      </div>
    </div>
  );
};