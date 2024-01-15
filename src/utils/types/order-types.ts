import { TIngredient } from './ingredients-types';

export type TOrder = {
  _id: string;
  name: string;
  status: string;
  ingredients: TIngredient[];
  createdAt: string;
  updatedAt: string;
  number: number;
  price: number;
};

export type TOrderData = {
  success: boolean;
  name: string;
  order: TOrder;
};

export type TOrderBody = {
  ingredients: string[];
}
