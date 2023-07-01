describe('The Home Page', () => {
  it('successfully loads', () => {
    cy.visit('/'); // change URL to match your dev URL

    cy.get('[data-testid="mainpage"]').should('exist');

    cy.get('[data-testid="sidenav"]').should('exist');

    cy.get('[data-testid="mainnav"]').should('exist');
  });
});
