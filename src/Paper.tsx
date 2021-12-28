import { useQuery } from "react-query";
import { LCDClient, TxInfo } from "@terra-money/terra.js";
import * as ruleset from "@terra-money/log-finder-ruleset";

const { createActionRuleSet, getTxCanonicalMsgs, createLogMatcherForActions } =
  ruleset;

const config = {
  mainnet: {
    chainID: "columbus-5",
    URL: "https://lcd.terra.dev",
    name: "mainnet",
  },
  testnet: {
    chainID: "bombay-12",
    URL: "https://bombay-lcd.terra.dev",
    name: "testnet",
  },
};

const Paper = ({ hash }: { hash: string }) => {
  const lcd = new LCDClient(config.testnet);

  const ruleset = createActionRuleSet("bombay-12");
  const logMatcher = createLogMatcherForActions(ruleset);

  const getCanonicalMsgs = (tx: TxInfo) => {
    const matchedMsg = getTxCanonicalMsgs(tx, logMatcher);

    return matchedMsg
      ? matchedMsg
          .map((matchedLog) => matchedLog.map(({ transformed }) => transformed))
          .flat(2)
      : [];
  };

  const { data: txInfo } = useQuery(hash, () => lcd.tx.txInfo(hash), {
    retry: 100,
    retryDelay: 1000,
  });

  //txInfo && console.log(txInfo);

  //   txInfo && console.log(getCanonicalMsgs(txInfo));

  return txInfo ? <></> : <></>;
};

export default Paper;
