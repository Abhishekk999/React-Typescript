import "./App.css";
import CurrencyConverter from "./components/tasks/currency-converter";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Card from "./components/tasks/card";
import Table from "./components/tasks/table";
import AuthLayout from "./components/layout/auth";
import DashboardLayout from "./components/layout/dashboard";
import Login from "./components/auth/login";
import SignUp from "./components/auth/signUp";
import ForgotPassword from "./components/auth/forgot-password";
import ResetPassword from "./components/auth/reset-password";
import ThemeProvider from "./context/themeContext";
import TicTacToe from "./components/tic-tac-toe";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route path="" element={<Dashboard />} />
              <Route
                path="currency-converter"
                element={<CurrencyConverter />}
              />
              <Route path="list" element={<Table />} />
              <Route path="card" element={<Card />} />
              <Route path="game" element={<TicTacToe />} />
            </Route>
            <Route path="" element={<AuthLayout />}>
              <Route path="" element={<Login />} />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
