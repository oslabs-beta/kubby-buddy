// describe('Quickview', () => {
//   beforeEach(() => {
//     cy.intercept('GET', 'container/all-active-containers', {
//       fixture: 'runningContainers.json',
//     });
//     cy.visit('/'); // Adjust the URL if needed
//   });

//   it('should display running containers in the quick view', () => {
//     cy.wait(500); // Add a short wait if necessary

//     // Wait for the expected content within the .quickview-header element
//     cy.get('.quickview-header')
//       .should('be.visible')
//       .should('contain', 'Running');

//     // Verify the presence of running container names
//     cy.get('.quickview-list').contains('Container1').should('exist');
//     cy.get('.quickview-list').contains('Container2').should('exist');
//   });

// it('should navigate to the container when the GoTo button is clicked', () => {
//   // Stub the necessary API endpoint for navigating to a container
//   cy.intercept('GET', '/api/container/:id', {});

//   // Click the GoTo button for a running container
//   cy.get('.quickview-list').contains('Container1').parent().find('.goto-button').click();

//   // Verify the navigation to the container endpoint
//   cy.url().should('include', '/container/Container1');
// });
