import express from 'express';
import containerRouter from '../../server/routes/containerRoutes';
import { Server } from 'http';
import { execSync } from 'child_process';

const app = express();
app.use('/', containerRouter);
let server: Server;
import {
  cmdGetAllImages,
  parseOutputGetAllImages,
} from '../../server/controllers/imageController';

beforeEach(async () => {
  server = app.listen(3300); // Start the server

  // Start the containers
  execSync(
    'docker exec -i image_test sh -c "docker run -d --name=my-container alpine sleep 3600 && docker run -d --name=my-container2 alpine sleep 3600"'
  );

  // Delay for a certain amount of time to allow the containers to start
  // await new Promise((resolve) => setTimeout(resolve, 3000));
});

afterEach(async () => {
  server.close();

  execSync(
    `docker exec -i image_test sh -c 'docker rm -f my-container; docker rm -f my-container2'`
  );
});

describe('imageController tests', () => {
  test('GET /all-images should get route to retrieve all images', async () => {
    // Pull 'hello-world' image into image_test container
    execSync(`docker exec -i image_test sh -c "docker pull hello-world "`, {
      stdio: 'pipe',
    });
    // console.log('TEST1', test1.toString());
    // Get the list of running containers
    const dindContainersResponse = execSync(
      `docker exec -i image_test sh -c "${cmdGetAllImages}"`,
      {
        stdio: 'pipe',
      }
    );
    const dindContainers = parseOutputGetAllImages(dindContainersResponse);
    // console.log('dindContainers:', dindContainers);

    // Make sure the my-container is running within the image_test container
    expect(
      dindContainers.some((container) => container.Repository === 'alpine')
    ).toBeTruthy();
    expect(
      dindContainers.some((container) => container.Repository === 'hello-world')
    ).toBeTruthy();
    expect(dindContainers).toHaveLength(2);
    expect(
      dindContainers.some((container) => container.name === 'hungry_khorana')
    ).toBeFalsy();
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });
});
