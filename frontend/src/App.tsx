import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home-page";
import BaseLayout from "@/layout/base.layout";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}

export default App;
