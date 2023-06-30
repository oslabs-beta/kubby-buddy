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
    cy.get('.dockercontainer').should('exist');

    // Verify the presence of running container names in DisplayRunning component
    cy.get('.dockercontainer').contains('container1').should('exist');
    cy.get('.dockercontainer').contains('container2').should('exist');
  });
  it('should invoke the stop command after navigating to Containers page', () => {
    // Click the "Containers" menu item
    cy.contains('Containers').click();

    // Wait for the DisplayRunning component to render
    cy.get('.dockercontainer').should('exist');

    // Wait for the .stop button to be present
    cy.get('.dockercontainer')
      .contains('container1')
      .parents('.container')
      .find('.cmdbutton .stopCommand-container .stop', { timeout: 10000 })
      .should('exist')
      .click();

    // Assert that the command has been invoked
    // cy.get('@commandSpy').should('be.called');
  });
  it('should invoke the start command after navigating to Containers page', () => {
    // Click the "Containers" menu item
    cy.contains('Containers').click();

    // Wait for the DisplayRunning component to render
    cy.get('.dockercontainer').should('exist');

    // Wait for the .stop button to be present
    cy.get('.dockercontainer')
      .contains('container1')
      .parents('.container')
      .find('.cmdbutton .startCommand-container .start', { timeout: 10000 })
      .should('exist')
      .click();

    // Assert that the command has been invoked
    // cy.get('@commandSpy').should('be.called');
  });
  it('should invoke the delete command after navigating to Containers page', () => {
    // Click the "Containers" menu item
    // cy.contains('Containers').click();
    // // Wait for the DisplayRunning component to render
    // cy.get('.dockercontainer').should('exist');
    // // Wait for the .stop button to be present
    // cy.get('.dockercontainer')
    //   .contains('container1')
    //   .parents('.container')
    //   .find('.cmdbutton .deleteCommand-container .delete', { timeout: 10000 })
    //   .should('exist')
    //   .click();
    // Assert that the command has been invoked
    // cy.get('@commandSpy').should('be.called');
  });
});
