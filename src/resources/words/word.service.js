const wordRepo = require('./word.db.repository');

const getAll = async conditions => wordRepo.getAll(conditions);

const getCount = async (group, wordsPerExampleSentenceLTE) =>
  wordRepo.getCount(group, wordsPerExampleSentenceLTE);

const get = async wordId => wordRepo.get(wordId);

const getMany = async arrayId => wordRepo.getMany(arrayId);

module.exports = { getAll, getCount, get, getMany };
