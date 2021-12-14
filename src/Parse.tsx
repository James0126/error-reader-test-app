const ReplaceSentence = [
  "failed to execute message; message index",
  "reply execute wasm contract failed",
  "execute wasm contract failed",
  "out of gas in location",
  "insufficient funds",
  "Generic error",
  "dispatch",
  "reply",
];

export const REGEXP = {
  COIN: /\d+((terra1[a-z0-9]{38})|(u[a-z]{1,4}))/g,
  IBC: /(ibc)/g,
};

const Parse = ({ msg }: { msg: string }) => {
  const failedMsgArray = msg
    .split(":")
    .map((str) => {
      const sentence = str.trim();
      if (ReplaceSentence.includes(sentence)) {
        return "";
      }
      console.log(sentence.match(REGEXP.COIN));

      return sentence;
    })
    .filter(Boolean);

  return (
    <>
      {isNumber(failedMsgArray[0])
        ? failedMsgArray.slice(1).join(" ")
        : failedMsgArray.join(" ")}
    </>
  );
};

export default Parse;

const isNumber = (str: string) => {
  const number = parseInt(str);
  if (isNaN(number)) {
    return false;
  }

  return true;
};
