// This implementation uses the filesystem
// You could rewrite it to use SQLite or whatever

import { getAudioName } from "./common.mjs";
// import { stat } from 'node:fs';

const add = (text, genderChar, id) => {
  const textSnake = text.replace(/\s/g, "_");
  const audioFileName = getAudioName(genderChar, id);
};

export const getOrAdd = (text, genderChar, id) => {
  const textSnake = text.replace(/\s/g, "_");
  // if (stat(textSnake))
};
