import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { setProducts } from "../store/productsSlice";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const items = useSelector((state: RootState) => state.products.items);
  const loaded = useSelector((state: RootState) => state.products.loaded);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "liked">("all");

  useEffect(() => {
    if (!loaded) {
      fetch("https://fakestoreapi.com/products")
        .then((res) => res.json())
        .then((data) => {
          const products = data.map((item: any) => ({
            id: item.id,
            title: item.title,
            image: item.image,
            description: item.description,
            link: "#",
            category: item.category,
            liked: false,
            created: false,
          }));

          dispatch(setProducts(products));
        })
        .catch((err) => {
          console.error("Ошибка загрузки:", err);
        });
    }
  }, [loaded, dispatch]);

  const shown = items.filter((i) => (filter === "all" ? true : !!i.liked));

  return (
    <main className="container">
      <header className="top">
        <h1>Products</h1>
        <button className="btn" onClick={() => navigate("/create-product")}>
          Create product
        </button>
      </header>

      <section className="controls">
        <label>
          <input
            type="radio"
            checked={filter === "all"}
            onChange={() => setFilter("all")}
          />{" "}
          All
        </label>
        <label style={{ marginLeft: 8 }}>
          <input
            type="radio"
            checked={filter === "liked"}
            onChange={() => setFilter("liked")}
          />{" "}
          Favorites
        </label>
        <span style={{ marginLeft: 12 }}>{shown.length} items</span>
      </section>

      <section className="grid">
        {shown.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </section>

      {shown.length === 0 && <p className="muted">No products to show.</p>}
    </main>
  );
}
