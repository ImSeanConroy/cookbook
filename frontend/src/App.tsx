import { Route, Routes } from "react-router-dom";

import HomePage from "@/pages/home-page";
import BaseLayout from "@/layout/base.layout";
// import NotFoundPage from "./pages/not-found-page";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
