import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { IProduct } from '../types/product';

const DetailPage = () => {
  const { id } = useParams();

  const [product, setProduct] = useState<IProduct | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {

        const product = data.find((product: IProduct) => product.id === id)
        setProduct(product || null);
        
      });
  }, []);
    if (!product) {
    return <div>Laddar...</div>;
  }
  return (
    <div>
      <h1>{product.title}</h1>
      <img src={`/card-images/${product.img}`} alt={product.title} />
      <p>{product.description}</p>
      <p>{product.price} kr</p>
      <p>Lager: {product.inventory}</p>
      
    </div>
  );
}
export default DetailPage;