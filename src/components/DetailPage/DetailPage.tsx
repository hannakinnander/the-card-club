import { useParams } from "react-router-dom";
import AddToCartBtn from "../common/AddToCartBtn";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useGetCategories } from "../../hooks/useGetCategories";


const DetailPage = () => {
  const { id } = useParams();

  const {
      data: product,
      isLoading: producIsLoading,
      isError: productIsError,
      error: productError,
    } = useGetProduct(id!);

  const {
    data: productCategories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    error: categoriesError,
  } = useGetCategories();

  if (producIsLoading || categoriesIsLoading) {
    return <p>Laddar...</p>;
  }
  if (productIsError) {
    return <p>fel: {productError.message}</p>;
  }
  if (categoriesIsError) {
    return <p>fel: {categoriesError.message}</p>;
  }
  if (!product || !productCategories) {
    return <p>Produkten hittades inte</p>;
  }

  return (
    <div>
      
      <img src={`/card-images/${product.img}`} alt={product.title} />
      <h1>{product.title}</h1>
       <div>
       {productCategories.filter((category) => product.category.includes(category.id)).map((category) => (
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