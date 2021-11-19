import "./App.css";
import csvFile from "./csv/data.csv";
import { csv } from "d3";
import { useEffect, useState } from "react";
import Data from "./Data";
import { QueryClient, QueryClientProvider } from "react-query";

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
            <td>Hash</td>
            <td>Protocol</td>
            <td>MsgType</td>
            <td>RawLog</td>
          </tr>

          {data?.map((obj: any, index: number) => {
            const { Hash: hash, RawLog: log } = obj;

            return (
              <>
                <tr key={index} className="data">
                  <td>{hash}</td>
                  {log.includes("failed to execute message") ? (
                    <Data hash={hash} />
                  ) : (
                    <>
                      <td></td>
                      <td></td>
                    </>
                  )}
                  <td>{log}</td>
                </tr>
              </>
            );
          })}

          {/* {errorMessages.map(
        (msg, index) =>
          errorReader(msg) && (
            <tr key={index} className="data">
              <td>{index + 1}</td>
              <td>{msg}</td>
              <td>{errorReader(msg)}</td>
            </tr>
          )
      )} */}
        </tbody>
      </table>
    </QueryClientProvider>
  );
};

export default App;
