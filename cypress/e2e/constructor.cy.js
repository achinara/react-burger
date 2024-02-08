describe('Checking the functionality of the Constructor', function() {
  const firstBun = 'Краторная булка N-300i';
  const ingredient = 'Соус Spicy-X';
  const modalName = 'Детали ингредиента';
  const modalUrl = 'http://localhost:3000/ingredient/643d69a5c3f7b9001cfa093c';

  beforeEach(function() {
    cy.intercept('GET', 'api/ingredients', { fixture: 'data.json' });
    cy.viewport(1280, 900).visit('http://localhost:3000');
  });

  it('shows the Constructor-Page by default', function() {
    cy.contains('Соберите бургер');
  });
  
  it('shows modal with the first bun', function() {
    cy.showModal(firstBun, modalUrl);
  });

  it('hides modal by clicking on the close-button', function() {
    cy.showModal(firstBun, modalUrl);
    cy.get('[data-test="close"]').as('close');
    cy.get('@close').click();
    cy.contains(modalName).should('not.exist');
  });

  it('hides modal by clicking on overlay', function() {
    cy.showModal(firstBun, modalUrl);
    cy.get('[data-test="modal-overlay"]').as('overlay');
    cy.get('@overlay').click('topLeft', {force: true});
    cy.contains(modalName).should('not.exist');
  });
  
  it('drags and drops items to make a burger', function() {
    const dataTransfer = new DataTransfer();
    const constructorBunGroup = cy.get('[data-test="bun"]');
    const constructorIngGroup = cy.get('[data-test="default"]');

    // drag and drop a bun
    cy.contains(firstBun).trigger('dragstart', { dataTransfer });
    constructorBunGroup.first().trigger('drop');
    constructorBunGroup.contains(firstBun).should('exist');

    // drag and drop an ingredient
    cy.contains(ingredient).trigger('dragstart', { dataTransfer });
    constructorIngGroup.first().trigger('drop');
    constructorIngGroup.within(() => {
      cy.get('> div').should('have.length', 1);
    });

    // drag and drop another ingredient
    cy.contains(ingredient).trigger('dragstart', { dataTransfer });
    constructorIngGroup.first().trigger('drop');
    constructorIngGroup.within(() => {
      cy.get('> div').should('have.length', 2);
    });
  });
});
