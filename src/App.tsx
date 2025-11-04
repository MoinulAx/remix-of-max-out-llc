import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Roster from "./pages/Roster";
import ContentHub from "./pages/ContentHub";
import Leadership from "./pages/Leadership";
import Inquire from "./pages/Inquire";
import Partners from "./pages/Partners";
import TMobile from "./pages/TMobile";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/home" element={<Home />} />
          <Route path="/roster" element={<Roster />} />
          <Route path="/content-hub" element={<ContentHub />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/inquire" element={<Inquire />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/tmobile" element={<TMobile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
