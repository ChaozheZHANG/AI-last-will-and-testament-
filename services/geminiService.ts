import { GoogleGenAI } from "@google/genai";
import { WillData } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateWillDocument = async (data: WillData): Promise<string> => {
  const { testator, executor, assets, beneficiaries, additionalInstructions, template } = data;

  const assetsList = assets.map(a => `- [${a.type}] ${a.description}: ${a.details}`).join('\n');
  const beneficiariesList = beneficiaries.map(b => `- ${b.fullName} (ID: ${b.idNumber}), 关系: ${b.relationship}, 地址: ${b.address}`).join('\n');

  let specificInstructions = "";
  let languageInstruction = "输出语言为中文。";

  switch (template) {
    case 'married_kids':
      specificInstructions = "特别要求：这是一个家庭版遗嘱。必须包含详细的'未成年子女监护人条款' (Appointment of Guardian)，指定如果立遗嘱人去世时子女未成年，由谁担任监护人（如果用户未提供监护人信息，请留出空白横线供手写填写）。";
      break;
    case 'simple':
      specificInstructions = "特别要求：这是一个极简版遗嘱。请保持条款精简，去掉不必要的复杂法律套话，只保留核心的撤销前遗嘱、任命执行人、和分配条款。";
      break;
    case 'bilingual':
      specificInstructions = "特别要求：这是一个双语版遗嘱。文档中的每一个条款，必须先写中文，紧接着写对应的英文翻译。格式应当是：\n\n**第一条 [中文标题] / Article 1 [English Title]**\n[中文内容]\n[English Content]\n\n确保法律术语的中英互译准确。";
      languageInstruction = "输出语言为中文和英文对照。";
      break;
    default:
      specificInstructions = "这是一个标准版遗嘱，请使用完整、严谨的法律格式。";
      break;
  }

  const prompt = `
    你是一位专业的遗嘱起草律师。请根据以下信息，起草一份正式的、具有法律效力的《遗嘱》（Last Will and Testament）。
    
    ${languageInstruction}
    ${specificInstructions}

    格式应当清晰，包含必要的条款（如：撤销前遗嘱、任命执行人、资产分配、剩余财产处理、签名栏等）。

    **立遗嘱人信息 (Testator):**
    - 姓名: ${testator.fullName}
    - 身份证/护照号: ${testator.idNumber}
    - 地址: ${testator.address}

    **遗嘱执行人 (Executor):**
    - 姓名: ${executor.fullName}
    - 身份证/护照号: ${executor.idNumber}
    - 地址: ${executor.address}

    **主要资产 (Assets):**
    ${assetsList || "未列出具体资产，意指处理所有名下财产。"}

    **受益人 (Beneficiaries) 及分配:**
    ${beneficiariesList}

    **额外指示:**
    ${additionalInstructions || "无。"}

    **通用要求:**
    1. 标题为《遗嘱》 (Last Will and Testament)。
    2. 第一条必须声明这是立遗嘱人的最后遗嘱，并撤销此前所有遗嘱。
    3. 指定遗嘱执行人。
    4. 详细列出资产分配方案。如果资产未具体分配，默认将剩余财产（Residuary Estate）平均分配给所有列出的受益人，除非额外指示中有说明。
    5. 包含 "同时死亡条款" (Simultaneous Death Clause)。
    6. 结尾需包含立遗嘱人签名、日期以及两名见证人签名的位置（见证人不能是受益人）。
    7. 输出格式为 Markdown，确保排版美观，适合阅读和打印。
    
    请直接输出遗嘱内容，不要包含任何寒暄或解释性文字。
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.3, // Low temperature for consistent, formal output
      }
    });

    return response.text || "生成遗嘱时出现错误，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("无法连接到 AI 服务，请检查网络设置。");
  }
};