import { readFileSync, writeFileSync, mkdirSync, existsSync, watch } from 'fs';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

const i18nCategoryData = JSON.parse(readFileSync(`${process.cwd()}/i18nCategory.json`, 'utf-8'));
const inputFileData = JSON.parse(readFileSync(`${process.cwd()}/inputFile.json`, 'utf-8'));
const outputFileName = 'zh_TW.json';
const outputFileData = JSON.parse(readFileSync(`${process.cwd()}/locales/${outputFileName}`, 'utf-8'));
let i18nCategoryKey = '';


const data = _.reduce(inputFileData.data, (obj, item) => {
  if (i18nCategoryData.data.indexOf(item) !== -1) {
    i18nCategoryKey = item;
    obj[item] = '';
  } else {
    obj[`${i18nCategoryKey}.${uuidv4()}`] = item;
  }

  return obj;
}, {})

const rawData = _.merge({}, outputFileData, data);
const sortedKey = Object.keys(rawData).sort();
const result = _.reduce(sortedKey, (obj, item) => _.merge({}, obj, {[`${item}`]: rawData[`${item}`]}), {});


writeFileSync(`${process.cwd()}/locales/${outputFileName}`, JSON.stringify(result, null, 2), { encoding: 'utf8' });
writeFileSync(`${process.cwd()}/inputFile.json`, JSON.stringify(i18nCategoryData, null, 2), { encoding: 'utf8' });