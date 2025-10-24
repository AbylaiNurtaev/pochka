import { BmiBand } from './types';

export function computeBmi(heightCm?: number, weightKg?: number) {
  if (!heightCm || !weightKg || heightCm <= 0) return undefined;
  const h = heightCm / 100;
  const bmi = weightKg / (h * h);
  return Math.round(bmi * 10) / 10;
}

export function computeBsa(heightCm?: number, weightKg?: number) {
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) return undefined;
  // BSA = √((weight(kg) * height(cm)) / 3600)
  const bsa = Math.sqrt((weightKg * heightCm) / 3600);
  return Math.round(bsa * 100) / 100; // округляем до 2 знаков после запятой
}

export function bmiCategory(bmi?: number, lang: 'ru' | 'kz' | 'en' = 'ru') {
  if (bmi === undefined) return '';
  const dict = lang === 'kz' ? {
    under: 'Салмағы жеткіліксіз',
    normal: 'Қалыпты салмақ',
    over: 'Артық салмақ',
    obese: 'Семіздік'
  } : {
    under: 'Недостаток массы',
    normal: 'Нормальная масса',
    over: 'Избыточная масса',
    obese: 'Ожирение'
  };
  if (bmi < 18.5) return dict.under;
  if (bmi < 25) return dict.normal;
  if (bmi < 30) return dict.over;
  return dict.obese;
}

export function resolveBmiBand(bmi?: number): BmiBand | undefined {
  if (bmi === undefined) return undefined;
  if (bmi < 18.5) return 'under';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'over';
  return 'obese';
}
