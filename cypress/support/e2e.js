import "./commands";

beforeEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
  cy.clearAllSessionStorage();
});
