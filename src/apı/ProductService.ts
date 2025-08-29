import { useState } from 'react';
import { API_URLS } from './apiURLs';
import { callAPI } from './core';
import { Product } from './models/Products';

const useProductService = () => {
  const [products, setProducts] = useState<Product[] | undefined>(undefined);

  const getProducts = () => {
    callAPI({
      endPoint: API_URLS.products,
      method: 'GET',
    }).then(res => setProducts(res.data));
  };

  return {
    products,
    getProducts,
  };
};
export default useProductService;
