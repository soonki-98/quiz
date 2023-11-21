import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Skeleton } from "@mui/material";

import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Column } from "./components";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Suspense
        fallback={
          <Column
            gap={16}
            verticalAlign="center"
            horizonAlign="center"
            style={{ margin: "auto", width: "100%", height: "100vh" }}
          >
            <Skeleton
              animation="wave"
              variant="rounded"
              width={600}
              height={50}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={600}
              height={50}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={600}
              height={50}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={600}
              height={50}
            />
            <Skeleton
              animation="wave"
              variant="rounded"
              width={100}
              height={50}
            />
          </Column>
        }
      >
        <App />
      </Suspense>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
