import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "./useDebounce";

const PAGE_SIZE = 6;

export function useProducts(products = []) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category, sort]);

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // category filter
    if (category !== "all") {
      result = result.filter((p) => p.category === category);
    }

    // search
    if (debouncedSearch.trim()) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    // sort
    switch (sort) {
      case "priceAsc":
        result.sort((a, b) => a.price - b.price);
        break;

      case "priceDesc":
        result.sort((a, b) => b.price - a.price);
        break;

      case "ratingDesc":
        result.sort((a, b) => b.rating.rate - a.rating.rate);
        break;

      default:
        break;
    }

    return result;
  }, [products, category, debouncedSearch, sort]);

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);

  const rows = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;

    return filteredProducts.slice(start, start + PAGE_SIZE);
  }, [filteredProducts, page]);

  return {
    rows,
    categories,
    page,
    totalPages,
    setSearch,
    setCategory,
    setSort,
    setPage,
  };
}
