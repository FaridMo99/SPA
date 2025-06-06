import { RouterProvider } from "react-router-dom";
import route from "./routes/route";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/queryClient";
import { Suspense } from "react";

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={route} />
      </QueryClientProvider>
    </>
  );
}

export default App;
