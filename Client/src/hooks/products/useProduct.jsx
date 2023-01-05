import { useQuery } from "@tanstack/react-query";
import { getProductsById } from "../../services/productService";

const useProduct = (productId) => {
  const { data, isLoading } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => getProductsById(productId),
  });
  
  return { data, isLoading };
};

export default useProduct;
