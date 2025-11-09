import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, Product } from "../store/productsSlice";
import { useNavigate } from "react-router-dom";

const uid = () => Math.random().toString(36).slice(2, 9);

export default function CreateProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = () => {
    const e: string[] = [];
    if (!title.trim()) e.push("Title required");
    if (!desc.trim() || desc.trim().length < 10)
      e.push("Description min 10 chars");
    if (!image.trim()) e.push("Link required");
    setErrors(e);
    return e.length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    const p: Product = {
      id: uid(),
      title: title.trim(),
      description: desc.trim(),
      image: image.trim(),
      liked: false,
      created: true,
    };
    dispatch(addProduct(p));
    navigate("/products");
  };

  return (
    <main className="container">
      <header className="top">
        <h1>Create product</h1>
        <button className="btn" onClick={() => navigate("/products")}>
          ← Back
        </button>
      </header>
      <form className="form" onSubmit={submit}>
        {errors.length > 0 && (
          <div className="errors">
            {errors.map((er, i) => (
              <div key={i}>{er}</div>
            ))}
          </div>
        )}
        <label>
          Title
          <input value={title} onChange={(e) => setTitle(e.target.value)} />
        </label>
        <label>
          Description
          <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
        </label>
        <label>
          Image link
          <input value={image} onChange={(e) => setImage(e.target.value)} />
        </label>
        <button className="btn" type="submit">
          Create
        </button>
      </form>
    </main>
  );
}
