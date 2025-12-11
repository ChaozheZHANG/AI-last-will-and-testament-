import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 mt-auto py-8 no-print">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm mb-2">
          &copy; {new Date().getFullYear()} AI WillGen. All rights reserved.
        </p>
        <div className="max-w-2xl mx-auto text-xs text-slate-400 leading-relaxed">
          <p className="font-bold mb-1">免责声明：</p>
          <p>
            本网站生成的遗嘱文档仅供参考。我们不是律师事务所，不提供法律建议。
            AI 生成的内容可能不完全符合您所在司法管辖区的所有法律要求。
            为了确保您的遗嘱具有完全的法律效力，建议您咨询专业律师。
          </p>
        </div>
      </div>
    </footer>
  );
};