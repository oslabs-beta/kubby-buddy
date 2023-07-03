describe('DisplayRunning', () => {
  beforeEach(() => {
    cy.intercept('GET', 'container/all-active-containers', {
      fixture: 'runningContainers.json',
    });
    cy.visit('/'); // Adjust the URL if needed
  });

  it('should render DisplayRunning component after navigating to Containers page', () => {
    // Click the "Containers" menu item
    cy.contains('Containers').click();

    // Wait for the DisplayRunning component to render
    cy.get('.dockercontainer', { timeout: 10000 }).should('exist');

    cy.get('.container', { timeout: 15000 })
      .eq(0)
      .within(() => {
        cy.get('.container-name').should('have.text', 'container1');
        cy.get('.Imagename').should('have.text', 'Image: image1');
        cy.get('.Port').should('have.text', 'Port: port1');
        cy.get('.stopCommand-container').should('exist');
        cy.get('.startCommand-container').should('exist');
        cy.get('.chartContainer', { timeout: 10000 })
          .should('exist')
          .should('have.length', 3);
      })
      .should('exist')
      .should(($container) => {
        // Retry until the .container element is found or timeout
        Cypress.$($container).find('.container').length > 0;
      });
  });
});
