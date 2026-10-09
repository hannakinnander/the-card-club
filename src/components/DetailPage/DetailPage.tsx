import { useParams } from "react-router-dom";
import AddToCartBtn from "../common/AddToCartBtn";
import { useGetProduct } from "../../hooks/useGetProduct";
import { useGetCategories } from "../../hooks/useGetCategories";
import GoBackBtn from "../common/GoBackBtn";
import { useEffect } from "react";

const DetailPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { id } = useParams();
  const {
    data: product,
    isLoading: productIsLoading,
    isError: productIsError,
    error: productError,
  } = useGetProduct(id!);

  const {
    data: productCategories,
    isLoading: categoriesIsLoading,
    isError: categoriesIsError,
    error: categoriesError,
  } = useGetCategories();

  return (
    <div className="page-container text-white">
      <div>
        <GoBackBtn>Tillbaka</GoBackBtn>
        <div className="flex flex-wrap align-center gap-5 p-10 mt-3 rounded-2xl bg-gray-900">
          {productIsLoading && <p>Laddar...</p>}
          {productIsError && (
            <p className="text-red-600">{productError.message}</p>
          )}
          {product && (
            <>
              <img
                src={`/card-images/${product.img}`}
                alt={product.title}
                className="min-h- max-h-70 w-auto sm:self-center"
              />
              <div className="flex-1 min-w-60 max-w-180 flex flex-col gap-5 justify-between p-10 rounded-2xl">
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <p className="text-lg">
                  {product.price} SEK{" "}
                  <span
                    className={`${product.onSale ? "ml-2 pt-1 pb-1 pl-2 pr-2 bg-red-600 rounded-xl text-sm font-bold " : ""}`}
                  >
                    {product.onSale ? "REA!" : ""}
                  </span>
                </p>
                <AddToCartBtn
                  product={product}
                  className={"w-50"}
                ></AddToCartBtn>

                <p className="text-sm">Lagersaldo: {product.inventory}</p>
                <div className="flex gap-3 text-sm">
                  <p>Kategorier: </p>
                  {categoriesIsLoading && <p>Laddar...</p>}
                  {categoriesIsError && (
                    <p className="text-red-500">{categoriesError.message}</p>
                  )}
                  {productCategories && (
                    <>
                      {productCategories
                        .filter((category) =>
                          product.category.includes(category.id),
                        )
                        .map((category) => (
                          <span key={category.id} className="ml-4">
                            {category.title}
                          </span>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DetailPage;
