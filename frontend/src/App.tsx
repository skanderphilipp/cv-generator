// frontend/src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CVBuilder from "./pages/CVBuilder";
import TemplateManagement from "./pages/TemplateManagement";
import HomePage from "./pages/HomePage";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="cv-builder" element={<CVBuilder />} />
          <Route path="templates" element={<TemplateManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
