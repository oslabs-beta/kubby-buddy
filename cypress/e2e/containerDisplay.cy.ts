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
  });

  it('should render .container elements with correct content', () => {
    // Click the "Containers" menu item
    cy.contains('Containers').click();

    // Assert that the .container elements are rendered correctly with the expected content
    cy.get('.dockercontainer', { timeout: 10000 }).should('exist');
    cy.get('.container', { timeout: 10000 }).should('exist');

    cy.get('.container')
      .eq(0)
      .within(() => {
        cy.get('.container-name').should('have.text', 'container1');
        cy.get('.Imagename').should('have.text', 'Image: image1');
        cy.get('.Port').should('have.text', 'Port: port1');
      });

    cy.get('.container')
      .eq(1)
      .within(() => {
        cy.get('.container-name').should('have.text', 'container2');
        cy.get('.Imagename').should('have.text', 'Image: image2');
        cy.get('.Port').should('have.text', 'Port: port2');
      });
  });

  it('should render cmd buttons stop and log', () => {
    // Click the "Containers" menu item
    cy.contains('Containers').click();

    // Assert that the .container elements are rendered correctly with the expected content
    cy.get('.dockercontainer', { timeout: 10000 }).should('exist');
    cy.get('.container', { timeout: 10000 }).should('exist');

    cy.get('.container')
      .eq(0)
      .within(() => {
        cy.get('.stopCommand-container').should('exist');
        cy.get('.');
      });
  });
});
