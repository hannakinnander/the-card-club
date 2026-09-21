export interface IProduct {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string[];
  onSale: boolean;
  img: string;
  inventory: number;
}
