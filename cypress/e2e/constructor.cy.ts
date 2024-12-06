const buns = '[data-cy=buns]';
const mains = '[data-cy=mains]';
const sauces = '[data-cy=sauces]';
const selectedIngredients = '[data-cy=selected-ingredients]';

describe('Проверяем добавление ингредиента в конструктор бургера', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('');
  });
  it('Добавить булочку', () => {
    cy.get(buns).contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]')
      .contains('Ингредиент 1')
      .should('exist');

    cy.get('[data-cy=constructor-bun-2]')
      .contains('Ингредиент 1')
      .should('exist');
  });
  it('Добавить наполнитель', () => {
    cy.get(mains).contains('Добавить').click();
    cy.get(sauces).contains('Добавить').click();
    cy.get(selectedIngredients).contains('Ингредиент 2').should('exist');
    cy.get(selectedIngredients).contains('Ингредиент 4').should('exist');
  });
});

describe('Проверяем функционала модального окна ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('');
  });
  it('Открыть модальное окно', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-cy=burger-ingredients]').contains('Ингредиент 4').click();
    cy.get('#modals').contains('Ингредиент 4').should('exist');
  });
  it('Закрыть модальное окно при нажатии на иконку', () => {
    cy.contains('Ингредиент 4').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-close-button]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('Закрыть модальное окно при нажатии на оверлей', () => {
    cy.contains('Ингредиент 4').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('left', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('Проверка функционала модального окна заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'post_order.json' }).as(
      'postOrder'
    );
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1300, 800);
    cy.visit('');
    cy.get(buns).as('buns');
    cy.get(mains).as('mains');
    cy.get(sauces).as('sauces');
    cy.get(selectedIngredients).as('selected');
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
  });
  afterEach(() => {
    window.localStorage.clear();
    cy.setCookie('accessTokent', '');
  });
  it('Создать заказ при клике', () => {
    cy.get('@buns').contains('Добавить').click();
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();
    cy.contains('Оформить заказ').click();
    cy.wait('@postOrder')
      .its('request.body')
      .should('deep.equal', {
        ingredients: ['1', '2', '4', '1']
      });
    cy.get('#modals').contains('8910221').should('exist');
  });
  it('Закрыть модальное окно заказа', () => {
    cy.get('@buns').contains('Добавить').click();
    cy.get('@mains').contains('Добавить').click();
    cy.get('@sauces').contains('Добавить').click();
    cy.contains('Оформить заказ').click();
    cy.get('[data-cy=modal-close-button]').click();
    cy.contains('идентификатор заказа').should('not.exist');
    cy.get('@selected').contains('Ингредиент 2').should('not.exist');
    cy.get('@selected').contains('Ингредиент 3').should('not.exist');
    cy.get('@selected').contains('Ингредиент 1').should('not.exist');
  });
});
