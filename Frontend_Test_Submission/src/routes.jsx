import React from "react";
import { Routes, Route } from "react-router-dom";
import URLShortenerForm from "./components/URLShortenerForm";
import RedirectHandler from "./components/RedirectHandler";
import StatisticsPage from "./components/StatisticsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<URLShortenerForm />} />
      <Route path="/stats" element={<StatisticsPage />} />
      <Route path="/:shortcode" element={<RedirectHandler />} />
    </Routes>
  );
}
