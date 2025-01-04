import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";


export const App = () => {
  return (
   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/authorization" element={<AuthPage/>} />
      </Routes>
    </BrowserRouter>
  );
};