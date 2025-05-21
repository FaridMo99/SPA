import { RouterProvider } from "react-router-dom";
import route from "./routes/route";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

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
