import { Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetail from "./pages/ProductDetail";
import CreateProduct from "./pages/CreateProduct";

export default function App() {
  return (
        <Routes>
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/" element={<ProductsPage />} />
        </Routes>
  );
}
