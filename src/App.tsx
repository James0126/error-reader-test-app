import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { csv } from "d3";
import csvFile from "./csv/data.csv";
import "./App.css";
import Paper from "./Paper";
import Parse from "./Parse";
import TxHash from "./TxHash";
import Contract from "./Contract";

export const FINDER = "https://finder.terra.money";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

type csvObject = {
  Hash: string;
  RawLog: string;
};

const txHashList = [
  "66FE70FF29757314AB7F5A4DC23C9BB54285FC186E09DD73713C1442071A3C93",
  "7B248CC3268E14A722438076F6447343B94495AB1FD7AC2A16010EF9B6243814",
  "61EDF9C6F20106C57841AF03236AE002B8707D7A37ABE85E782C7310847026B5",
  "F2F3D7A37398EB172A290898C2FB55598AF91036102D8B98DB05F223736E83F7",
  "FB9F781E2D16E5D7B73AD8BAA64080ACD68C42DFDA79BCC7902D8544EB5E7784",
  "5DA3BBA16D5FDE2E9DF15B95ACEB881DE87B54E9D6F07E7200DB5B0C47F1F176",
  "975AC8AC00EE4DF25C9EB55414DEBECEBB54DDE34D66D9AE4DEAC7BC103A13E7",
  "BF2173DCBAEEF228D24DE8FD34CF8E2258C7CF91B839013E7229712C9532AADC",
  "9F672604DEC4F0C00A532E75AB7B871439C18BBC6B4D0DB20791F726900F6740",
  "07BBD943876C66E3294475855BCDD6692C2A097C62CE240EDB463299262351A9",
  "CBFAA0DE5A57E6774302C3DCF929EDCEB460589BACA1B2BF2C1FF06AADDFBF6A",
  "4E2998EE10E006F1775965ABA82BBD24FF6FA1158627648D124DBC9BEC9FF030",
  "B3C1F28B60BF6011C5E010505F08C2F124A74D13C66F7BAC0786949061206E34",
  "9F46B596F38A06E1FA89352B5FB6D502BDCE8687B01964515DF11A8A9490C202",
  "CDDA5471CC42158DDA821194DC57B6FB7DB7A77DB0C986F8CCA6E923BBA305FF",
  "319340BC84D1E950A919EF1FB56865411BAE8BEF9ECEB353E436433E81AE0500",
  "71A3770CD1B3225BE9311B09B9C26F433F30F6A85B2C5DFF4B7CD6AD079CB268",
  "EFA73A36A50956126EDE5B51AAB7491CA2DECBB1EFD1D90CE366BC6F9A32D89A",
  "7C55C82ABFAC84A2837CC355CDD648E74143609D63E4DDAC3875CBC7E287A3C7",
];

const App = () => {
  const [data, setData] = useState<any>();

  useEffect(() => {
    if (!data) {
      csv(csvFile).then((res) => setData(res));
    }
  });

  return (
    <QueryClientProvider client={queryClient}>
      <table>
        <tbody>
          <tr className="title">
            <td>Index</td>
            <td>Parse</td>
            <td>Hash</td>
            <td>MsgType</td>
            <td>Raw Error Message</td>
            <td>Contract</td>
          </tr>

          {data?.map((obj: csvObject, index: number) => {
            const { Hash: hash, RawLog: log } = obj;

            return (
              <tr key={index} className="data">
                <td>{index + 1}</td>
                <td>
                  <Parse msg={log} />
                </td>
                <td>
                  <a
                    href={`${FINDER}/mainnet/tx/${hash}`}
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {hash}
                  </a>
                </td>
                <td>
                  <TxHash hash={hash} rawLog={log} />
                </td>
                <td>{log}</td>
                <td>
                  <Contract hash={hash} rawLog={log} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {txHashList.map((hash) => (
        <>
          <Paper hash={hash} />
          <br />
        </>
      ))}
    </QueryClientProvider>
  );
};

export default App;
