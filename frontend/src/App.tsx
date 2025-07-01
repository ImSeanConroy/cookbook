import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home-page";
import RecipePage from "./pages/recipe-page";
import NotFoundPage from "./pages/not-found-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/recipe/:id" element={<RecipePage />} />
      
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
