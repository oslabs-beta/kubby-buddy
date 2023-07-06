describe('Images', () => {
  beforeEach(() => {
    // Intercept the network request for getting available images
    cy.intercept('GET', 'images/all-images', {
      fixture: 'availableImages.json',
    }).as('availableImages');
    cy.visit('/'); // Adjust the URL if needed
  });
  it('Should render each componenet', () => {
    cy.get('.imagescontainer').should('exist');
    cy.get('.listImage').should('exist');
    cy.get('.image-info').should('exist');
    cy.get('.image-title').should('exist');
    cy.get(':nth-child(5) > :nth-child(1)').should('exist');
    cy.get(':nth-child(5) > :nth-child(2)').should('exist');
    cy.get('.image-info > :nth-child(2) > :nth-child(1)').should('exist');
    cy.get('.image-info > :nth-child(2) > :nth-child(2)').should('exist');
    cy.get('.image-info > :nth-child(3) > :nth-child(1)').should('exist');
    cy.get('.image-info > :nth-child(3) > :nth-child(2)').should('exist');
    cy.get(':nth-child(4) > :nth-child(1)').should('exist');
    cy.get(':nth-child(4) > :nth-child(2)').should('exist');

    cy.get('.cmdbutton').should('exist');
    cy.get('.cmdbutton').find('button').should('have.length', 2);
  });
});
