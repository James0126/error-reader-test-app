import readError from "error-message-reader";

const Parse = ({ msg }: { msg: string }) => {
  return (
    <>
      <b>Parse</b> : {readError(msg)}
      <br />
      <br />
      <b>Raw Logs</b> : {msg}
    </>
  );
};

export default Parse;
