/// <reference types="cypress" />

Cypress.Commands.add('showModal', (elemName: string, url: string) => {
  cy.contains(elemName).click();
  cy.get('[data-test="modal"]').contains(elemName);
  cy.url().should('equal', url);
});
