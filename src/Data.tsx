import { Msg, TxInfo } from "@terra-money/terra.js";
import { useQuery } from "react-query";
import { useContracts, useLCD, useWhitelist } from "./hooks";

const FINDER = "https://finder.terra.money";

const Data = ({ hash }: { hash: string }) => {
  const lcd = useLCD();

  const { data } = useQuery([hash], () => lcd.tx.txInfo(hash));

  const whitelist = useWhitelist();
  const contracts = useContracts();

  return (
    <>
      <td>EXE</td>
      <td>EXE</td>
    </>
  );
};

export default Data;
