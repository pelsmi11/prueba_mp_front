import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ProtectedLayout from "./layouts/ProtectedLayout";
import { AuthProvider } from "./context/AuthContext";
import CasesPage from "./pages/CasesPage";
import CaseFormPage from "./pages/CaseFormPage";
import ProfilePage from "./pages/ProfilePage";
import RecoveryPassword from "./pages/RecoveryPassword";
import ProtectedRoute from "./ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import LandingPage from "./pages/LandingPage";
import { CaseProvider } from "./context/CaseContext";
import { ProfileProvider } from "./context/ProfileContext";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <CaseProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />}></Route>
              <Route path="/register" element={<RegisterPage />}></Route>
              <Route path="/login" element={<LoginPage />}></Route>
              <Route
                path="/recovery-password"
                element={<RecoveryPassword />}
              ></Route>
              <Route path="/change-password" element={<ChangePassword />}></Route>

              <Route element={<ProtectedRoute />}>
                <Route element={<ProtectedLayout />}>
                  <Route path="/cases" element={<CasesPage />}></Route>
                  <Route path="/add-case" element={<CaseFormPage />}></Route>
                  <Route path="/case/:id" element={<CaseFormPage />}></Route>

                  <Route path="/profile" element={<ProfilePage />}></Route>
                  <Route path="/profile/:id" element={<ProfilePage />}></Route>
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CaseProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
