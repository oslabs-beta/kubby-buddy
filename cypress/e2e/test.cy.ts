describe('template spec', () => {
  beforeEach(() => {
    // Intercept the network request for getting available images
    cy.intercept('GET', 'images/all-images', {
      fixture: 'availableImages.json',
    }).as('availableImages');
    cy.visit('/'); // Adjust the URL if needed
  });
  it('passes', () => {
    cy.get('.image-title');
    cy.get(':nth-child(5) > :nth-child(1)');
    cy.get(':nth-child(5) > :nth-child(2)');
  });
});
