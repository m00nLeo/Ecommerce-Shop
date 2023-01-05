import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../services/productService";
import useDebounce from "../useDebounce";

const useSearchProducts = (searchString, delay = 500) => {
  const debounceSearch = useDebounce(searchString, delay);

  const { data, isLoading } = useQuery({
    queryKey: ["products", { q: debounceSearch }],
    queryFn: () => searchProducts(searchString),
  });

  return { data, isLoading };
};

export default useSearchProducts;
