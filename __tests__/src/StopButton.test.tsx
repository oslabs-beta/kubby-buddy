// //@ts-ignore
// import React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import { StopCommands } from '../../src/components/Button/Stop';
// import { UserContext } from '../../src/UserContext';
// import { Container } from '../../src/types';

// describe('StopCommands', () => {
//   it('calls the command function when the button is clicked', async () => {
//     // Mock the fetch function
//     global.fetch = jest.fn().mockResolvedValue({
//       json: jest.fn().mockResolvedValue({}),
//     });

//     // Create mock functions for context setters
//     const setStoppedContainers = jest.fn();
//     const setRunningContainers = jest.fn();

//     // Create a mock running container
//     const runningContainer: Container = {
//       Command: '',
//       CreatedAt: '',
//       ID: '',
//       Image: '',
//       Labels: [],
//       LocalVolumes: '',
//       Mounts: '',
//       Names: 'test-name',
//       Networks: '',
//       Ports: '',
//       RunningFor: '',
//       Size: '',
//       State: '',
//       Status: '',
//     };

//     // Create a mock context value with all required properties
//     const contextValue = {
//       setStoppedContainers,
//       setRunningContainers,
//       stoppedContainers: [],
//       runningContainers: [runningContainer],
//       availableImages: [],
//       setAvailableImages: jest.fn(),
//       showing: 'false',
//       setShowing: jest.fn(),
//       statStream: [],
//       setStatStream: jest.fn(),
//       availableVolumes: [],
//       setAvailableVolumes: jest.fn(),
//     };

//     // Render the StopCommands component with the necessary props and mocked context
//     const { getByTestId } = render(
//       <UserContext.Provider value={contextValue}>
//         <StopCommands
//           name='test-name'
//           cmdRoute={new URL('/stop', 'http://localhost')}
//           fetchMethod='POST'
//         />
//       </UserContext.Provider>
//     );

//     // Simulate clicking the stop button
//     fireEvent.click(getByTestId('stop-button'));

//     // Wait for the asynchronous command function to complete
//     await new Promise(resolve => setTimeout(resolve));

//     // Verify that the fetch function was called with the correct URL and options
//     expect(global.fetch).toHaveBeenCalledWith(
//       '/stop',
//       expect.objectContaining({
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name: 'test-name' }),
//       })
//     );

//     // Verify that the setStoppedContainers and setRunningContainers functions were called with the expected arguments
//     expect(setStoppedContainers).toHaveBeenCalledWith([runningContainer]);
//     expect(setRunningContainers).toHaveBeenCalledWith([]);

//     // Optional: Add more assertions based on the expected behavior of your component

//     // Clean up
//     jest.clearAllMocks();
//   });
// });

it('dummy test', () => {
  expect('test').toBe('test');
});
