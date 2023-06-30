// import { Docker } from 'node-docker-api';
import express from 'express';
import containerRouter from '../../server/routes/containerRoutes';
// import request from 'supertest';
import { Server } from 'http';

import { execSync } from 'child_process';
import {
  cmdGetAllRunningContainers,
  cmdGetAllRunningContainersNames,
  cmdStopASpecificContainer,
  cmdStartASpecificContainer,
  cmdPruneStoppedContainers,
  cmdGetSpecificLog,
  cmdRemoveSpecificContainer,
  parseOutputContainers,
  parseOutputContainersNames,
  parseOutputStartStop,
  parseOutputPruneStoppedContainers,
  transformLogs,
  parseOutputRemoveSpecificContainer,
} from '../../server/controllers/containerController';

const app = express();
app.use('/', containerRouter);
let server: Server;

beforeEach(async () => {
  server = app.listen(3200); // Start the server

  // Start the containers
  execSync(
    'docker exec -i DIND sh -c "docker run -d --name=my-container alpine sleep 3600 && docker run -d --name=my-container2 alpine sleep 3600"'
  );

  // Delay for a certain amount of time to allow the containers to start
  // await new Promise((resolve) => setTimeout(resolve, 3000));
});

afterEach(async () => {
  server.close();

  execSync(
    `docker exec -i DIND sh -c 'docker rm -f my-container; docker rm -f my-container2'`
  );
});

