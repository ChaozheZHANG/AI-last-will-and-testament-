import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { StepTemplate } from './components/StepTemplate';
import { StepPersonal } from './components/StepPersonal';
import { StepExecutor } from './components/StepExecutor';
import { StepAssets } from './components/StepAssets';
import { StepBeneficiaries } from './components/StepBeneficiaries';
import { GeneratedWill } from './components/GeneratedWill';
import { FAQ } from './components/FAQ';
import { Legal } from './components/Legal';
import { AppStep, WillData, Person, Asset, WillTemplate } from './types';
import { generateWillDocument } from './services/geminiService';

const initialData: WillData = {
  template: 'standard',
  testator: { fullName: '', idNumber: '', address: '' },
  executor: { fullName: '', idNumber: '', address: '' },
  assets: [],
  beneficiaries: [],
  additionalInstructions: ''
};

function App() {
  const [step, setStep] = useState<AppStep>(AppStep.HERO);
  // Keep track of the wizard step separately to resume properly from FAQ/Legal pages
  const [wizardStep, setWizardStep] = useState<AppStep>(AppStep.TEMPLATE);
  const [data, setData] = useState<WillData>(initialData);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const updateTemplate = (t: WillTemplate) => setData(prev => ({ ...prev, template: t }));
  const updateTestator = (p: Person) => setData(prev => ({ ...prev, testator: p }));
  const updateExecutor = (p: Person) => setData(prev => ({ ...prev, executor: p }));
  const updateAssets = (a: Asset[]) => setData(prev => ({ ...prev, assets: a }));
  const updateBeneficiaries = (b: Person[]) => setData(prev => ({ ...prev, beneficiaries: b }));

  // Navigation Helpers
  const goToWizardNext = () => {
    const next = wizardStep + 1;
    setWizardStep(next);
    setStep(next);
  };

  const goToWizardPrev = () => {
    const prev = wizardStep - 1;
    setWizardStep(prev);
    setStep(prev);
  };

  const startWizard = () => {
    setWizardStep(AppStep.TEMPLATE);
    setStep(AppStep.TEMPLATE);
  };

  // Header Navigation Handlers
  const goHome = () => setStep(AppStep.HERO);
  const goFaq = () => setStep(AppStep.FAQ);
  const goLegal = () => setStep(AppStep.LEGAL);

  
  const handleGenerate = async () => {
    setStep(AppStep.GENERATING);
    setError(null);
    try {
      const content = await generateWillDocument(data);
      setGeneratedContent(content);
      setStep(AppStep.RESULT);
      setWizardStep(AppStep.RESULT);
    } catch (err: any) {
      setError(err.message || '发生未知错误');
      setStep(AppStep.REVIEW);
      setWizardStep(AppStep.REVIEW);
    }
  };

  const renderContent = () => {
    switch (step) {
      case AppStep.HERO:
        return <Hero onStart={startWizard} onLearnMore={goFaq} />;
      
      case AppStep.FAQ:
        return <FAQ />;

      case AppStep.LEGAL:
        return <Legal />;
      
      case AppStep.TEMPLATE:
        return (
          <div className="max-w-2xl mx-auto py-10 px-4">
            <StepTemplate selected={data.template} onChange={updateTemplate} onNext={goToWizardNext} />
          </div>
        );

      case AppStep.PERSONAL_INFO:
        return (
          <div className="max-w-2xl mx-auto py-10 px-4">
            <StepPersonal data={data.testator} onChange={updateTestator} onNext={goToWizardNext} />
          </div>
        );

      case AppStep.EXECUTOR:
        return (
          <div className="max-w-2xl mx-auto py-10 px-4">
            <StepExecutor data={data.executor} onChange={updateExecutor} onNext={goToWizardNext} onBack={goToWizardPrev} />
          </div>
        );

      case AppStep.ASSETS:
        return (
          <div className="max-w-2xl mx-auto py-10 px-4">
            <StepAssets data={data.assets} onChange={updateAssets} onNext={goToWizardNext} onBack={goToWizardPrev} />
          </div>
        );

      case AppStep.BENEFICIARIES:
        return (
          <div className="max-w-2xl mx-auto py-10 px-4">
            <StepBeneficiaries data={data.beneficiaries} onChange={updateBeneficiaries} onNext={goToWizardNext} onBack={goToWizardPrev} />
          </div>
        );

      case AppStep.REVIEW:
        return (
          <div className="max-w-2xl mx-auto py-10 px-4 animate-fade-in-up">
             <h3 className="text-2xl font-bold text-slate-900 mb-6">确认信息</h3>
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h4 className="font-semibold text-slate-700">模板类型</h4>
                  <p className="text-slate-600">
                    {data.template === 'standard' && '通用标准版'}
                    {data.template === 'married_kids' && '家庭守护版 (已婚有子女)'}
                    {data.template === 'simple' && '极简版'}
                    {data.template === 'bilingual' && '中英双语版'}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">立遗嘱人</h4>
                  <p className="text-slate-600">{data.testator.fullName} ({data.testator.idNumber})</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">执行人</h4>
                  <p className="text-slate-600">{data.executor.fullName} ({data.executor.idNumber})</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">资产</h4>
                  <p className="text-slate-600">{data.assets.length > 0 ? `${data.assets.length} 项资产已列出` : '处理所有名下财产'}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-700">受益人</h4>
                  <ul className="list-disc list-inside text-slate-600">
                    {data.beneficiaries.map((b, i) => <li key={i}>{b.fullName} ({b.relationship})</li>)}
                  </ul>
                </div>
                
                <div>
                  <label className="block font-semibold text-slate-700 mb-2">额外指示 (可选)</label>
                  <textarea
                    className="w-full p-3 border border-slate-300 rounded-lg text-sm"
                    rows={3}
                    placeholder="例如：希望葬礼从简..."
                    value={data.additionalInstructions}
                    onChange={(e) => setData(prev => ({...prev, additionalInstructions: e.target.value}))}
                  />
                </div>
             </div>
             
             {error && <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg border border-red-200">{error}</div>}

             <div className="mt-10 flex justify-between">
                <button onClick={goToWizardPrev} className="px-6 py-3 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-all">&larr; 返回修改</button>
                <button onClick={handleGenerate} className="px-8 py-3 rounded-xl font-semibold bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all flex items-center">
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                   </svg>
                   立即生成
                </button>
             </div>
          </div>
        );

      case AppStep.GENERATING:
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
             <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
             <h3 className="text-xl font-semibold text-slate-800 mb-2">正在撰写您的遗嘱...</h3>
             <p className="text-slate-500 text-center max-w-md">智能系统正在根据{data.template === 'bilingual' ? '双语' : '所选'}模板构建法律条款，这大约需要几秒钟。</p>
          </div>
        );

      case AppStep.RESULT:
        return (
          <div className="max-w-4xl mx-auto py-10 px-4">
             <GeneratedWill content={generatedContent} onBack={() => {setStep(AppStep.REVIEW); setWizardStep(AppStep.REVIEW);}} />
          </div>
        );

      default:
        return null;
    }
  };

  const isWizardStep = step >= AppStep.TEMPLATE && step < AppStep.RESULT;

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800">
      <Header onHome={goHome} onFaq={goFaq} onLegal={goLegal} />
      
      <main className="flex-grow">
        {isWizardStep && (
           <div className="max-w-3xl mx-auto pt-8 px-4 no-print">
              <div className="flex items-center justify-between relative">
                 <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 -z-10"></div>
                 {[1, 2, 3, 4, 5, 6].map((s) => (
                    <div 
                      key={s} 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-500 relative bg-white z-10 ${
                        step >= s ? 'border-2 border-slate-900 bg-slate-900 text-white' : 'border-2 border-slate-200 text-slate-400'
                      }`}
                    >
                       {s}
                    </div>
                 ))}
              </div>
              <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium px-1">
                 <span>模板</span>
                 <span>个人</span>
                 <span>执行人</span>
                 <span>资产</span>
                 <span>受益人</span>
                 <span>确认</span>
              </div>
           </div>
        )}
        
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}

export default App;