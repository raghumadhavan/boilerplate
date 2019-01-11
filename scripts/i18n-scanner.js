const fs = require('fs');
const _ = require('lodash');
const globSync = require('glob').sync;
const mkdirSync = require('mkdirp').sync;
const ProgressBar = require('progress');
const watch = require('glob-watcher');
const isWatch = process.argv.indexOf('--watch') >= 0;
const filePattern = './src/**/*+(i18n-messages).json';
const outputLanguageDataDir = './build/locales/';

const i18nScanner = () => {
  let hasError = false;
  const files = globSync(filePattern);
  const bar = new ProgressBar(':bar', { total: files.length });

  console.log('INIT: translations files scan....');

  const translation = files
    .map(filename => ({ name: filename, value: fs.readFileSync(filename, 'utf8') }))
    .map((file) => {
      try {
        bar.tick();
        return JSON.parse(file.value);
      } catch (err) {
        hasError = true;
        console.error('ERROR: ', file.name, err.message);
      }
    })
    .reduce((result, file) => _.assign(result, file), {});

  const duplicatedTranslations = _.reduce(translation, (result, value, key) => {
    result[value] = result[value] ? [...result[value], key] : [key];

    return result;
  }, {});

  if (!hasError) {
    _.forEach(duplicatedTranslations, (value, key) => {
      if (value.length > 1) {
        console.warn(`WARN: The translation "${key}" is repeated in the next IDs: [${value.join(', ')}]`);
      }
    });

    mkdirSync(outputLanguageDataDir);

    fs.writeFile(`${outputLanguageDataDir}en.json`, `${JSON.stringify({ en: { translation } }, null, 2)}`,function(err, result) {
     if(err) console.log('error', err);
   });

    console.log(`Translations file ${outputLanguageDataDir}i18n-en.json successfully created!`);
  }
};

const startWatcher = () => {
  console.log('Started i18n-watcher....');

  i18nScanner();

  watch([filePattern], (done) => {
    i18nScanner();
    done();
  });
};

if (isWatch) {
  startWatcher();
  process.on('uncaughtException', (err) => {
    console.error(err.message);
  });
} else {
  i18nScanner();
}
