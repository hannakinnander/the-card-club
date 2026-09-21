import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IProduct } from '../types/product';
import AddToCartButton from "./AddToCartButton";

interface ICategory {
  id: string;
  title: string;
}

const DetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);
  const [categories, setCategories] =  useState<ICategory[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {

        const product = data.find((product: IProduct) => product.id === id)
        setProduct(product || null);
  });

  fetch("http://localhost:3000/categories")
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
    
      });

  }, []);

    if (!product) {
    return <div>Laddar...</div>;
  }

  const productCategories = categories.filter((category) =>
    product.category.includes(category.id)
  );

  return (
    <div>
      
      <img src={`/card-images/${product.img}`} alt={product.title} />
      <h1>{product.title}</h1>
       <div>{productCategories.map((category) => (
        <p key={category.id}>{category.title}</p>
      ))}
      </div>
      <p>{product.description}</p>
      <p>{product.price} kr</p>
      <p>Lager: {product.inventory}</p>
      <AddToCartButton product={product} />

     
    </div>
  );
}
export default DetailPage;