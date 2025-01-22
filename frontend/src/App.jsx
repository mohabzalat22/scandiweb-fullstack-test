import "./App.css";
import Category from "./pages/Category";
import ProductDetails from "./pages/ProductDetails";
import Error from "./pages/Error";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SuccessOrder from "../src/components/SuccessOrder"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Category/>}></Route>
        <Route path="/product/:id" element={<ProductDetails/>}></Route>
        <Route path="/success" element={<SuccessOrder />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
