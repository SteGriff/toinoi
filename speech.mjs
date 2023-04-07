import { createId } from "@paralleldrive/cuid2";
import sdk from "microsoft-cognitiveservices-speech-sdk";

import { getError, getFailure, getSuccess } from "./results.mjs";
import { getAudioName } from "./common.mjs";

const femaleVoiceName = "vi-VN-HoaiMyNeural";
const maleVoiceName = "vi-VN-NamMinhNeural";

const getVoice = (genderChar) => {
  return genderChar === "f" ? femaleVoiceName : maleVoiceName;
};

export const validateGenderChar = (genderChar) => {
  return genderChar === "f" || genderChar === "m";
};

export const createAudio = (genderChar, text) => {
  return new Promise((resolve, reject) => {
    const id = createId();
    const audioFileName = getAudioName(genderChar, id);

    console.log("createAudio", audioFileName);
    console.log(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
    if (!process.env.SPEECH_KEY || !process.env.SPEECH_REGION)
      reject(getError("Unable to connect to speech server"));

    // TODO write id and text to a table somewhere for cache/lookup

    try {
      // Connect SDK
      const speechConfig = sdk.SpeechConfig.fromSubscription(
        process.env.SPEECH_KEY,
        process.env.SPEECH_REGION
      );
      const audioConfig = sdk.AudioConfig.fromAudioFileOutput(audioFileName);

      speechConfig.speechSynthesisVoiceName = getVoice(genderChar);

      // Create the speech synthesizer.
      var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

      synthesizer.speakTextAsync(
        text,
        function (result) {
          if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
            console.log("Synthesis finished.");
          } else {
            console.error("Speech synthesis canceled, " + result.errorDetails);
          }
          synthesizer.close();
          synthesizer = null;
          const resultModel = getSuccess(
            audioFileName,
            id,
            text,
            result.resultId
          );
          resolve(resultModel);
        },
        function (err) {
          synthesizer.close();
          synthesizer = null;
          const resultModel = getFailure(id, text);
          reject(resultModel);
        }
      );
    } catch (error) {
      reject(getError(error));
    }
  });
};
