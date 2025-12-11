export interface Person {
  fullName: string;
  idNumber: string;
  address: string;
  relationship?: string;
}

export interface Asset {
  id: string;
  description: string;
  type: 'property' | 'bank' | 'stock' | 'vehicle' | 'other';
  details: string; // e.g. "Account 123456" or "123 Main St"
}

export type WillTemplate = 'standard' | 'married_kids' | 'simple' | 'bilingual';

export interface WillData {
  template: WillTemplate;
  testator: Person;
  executor: Person;
  assets: Asset[];
  beneficiaries: Person[];
  additionalInstructions: string;
}

export enum AppStep {
  HERO = 0,
  TEMPLATE = 1,
  PERSONAL_INFO = 2,
  EXECUTOR = 3,
  ASSETS = 4,
  BENEFICIARIES = 5,
  REVIEW = 6,
  GENERATING = 7,
  RESULT = 8,
  FAQ = 9,
  LEGAL = 10,
}