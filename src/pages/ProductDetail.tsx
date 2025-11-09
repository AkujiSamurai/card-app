import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.items.find((it) => String(it.id) === String(id))
  );

  if (!product)
    return (
      <main className="container">
        <p>Product not found.</p>
      </main>
    );

  return (
    <main className="container">
      <button className="btn" onClick={() => navigate("/products")}>
        ← Back
      </button>

      <div className="detail-card">
        {product.image && (
          <img
            src={product.image}
            alt={product.title}
            style={{
              width: 500,
              borderRadius: 10,
              objectFit: "cover",
            }}
          />
        )}

        <div>
          <h2>{product.title}</h2>
          <p>{product.description}</p>

          <p>
            <em>{product.created ? "User created" : "API product"}</em>
          </p>
        </div>
      </div>
    </main>
  );
}
