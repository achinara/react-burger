import uuid4 from 'uuid4';

const ITEM = {
  "_id": "item_id",
  "name": "Сыр с астероидной плесенью",
  "type": "main",
  "proteins": 84,
  "fat": 48,
  "carbohydrates": 420,
  "calories": 3377,
  "price": 4142,
  "image": "",
  "image_mobile": "",
  "image_large": "",
  "__v": 0
};

export const ORDER = {
  "_id": "order_id",
  "ingredients": [],
  "status": "done",
  "name": "Флюоресцентный spicy бургер",
  "owner": "4",
  "createdAt": "2024-02-16T10:55:24.483Z",
  "updatedAt": "2024-02-16T10:55:24.999Z",
  "number": 34331,
  "__v": 0,
};

const generateIngredients = (length: number) => Array.from({length}, () => ({...ITEM, _id: uuid4()}));

const generateConstructorItems = () =>
  generateIngredients(2).map((i, idx) => ({...i, dragId: `test_drag_id${idx}`}));

export const ERROR_TEXT = 'Something went wrong';

export const USER = {
  name: 'Test user',
  email: 'test-user@test.tu',
  password: 'testing_user',
};

export const INGREDIENTS = generateIngredients(4);
export const CONSTRUCTOR_ITEMS = generateConstructorItems();
