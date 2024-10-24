import React, { useState } from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products }) => {
  const [productList, setProductList] = useState(products);

  const handleDelete = (deletedProductId) => {
    // Update the product list after a product is deleted
    setProductList(productList.filter(product => product.id !== deletedProductId));
  };

  return (
    <div>
      {productList.map(product => (
        <ProductItem key={product.id} product={product} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ProductList;
