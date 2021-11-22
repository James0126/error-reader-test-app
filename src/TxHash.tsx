import { useTxInfo } from "./hooks";

const TxHash = ({ hash, rawLog }: { hash: string; rawLog: string }) => {
  const { data: info } = useTxInfo(hash);

  if (rawLog.includes("failed to execute message")) {
    const sliceIndex = rawLog.indexOf("message index: ");
    const errorMsgIndex = parseInt(rawLog.slice(sliceIndex).split(":")[1]);
    const type = info?.tx.body.messages[errorMsgIndex].toData()["@type"];
    return <>{type}</>;
  }

  return <>{info?.tx.body.messages[0].toData()["@type"]}</>;
};

export default TxHash;
