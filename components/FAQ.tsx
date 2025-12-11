import React from 'react';

export const FAQ: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center font-serif">常见问题解答</h2>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">这份遗嘱具有法律效力吗？</h3>
          <p className="text-slate-600 leading-relaxed">
            AI WillGen 生成的文档是基于通用法律标准的草稿。要使遗嘱具有法律效力，您通常需要打印文档，并在两名非受益人的见证人面前签署。不同司法管辖区（如中国大陆、香港、新加坡等）的具体要求可能不同，建议您在签署前咨询当地律师。
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">我的数据安全吗？</h3>
          <p className="text-slate-600 leading-relaxed">
            非常安全。我们在您的浏览器本地处理大部分流程，仅在生成最终文档时将加密数据发送给 AI 引擎。我们不会在服务器上永久存储您的个人信息或遗嘱内容。一旦您关闭页面，数据就会被清除。
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">一定要指定遗嘱执行人吗？</h3>
          <p className="text-slate-600 leading-relaxed">
            是的，指定执行人是非常重要的一步。执行人将在您过世后负责管理您的遗产、偿还债务并按照您的意愿分配资产。如果您不指定，法院可能会指派一名管理人，这可能会导致延误和额外的费用。
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-2">我可以修改生成的遗嘱吗？</h3>
          <p className="text-slate-600 leading-relaxed">
            当然。生成的文档是 Markdown 格式，您可以复制到任何文本编辑器（如 Word）中进行修改。在网页上，您也可以点击“返回修改”来调整输入的信息并重新生成。
          </p>
        </div>
      </div>
    </div>
  );
};