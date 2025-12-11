import React from 'react';
import ReactMarkdown from 'react-markdown';

interface Props {
  content: string;
  onBack: () => void;
}

export const GeneratedWill: React.FC<Props> = ({ content, onBack }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in-up">
      <div className="flex justify-between items-center mb-6 no-print">
        <div>
          <h3 className="text-2xl font-bold text-slate-900">遗嘱草稿</h3>
          <p className="text-slate-500 text-sm">生成完毕。请审阅、打印并由见证人见证签署。</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50"
          >
            重新编辑
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            打印 / 保存PDF
          </button>
        </div>
      </div>

      <div className="bg-white p-8 md:p-12 rounded-xl shadow-lg border border-slate-200 print-content overflow-hidden">
         <article className="prose prose-slate max-w-none font-serif text-slate-800 leading-relaxed">
            <ReactMarkdown>{content}</ReactMarkdown>
         </article>
      </div>

      <div className="mt-8 p-4 bg-yellow-50 text-yellow-800 text-sm rounded-lg border border-yellow-200 no-print">
        <strong>⚠️ 重要提示：</strong> 此文档由 AI 生成，仅供参考。为了使遗嘱生效，通常需要您在两名非受益人见证人同时在场的情况下签署。建议您在签署前咨询律师。
      </div>
    </div>
  );
};