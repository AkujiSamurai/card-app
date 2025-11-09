import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Product, toggleLike, removeProduct } from "../store/productsSlice";
import IconButton from "./IconButton";

interface ProductCardProps {
  p: Product;
}

export default function ProductCard({ p }: ProductCardProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(toggleLike(p.id));
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    dispatch(removeProduct(p.id));
    setShowConfirm(false);
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

      {showConfirm && (
        <div className="modal">
          <div className="modal-content">
            <p>Delete product?</p>
            <button className="btn" onClick={confirmDelete}>
              Yes
            </button>
            <button className="btn" onClick={() => setShowConfirm(false)}>
              No
            </button>
          </div>
        </div>
      )}
    </article>
  );
}
