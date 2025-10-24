export type Gender = 'male' | 'female' | undefined;

export interface SurveyData {
  language: 'ru' | 'kz' | 'en';
  name?: string;
  birthDate?: string; // ISO YYYY-MM-DD
  gender?: Gender;
  heightCm?: number;
  weightKg?: number;
  phone?: string;
  email?: string;
  guardianName?: string;
  bloodPressure?: string; // e.g., 120/80
  diagnoses?: string[];
  surgeryType?: string;
  surgeryDate?: string; // ISO
  kidneySizes?: { left?: number; right?: number };
}

export type BmiBand = 'under' | 'normal' | 'over' | 'obese';

export interface SurveyTexts {
  title: string;
  next: string;
  back: string;
  continue: string;
  finish: string;
  close: string;
  loginPrompt: string;
  loginButton: string;
  steps: {
    name: string;
    dob: string;
    gender: string;
    height: string;
    weight: string;
    bmiResult: string;
    phone: string;
    email: string;
    guardian: string;
    bp: string;
    diagnoses: string;
    surgery: string;
    kidneys: string;
  };
  gender: { male: string; female: string };
  placeholders: {
    name: string;
    dob: string;
    phone: string;
    email: string;
    guardian: string;
    bp: string;
    height: string;
    weight: string;
    kidneyLeft: string;
    kidneyRight: string;
  };
  optional: string;
  skip: string;
  bmiLabels: {
    under: string;
    normal: string;
    over: string;
    obese: string;
  };
}
