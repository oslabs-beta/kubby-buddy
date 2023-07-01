describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:8080');
    cy.get('.image-title');
    cy.get(':nth-child(5) > :nth-child(1)');
    cy.get(':nth-child(5) > :nth-child(2)');
  });
});
