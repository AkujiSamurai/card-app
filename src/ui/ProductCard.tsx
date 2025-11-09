import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product, toggleLike, removeProduct } from "../store/productsSlice";
import IconButton from "../components/IconButton";

interface ProductCardProps {
  p: Product;
}

export default function ProductCard({ p }: ProductCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleLike(p.id));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (confirm("Delete this product?")) {
      dispatch(removeProduct(p.id));
    }
  };

  return (
    <article className="card">
      <div className="card-body" onClick={() => navigate(`/products/${p.id}`)}>
        <h3 className="card-title">{p.title}</h3>
        <p className="card-text">{p.description}</p>
      </div>

      <div className="card-actions">
        <IconButton onClick={handleLike} title="Like">
          <span className={`heart ${p.liked ? "liked" : ""}`}>♥</span>
        </IconButton>

        <IconButton onClick={handleDelete} title="Delete">
          🗑
        </IconButton>
      </div>
    </article>
  );
}
