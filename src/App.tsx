import { RouterProvider } from "react-router-dom";
import route from "./routes/route";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster position="bottom-left" reverseOrder />
      <RouterProvider router={route} />
    </QueryClientProvider>
  );
}

export default App;
