import { useState } from "react";

export function useSearch(initialValue) {
  const [search, setSearch] = useState(initialValue);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return { search, handleSearch };
}
