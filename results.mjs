const getResult = (audioFileName, id, text) => {
  return {
    status: "OK",
    file: audioFileName,
    text: text,
    id: id,
    speechId: null,
  };
};

export const getSuccess = (audioFileName, id, text, sdkResultId) => {
  const resultModel = getResult(audioFileName, id, text);
  resultModel.status = "OK";
  resultModel.speechId = sdkResultId;
  return resultModel;
};

export const getFailure = (id, text) => {
  const resultModel = getResult(null, id, text);
  resultModel.status = "Error";
  return resultModel;
};

export const getError = (message) => {
  return {
    status: "Error",
    message: message,
  };
};
