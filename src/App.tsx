import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { csv } from "d3";
import csvFile from "./csv/data.csv";
import TxHash from "./TxHash";
import Contract from "./Contract";
import "./App.css";

export const FINDER = "https://finder.terra.money";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false },
  },
});

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
            <td>Hash</td>
            <td>Contract</td>
            <td>MsgType</td>
            <td>Raw Error Message</td>
          </tr>

          {data?.map((obj: any, index: number) => {
            const { Hash: hash, RawLog: log } = obj;

            return (
              <tr key={index} className="data">
                <td>{index}</td>
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
                  <Contract hash={hash} rawLog={log} />
                </td>
                <td>
                  <TxHash hash={hash} rawLog={log} />
                </td>
                <td>{log}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </QueryClientProvider>
  );
};

export default App;
