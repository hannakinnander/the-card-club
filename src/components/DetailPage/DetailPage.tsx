import { useParams } from "react-router-dom";
import AddToCartBtn from "../common/AddToCartBtn";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useGetCategories } from "../../hooks/useGetCategories";

const DetailPage = () => {
  const { id } = useParams();

  const { data: product } = useGetProduct(id ?? "");
  const { data: categories = [] } = useGetCategories();

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
      <AddToCartBtn product={product}>lägg i varukorg</AddToCartBtn> 

     
    </div>
  );
}
export default DetailPage;