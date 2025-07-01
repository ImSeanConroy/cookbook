import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import RecipePage from "./pages/recipe-page";
import NotFoundPage from "./pages/not-found-page";
import BaseLayout from "./layout/base.layout";

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
        
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
