export type TStatus = 'done' | 'created' | 'pending';

export type TOrder = {
  _id: string;
  name: string;
  status: TStatus;
  ingredients: string[];
  createdAt: string;
  updatedAt: string;
  number: number;
};

export type TOrderData = {
  success: boolean;
  name: string;
  order: TOrder;
};

export type TOrderBody = {
  ingredients: string[];
}
