import { useParams } from "react-router-dom";
import AddToCartBtn from "../common/AddToCartBtn";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useGetCategories } from "../../hooks/useGetCategories";
import GoBackBtn from "../common/GoBackBtn";

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
    <div className={"text-white  p-5 sm:p-10 "}>
      <GoBackBtn>Tillbaka</GoBackBtn>
      <div
        className={
          "flex flex-wrap align-center gap-10 p-10 mt-3 rounded-2xl bg-gray-900"
        }
      >
        <img
          src={`/card-images/${product.img}`}
          alt={product.title}
          className={"h-100 w-auto"}
        />
        <div
          className={" flex flex-col justify-between w-180 p-10 rounded-2xl"}
        >
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p className={"text-lg"}>
            {product.price} SEK{" "}
            <span
              className={`${product.onSale ? "ml-2 pt-1 pb-1 pl-2 pr-2 bg-red-600 rounded-xl text-sm font-bold " : ""}`}
            >
              {product.onSale ? "REA!" : ""}
            </span>
          </p>
<<<<<<< HEAD
          <AddToCartBtn product={product}></AddToCartBtn>
=======
          <AddToCartBtn product={product}>lägg i varukorg</AddToCartBtn>
>>>>>>> 0487fd4478f2ea7d4c844930d4d815419ccff9e9

          <div className={"flex gap-3 text-sm"}>
            <p>Lagersaldo: {product.inventory}</p>
            <p>Kategorier: </p>
            {productCategories
              .filter((category) => product.category.includes(category.id))
              .map((category) => (
                <p key={category.id} className={""}>
                  {category.title}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default DetailPage;
