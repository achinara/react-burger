export type TIngredientItem = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
};

export type TIngredientsData = {
  data: TIngredientItem[];
  success: boolean;
};

export type TIngredient = TIngredientItem & { count: number };
export type TConstructorItem = TIngredient & { dragId: string };
