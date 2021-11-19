import { LCDClient } from "@terra-money/terra.js";
import axios from "axios";
import { useQuery } from "react-query";

export const useLCD = () => {
  const lcd = new LCDClient({
    URL: `https://lcd.terra.dev`,
    chainID: "columbus-5",
  });

  return lcd;
};

type NetworkName = string;
type Address = string;
type ContractData = Record<NetworkName, Record<Address, ContractInfo>>;
type WhitelistData = Record<NetworkName, Record<Address, TokenInfo>>;

interface TokenInfo {
  protocol?: string;
  symbol: string;
  token: string;
  icon?: string;
  decimals?: number;
}

interface ContractInfo {
  protocol: string;
  name: string;
  icon: string;
}

const TERRA_ASSETS = "https://assets.terra.money";

export const useContracts = () => {
  const config = { baseURL: TERRA_ASSETS };
  return useQuery("Contracts", async () => {
    const { data } = await axios.get<ContractData>(
      "cw20/contracts.json",
      config
    );
    return data["mainnet"];
  });
};

export const useWhitelist = () => {
  const config = { baseURL: TERRA_ASSETS };
  return useQuery("Contracts", async () => {
    const { data } = await axios.get<WhitelistData>("cw20/tokens.json", config);
    return data["mainnet"];
  });
};
