import { FINDER } from "./App";
import { useContracts, useTxInfo, useWhitelist } from "./hooks";

const Contract = ({ hash, rawLog }: { hash: string; rawLog: string }) => {
  const { data } = useTxInfo(hash);

  const { data: whitelist } = useWhitelist();
  const { data: contracts } = useContracts();

  const sliceIndex = rawLog.indexOf("message index: ");
  const errorMsgIndex = parseInt(rawLog.slice(sliceIndex).split(":")[1]);

  const msg = data?.tx.body.messages[errorMsgIndex || 0].toData();

  if (msg?.["@type"] === "/terra.wasm.v1beta1.MsgExecuteContract") {
    const { contract } = msg;
    const listed = whitelist?.[contract] || contracts?.[contract];

    return (
      <a
        href={`${FINDER}/mainnet/address/${contract}`}
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        rel="noreferrer"
      >
        {listed?.protocol || contract}
      </a>
    );
  }

  return <></>;
};

export default Contract;
