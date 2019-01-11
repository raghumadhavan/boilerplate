import i18next from 'i18next';
import locale from '../../../build/locales/en.json';

const init = (callback) => {
  i18next.init({
    lng: 'en',
    keySeparator: false,
    resources: locale,
    interpolation: {
      prefix: '{',
      suffix: '}',
    },
  }, callback);
};

const translate = (id, values) => {
  const translation = i18next.t(id, values) || id;

  if (translation === id) {
    console.warn(`ID ${id} has no translation!`);
  }

  return translation;
};

export default { init, translate };
