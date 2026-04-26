import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Splash from "./pages/Splash";
import Home from "./pages/Home";
import Roster from "./pages/Roster";
import MaxOutMethod from "./pages/MaxOutMethod";
import ContentHub from "./pages/ContentHub";
import Leadership from "./pages/Leadership";
import Inquire from "./pages/Inquire";
import Partners from "./pages/Partners";
import TMobile from "./pages/TMobile";
import Careers from "./pages/Careers";
import JobDetail from "./pages/JobDetail";
import NotFound from "./pages/NotFound";
import ScrollToTop from "@/components/ScrollToTop";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminContentHub from "./pages/admin/AdminContentHub";
import AdminRoster from "./pages/admin/AdminRoster";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminPartners from "./pages/admin/AdminPartners";
import AdminCareers from "./pages/admin/AdminCareers";
import AdminApplications from "./pages/admin/AdminApplications";
import AdminJobApplications from "./pages/admin/AdminJobApplications";
import AdminQuoteRequests from "./pages/admin/AdminQuoteRequests";
import RequireAdmin from "./pages/admin/RequireAdmin";

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
          <Route path="/max-out-method" element={<MaxOutMethod />} />
          <Route path="/content-hub" element={<ContentHub />} />
          <Route path="/leadership" element={<Leadership />} />
          <Route path="/inquire" element={<Inquire />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/tmobile" element={<TMobile />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/careers/:id" element={<JobDetail />} />
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <AdminLayout />
              </RequireAdmin>
            }
          >
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="content-hub" element={<AdminContentHub />} />
            <Route path="roster" element={<AdminRoster />} />
            <Route path="careers" element={<AdminCareers />} />
            <Route path="inquiries" element={<AdminInquiries />} />
            <Route path="applications" element={<AdminApplications />} />
            <Route path="job-applications" element={<AdminJobApplications />} />
            <Route path="quote-requests" element={<AdminQuoteRequests />} />
            <Route path="partners" element={<AdminPartners />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