describe('Docker Tests', () => {
  test('GET /all-active-containers should return an array of containers', async () => {
    // Get the list of active containers within the DIND container
    execSync(`docker exec -i DIND sh -c "docker stop my-container"`, {
      stdio: 'pipe',
    });
    // console.log('TEST1', test1.toString());
    // Get the list of running containers
    const dindContainersResponse = execSync(
      `docker exec -i DIND sh -c "${cmdGetAllRunningContainers}"`,
      {
        stdio: 'pipe',
      }
    );

    const dindContainers = parseOutputContainers(dindContainersResponse);
    // console.log(
    //   'dindContainers:',
    //   parseOutputContainers(dindContainersResponse)
    // );

    // Make sure the my-container is running within the DIND container
    expect(
      dindContainers.some(
        (container) =>
          container.Names === 'my-container' &&
          container.Status.includes('Exited')
      )
    ).toBeTruthy();
    expect(
      dindContainers.some(
        (container) =>
          container.Names === 'my-container2' && container.Status.includes('Up')
      )
    ).toBeTruthy();
    expect(dindContainers).toHaveLength(2);
    expect(
      dindContainers.some((container) => container.name === 'hungry_khorana')
    ).toBeFalsy();
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });

  test('GET /all-active-containers-names should return an array of containers', async () => {
    // Get the list of active containers within the DIND container
    const dindContainersResponse = execSync(
      `docker exec -i DIND sh -c "${cmdGetAllRunningContainersNames}"`,
      { stdio: 'pipe' } // Added option to capture the command output
    );

    // console.log('dindContainersResponse:', dindContainersResponse.toString());

    const dindContainers = parseOutputContainersNames(dindContainersResponse);
    // console.log('dindContainers:', parseOutputContainersNames(dindContainersResponse));

    // Make sure the my-container is running within the DIND container
    expect(
      dindContainers.some((container) => container.name === 'my-container')
    ).toBeTruthy();
    expect(
      dindContainers.some((container) => container.name === 'my-container2')
    ).toBeTruthy();
    expect(dindContainers).toHaveLength(2);
    expect(
      dindContainers.some((container) => container.name === 'hungry_khorana')
    ).toBeFalsy();
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });

  test('POST /stop should stop a specific container', async () => {
    const dindContainersResponse = execSync(
      `docker exec -i DIND sh -c "${cmdStopASpecificContainer} my-container2"`,
      { stdio: 'pipe' } // Added option to capture the command output
    );

    // console.log('dindContainersResponse:', dindContainersResponse.toString());

    const dindContainers = parseOutputStartStop(dindContainersResponse);
    // console.log('dindContainers:', parseOutputStartStop(dindContainersResponse));

    // Make sure the my-container is running within the DIND container
    expect(
      dindContainers.some((container) => container.message === 'my-container')
    ).toBeFalsy();
    expect(
      dindContainers.some((container) => container.message === 'my-container2')
    ).toBeTruthy();
    expect(dindContainers).toHaveLength(1);
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });

  test('POST /start should start a specific container', async () => {
    execSync(
      `docker exec -i DIND sh -c "docker stop my-container my-container2"`,
      {
        stdio: 'pipe',
      }
    );
    // console.log(
    //   'TEST1',
    //   execSync(`docker exec -i DIND sh -c "docker ps"`).toString()
    // );
    const dindContainersResponse = execSync(
      `docker exec -i DIND sh -c "${cmdStartASpecificContainer} my-container"`,
      { stdio: 'pipe' } // Added option to capture the command output
    );
    // console.log(
    //   'TEST2',
    //   execSync(`docker exec -i DIND sh -c "docker ps"`).toString()
    // );

    const dindContainers = parseOutputStartStop(dindContainersResponse);

    // // Make sure the my-container is running within the DIND container
    expect(
      dindContainers.some((container) => container.message === 'my-container')
    ).toBeTruthy();
    expect(
      dindContainers.some((container) => container.message === 'my-container2')
    ).toBeFalsy();
    expect(dindContainers).toHaveLength(1);
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });

  test('DELETE /prune-stopped-containers should delete all stopped containers', async () => {
    execSync(`docker exec -i DIND sh -c "docker stop my-container"`, {
      stdio: 'pipe',
    });
    // console.log(
    //   'TEST1',
    //   execSync(`docker exec -i DIND sh -c "docker ps -a"`).toString()
    // );
    const dindContainersResponse = execSync(
      `docker exec -i DIND sh -c "${cmdPruneStoppedContainers}"`,
      { stdio: 'pipe' } // Added option to capture the command output
    );
    // console.log(
    //   'TEST2',
    //   execSync(`docker exec -i DIND sh -c "docker ps -a"`).toString()
    // );

    const dindContainers = parseOutputPruneStoppedContainers(
      dindContainersResponse
    );
    // console.log('DIND CONTAINERS', dindContainers);
    // Make sure the my-container is running within the DIND container
    expect(
      dindContainers.some((container) => container['Deleted Containers:'])
    ).toBeTruthy();
    expect(
      dindContainers.some(
        (container) =>
          container['Deleted Containers:'].length > 0 &&
          container['Total reclaimed space:'][0].includes(
            'Total reclaimed space'
          )
      )
    ).toBeTruthy();
    expect(dindContainers).toHaveLength(1);
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });

  test('GET /logs get logs for a specific container', async () => {
    const dindContainersResponse = execSync(
      `docker exec -i DIND sh -c "${cmdGetSpecificLog} my-container2"`,
      { stdio: 'pipe' } // Added option to capture the command output
    );

    const dindContainers = transformLogs(dindContainersResponse);
    // console.log('DIND CONTAINERS', dindContainers);

    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });

  test('DELETE /remove-specific-container removes stopped container by name', async () => {
    execSync(`docker exec -i DIND sh -c "docker stop my-container2"`, {
      stdio: 'pipe',
    });
    // console.log(
    //   'TEST1',
    //   execSync(`docker exec -i DIND sh -c "docker ps -a"`).toString()
    // );
    const dindContainersResponse = execSync(
      `docker exec -i DIND sh -c "${cmdRemoveSpecificContainer} my-container2"`,
      { stdio: 'pipe' } // Added option to capture the command output
    );
    // console.log(
    //   'TEST2',
    //   execSync(`docker exec -i DIND sh -c "docker ps -a"`).toString()
    // );

    const dindContainers = parseOutputRemoveSpecificContainer(
      dindContainersResponse
    );
    // console.log('TEST3', dindContainers);

    expect(dindContainers.some((container) => container.message)).toBeTruthy();
    expect(
      dindContainers.some((container) => container.message === 'my-container2')
    ).toBeTruthy();
    expect(
      dindContainers.some((container) => container.message === 'my-container')
    ).toBeFalsy();
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });
});
