import {
  constructorSlice,
  initialState,
  addIngredient,
  removeIngredient,
  resetIngredients
} from '../services/slices/constructorSlice';
import { TConstructorIngredient } from '@utils-types';

const mockIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  }
];

describe('Проверка конструктора бургера', () => {
  it('Добавление ингредиента в конструктор бургера', () => {
    const expectedState = {
      ...initialState,
      ingredients: [mockIngredients[0]]
    };
    const actualState = constructorSlice.reducer(
      initialState,
      addIngredient(mockIngredients[0])
    );
    expect(actualState.constructorItems.ingredients[0]).toEqual({
      ...expectedState.ingredients[0],
      id: expect.any(String)
    });
  });

  it('Удалить элемент из конструктора бургера', () => {
    const initialState = {
      constructorItems: {
        bun: null,
        ingredients: [
          { ...mockIngredients[0], id: '1' },
          { ...mockIngredients[1], id: '2' }
        ]
      }
    };

    const action = removeIngredient({ id: '1' });
    const expectedState = constructorSlice.reducer(initialState, action);

    expect(expectedState.constructorItems.ingredients).toEqual([
      { ...mockIngredients[1], id: '2' }
    ]);
  });
});
