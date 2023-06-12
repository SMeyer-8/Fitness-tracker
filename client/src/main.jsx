import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { AllActivities } from "./Components/AllActivities.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import AuthProvider from "./Components/auth/AuthProvider.jsx";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/activities" element={<AllActivities />} />
          <Route path="*" element={<App />} />  
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);