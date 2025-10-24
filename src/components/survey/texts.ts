import { SurveyTexts } from './types';

export const kzText: SurveyTexts = {
  title: 'Сауалнама',
  next: 'Келесі',
  back: 'Артқа',
  continue: 'Жалғастыру',
  finish: 'Аяқтау',
  close: 'Жабу',
  loginPrompt: 'Егер сіз бұрын қолданбамызда болған болсаңыз, аккаунтыңызға кіріңіз',
  loginButton: 'Кіру',
  steps: {
    name: 'Сіздің атыңыз кім?',
    dob: 'Туған күніңіз',
    gender: 'Жынысыңыз',
    height: 'Бойыңыз (см)',
    weight: 'Салмағыңыз (кг)',
    bmiResult: 'Нәтиже (BMI)',
    phone: 'Телефон нөмірі',
    email: 'Электрондық пошта (міндетті емес)',
    guardian: 'Ата-ана/Қамқоршының аты (міндетті емес)',
    bp: 'Қан қысымы',
    diagnoses: 'Диагноздар (бүйрек бойынша)',
    surgery: 'Операция және күні (міндетті емес)',
    kidneys: 'Бүйрек өлшемдері (сол/оң)'
  },
  gender: { male: 'Ер', female: 'Әйел' },
  placeholders: {
    name: 'Атыңызды енгізіңіз',
    dob: 'ЖЖЖЖ-АА-КК',
    phone: '+7 (___) ___-__-__',
    email: 'email@мысал.kz',
    guardian: 'Толтыру міндетті емес',
    bp: 'мыс: 110/70',
    height: 'мыс: 160',
    weight: 'мыс: 55',
    kidneyLeft: 'сол, мм',
    kidneyRight: 'оң, мм'
  },
  optional: 'Міндетті емес',
  skip: 'Өткізу',
  bmiLabels: {
    under: 'Салмағы жеткіліксіз',
    normal: 'Қалыпты салмақ',
    over: 'Артық салмақ',
    obese: 'Семіздік'
  }
};

export const ruText: SurveyTexts = {
  title: 'Опрос',
  next: 'Далее',
  back: 'Назад',
  continue: 'Продолжить',
  finish: 'Завершить',
  close: 'Закрыть',
  loginPrompt: 'Если вы уже не впервые в нашем приложении, то войдите в свой аккаунт',
  loginButton: 'Войти',
  steps: {
    name: 'Как вас зовут?',
    dob: 'Дата рождения',
    gender: 'Укажите пол',
    height: 'Ваш рост (см)',
    weight: 'Ваш вес (кг)',
    bmiResult: 'Результат (ИМТ)',
    phone: 'Номер телефона',
    email: 'Электронная почта (необязательно)',
    guardian: 'Имя родителя/опекуна (необязательно)',
    bp: 'Давление',
    diagnoses: 'Диагнозы (почечные)',
    surgery: 'Операция и дата (необязательно)',
    kidneys: 'Размеры почек (левая/правая)'
  },
  gender: { male: 'Мужской', female: 'Женский' },
  placeholders: {
    name: 'Введите имя',
    dob: 'ГГГГ-ММ-ДД',
    phone: '+7 (___) ___-__-__',
    email: 'email@пример.ru',
    guardian: 'Можно пропустить',
    bp: 'напр: 120/80',
    height: 'напр: 170',
    weight: 'напр: 65',
    kidneyLeft: 'левая, мм',
    kidneyRight: 'правая, мм'
  },
  optional: 'Необязательно',
  skip: 'Пропустить',
  bmiLabels: {
    under: 'Недостаток массы',
    normal: 'Нормальная масса',
    over: 'Избыточная масса',
    obese: 'Ожирение'
  }
};
