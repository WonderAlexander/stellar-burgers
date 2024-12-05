import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';

// Типизация стейта
export interface IIngredientsState {
  ingredients: TIngredient[];
  isIngredientsLoading: boolean;
  error: string | null;
}

// Изначальный стейт
export const initialState: IIngredientsState = {
  ingredients: [],
  isIngredientsLoading: false,
  error: null
};

// Асинхронный экшн для получения ингредиентов с сервера
export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => getIngredientsApi()
);

// Слайс ингредиентов
export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isIngredientsLoading = true;
        state.error = null;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isIngredientsLoading = false;
        // if (action.error.message !== undefined) {
        //   state.error = action.error.message;
        // }
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isIngredientsLoading = false;
        state.error = null;
        state.ingredients = action.payload;
      });
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectBuns: (state) =>
      state.ingredients.filter((item: TIngredient) => item.type == 'bun'),
    selectMains: (state) =>
      state.ingredients.filter((item: TIngredient) => item.type == 'main'),
    selectSauces: (state) =>
      state.ingredients.filter((item: TIngredient) => item.type == 'sauce')
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;
export const { selectIngredients, selectBuns, selectMains, selectSauces } =
  ingredientsSlice.selectors;
