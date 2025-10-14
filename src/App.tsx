import { RouterProvider } from "react-router-dom";
import route from "./routes/route";
import { QueryClientProvider } from "@tanstack/react-query";
import { QueryClient } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Toaster position="bottom-right" />
        <RouterProvider router={route} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
