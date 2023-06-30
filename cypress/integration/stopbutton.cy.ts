describe('StopCommands', () => {
  it('should stop the container when the stop button is clicked', () => {
    cy.window().then((win) => {
      const setStoppedContainersStub = cy.stub().as('setStoppedContainers');
      const setRunningContainersStub = cy.stub().as('setRunningContainers');
      const runningContainers = [
        { Names: 'Container1' },
        { Names: 'Container2' },
        { Names: 'Container3' },
      ];
      //@ts-ignore
      win.UserContext = {
        setStoppedContainers: setStoppedContainersStub,
        setRunningContainers: setRunningContainersStub,
        stoppedContainers: [],
        runningContainers,
      };
    });

    cy.contains('button', 'stop').should('be.visible').click();

    cy.wait('@stopRequest').then((interception) => {
      expect(interception.request.body).to.deep.equal({ name: 'Container1' });
    });

    cy.get('@setStoppedContainers').should('be.calledWith', [
      { Names: 'Container1' },
    ]);
    cy.get('@setRunningContainers').should('be.calledWith', [
      { Names: 'Container2' },
      { Names: 'Container3' },
    ]);
  });
});
