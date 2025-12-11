import React from 'react';

export const Legal: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4 animate-fade-in-up">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center font-serif">法律声明与免责条款</h2>
      
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm prose prose-slate max-w-none">
        <h4>1. 非法律服务声明</h4>
        <p>
          AI WillGen（以下简称“本服务”）是一个基于人工智能技术的文档生成工具。我们<strong>不是律师事务所</strong>，不提供任何形式的法律建议、法律代表或专业咨询服务。使用本服务不建立律师-客户关系。
        </p>

        <h4>2. 内容的性质</h4>
        <p>
          本服务生成的遗嘱草稿和相关信息仅供参考。虽然我们努力确保模板的专业性，但法律法规会因地区、时间和具体情况而异。AI 模型可能会产生不准确或不完整的信息。生成的文档可能不符合您所在特定司法管辖区的所有法律形式要求。
        </p>

        <h4>3. 用户责任</h4>
        <p>
          作为用户，您应对输入信息的真实性和准确性负责。在签署本服务生成的任何文档之前，您应当：
        </p>
        <ul>
          <li>仔细阅读并理解文档的所有内容；</li>
          <li>确认文档内容真实反映了您的意愿；</li>
          <li>咨询合格的法律专业人士，以确保文档符合当地法律要求并具有法律效力。</li>
        </ul>

        <h4>4. 免责条款</h4>
        <p>
          在法律允许的最大范围内，AI WillGen 及其开发者不对因使用本服务或依赖本服务生成的文档而导致的任何直接、间接、附带或后果性损害承担责任。这包括但不限于遗嘱无效、资产分配争议或税务后果。
        </p>

        <h4>5. 隐私保护</h4>
        <p>
          我们要致力于保护您的隐私。您的个人数据主要在客户端进行处理。我们不会出售或出于营销目的与第三方共享您的个人敏感信息。
        </p>
      </div>
    </div>
  );
};