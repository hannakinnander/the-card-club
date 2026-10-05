import { useQueryClient } from "@tanstack/react-query";
import type { INewOrder, IOrder } from "../types/order";
import { usePostOrder } from "./usePostOrder";
import { useUpdateInventory } from "./useUpdateInventory";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutateAsync: postOrder } = usePostOrder();
  const { mutateAsync: updateInventory } = useUpdateInventory();

  const checkout = async (newOrder: INewOrder) => {
    const placedOrder: IOrder = await postOrder(newOrder);
    await Promise.all(
      newOrder.orderItems.map((orderItem) =>
        updateInventory({
          id: orderItem.product.id,
          inventory: orderItem.product.inventory - orderItem.quantity,
        }),
      ),
    );
    queryClient.invalidateQueries({
      queryKey: ["products"],
    });
    newOrder.orderItems.forEach((orderItem) =>
      queryClient.invalidateQueries({
        queryKey: ["product", orderItem.product.id],
      }),
    );

    navigate(`/confirmation/${placedOrder.id}`);
  };

  return { checkout };
};
