describe('SideNav', () => {
  beforeEach(() => {
    cy.visit('/'); // Adjust the URL if needed
    // Mock the necessary API responses
    cy.intercept('GET', 'container/all-active-containers', {
      fixture: 'runningContainers.json',
    });
    cy.intercept('GET', 'image/all-images', {
      fixture: 'availableImages.json',
    });
    cy.intercept('GET', 'volume/all-volumes', {
      fixture: 'availableVolumes.json',
    });
  });

  it('should display the SideNav with menu items', () => {
    // Verify the existence of the SideNav container
    cy.get('[data-testid="sidenav"]').should('exist');

    // Verify the presence of menu items
    // cy.contains('Dashboard').should('exist');
    cy.contains('Images').should('exist');
    cy.contains('Containers').should('exist');
  });

  // it('should update the context value when menu items are clicked', () => {
  //   cy.window().its('UserContext', { timeout: 10000 }).should('exist').then((UserContext) => {
  //     cy.spy(UserContext, 'setShowing').as('setShowing');
  //   });

  //   // Click the "Images" menu item
  //   cy.contains('Images').click();

  //   // Verify the context value was updated
  //   cy.get('@setShowing').should('be.calledWith', 'Images');

  //   // Click the "Containers" menu item
  //   cy.contains('Containers').click();

  //   // Verify the context value was updated
  //   cy.get('@setShowing').should('be.calledWith', 'Containers');
  // });
});
