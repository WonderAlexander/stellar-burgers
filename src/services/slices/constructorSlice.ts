import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from '../store';

// Интерфейс стейта
interface IInitialState {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
}

// Изначальный стейт
const initialState: IInitialState = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  initialState,
  name: 'constructor',
  reducers: {
    // Добавить ингредиент
    addIngredient: (state, action) => {
      const newIngredient = Object.assign({}, action.payload, { id: uuidv4() });
      newIngredient.type == 'bun'
        ? (state.constructorItems.bun = newIngredient)
        : state.constructorItems.ingredients.push(newIngredient);
    },
    // Удалить ингредиент
    removeIngredient: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient: TConstructorIngredient) =>
            ingredient.id !== action.payload.id // Фильтрация ингредиентов
        );
    },
    resetIngredients: (state) => {
      state.constructorItems.ingredients = [];
      state.constructorItems.bun = null;
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const indexToMove = action.payload - 1;
      const element = state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(indexToMove, 0, element);
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const indexToMove = action.payload + 1;
      const element = state.constructorItems.ingredients[action.payload];
      state.constructorItems.ingredients.splice(action.payload, 1);
      state.constructorItems.ingredients.splice(indexToMove, 0, element);
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  resetIngredients,
  moveUp,
  moveDown
} = constructorSlice.actions;

// Селектор для получения общего количества ингредиентов
export const selectIngredientCount = (
  state: IInitialState,
  ingredient: TIngredient
) =>
  state.constructorItems.ingredients.filter((ing) => ing._id === ingredient._id)
    .length;

export const selectBurgerIngredients = (state: RootState) =>
  state.burger.constructorItems;

export const constructorReducer = constructorSlice.reducer;
