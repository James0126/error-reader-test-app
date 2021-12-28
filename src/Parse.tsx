import readError from "error-message-reader";

const ReplaceSentence = [
  "failed to execute message; message index",
  "reply execute wasm contract failed",
  "execute wasm contract failed",
  "Generic error",
  "dispatch",
  "reply",
];

// export const REGEXP = {
//   COIN: /\d+((terra1[a-z0-9]{38})|(u[a-z]{1,4}))/g,
//   IBC: /(ibc)/g,
// };

const Parse = ({ msg }: { msg: string }) => {
  const failedMsgArray = msg
    .split(":")
    .map((str) => {
      const sentence = str.trim();
      if (ReplaceSentence.includes(sentence)) {
        return "";
      }

      return sentence;
    })
    .filter(Boolean);

  const str = isNumber(failedMsgArray[0])
    ? failedMsgArray.slice(1).join(" ")
    : failedMsgArray.join(" ");

  return (
    <>
      <b>Reader</b> : {readError(msg) || str}
      <br />
      <br />
      <b>Raw Logs</b> : {msg}
    </>
  );

  // const abc = readError(msg);

  // return <>{abc}</>;
};

export default Parse;

const isNumber = (str: string) => {
  const number = parseInt(str);
  if (isNaN(number)) {
    return false;
  }
  return true;
};
