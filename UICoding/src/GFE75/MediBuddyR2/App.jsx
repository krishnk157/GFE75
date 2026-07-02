import { useFetch } from "./useFetch";
import { useProducts } from "./useProducts";

const URL = "https://fakestoreapi.com/products";

export default function App() {
  const { data, loading, error } = useFetch(URL);

  const {
    rows,
    categories,
    page,
    totalPages,
    setSearch,
    setCategory,
    setSort,
    setPage,
  } = useProducts(data);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Products</h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <input
          placeholder="Search products..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>

        <select onChange={(e) => setSort(e.target.value)}>
          <option value="">No Sort</option>
          <option value="priceAsc">Price ↑</option>
          <option value="priceDesc">Price ↓</option>
          <option value="ratingDesc">Rating ↓</option>
        </select>
      </div>

      {rows.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid #ddd",
            padding: "12px",
            marginBottom: "10px",
          }}
        >
          <h4>{product.title}</h4>
          <p>Price: ${product.price}</p>
          <p>Category: {product.category}</p>
          <p>Rating: {product.rating.rate}</p>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span style={{ margin: "0 10px" }}>
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
