import express from 'express';
import containerRouter from '../../server/routes/containerRoutes';
import { Server } from 'http';
import { execSync } from 'child_process';

const app = express();
app.use('/', containerRouter);
let server: Server;
import {
  cmdGetAllImages,
  cmdRunContainerFromImage,
  cmdRunContainerFromImageName,
  cmdPruneUnusedImages,
  cmdRemoveSingleImage,
  parseOutputContainers,
  parseOutputGetAllImages,
  setRmOption,
  setVolOption,
  // getPortMapping,
  parseOutputrunContainerFromImage,
  parseOutputPruneUnusedImages,
  parseOutputRemoveSingleImage,
} from '../../server/controllers/imageController';

beforeEach(async () => {
  server = app.listen(9001); // Start the server

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
    execSync(`docker exec -i image_test sh -c "docker pull hello-world"`, {
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

  test('GET /run-images should run a single container from an image', async () => {
    execSync(
      `docker exec -i image_test sh -c "docker pull hello-world; docker pull nginx"`,
      {
        stdio: 'pipe',
      }
    );

    const dindContainersResponse = execSync(
      `docker exec -i image_test sh -c "${cmdRunContainerFromImage} ${setRmOption(
        'yes'
      )} ${setVolOption(
        'TEST1',
        '/App/user'
      )} -p 9999:80 ${cmdRunContainerFromImageName} ${'TESTCONTAINER'} ${'nginx'}"`,
      {
        stdio: 'pipe',
      }
    );
    const dindContainers = parseOutputrunContainerFromImage(
      dindContainersResponse
    );
    console.log('dindContainers:', dindContainers);
    const dindContainersList = parseOutputContainers(
      execSync(
        `docker exec -i image_test sh -c "docker ps -a --format '{{json .}}'"`,
        {
          stdio: 'pipe',
        }
      )
    );

    // console.log('running containers', dindContainersList);

    expect(dindContainers.some((container) => container.message)).toBeTruthy();
    expect(dindContainers).toHaveLength(1);
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');

    expect(
      dindContainersList.some((container) => container.Image === 'nginx')
    ).toBeTruthy();
    expect(
      dindContainersList.some((container) => container.LocalVolumes === '1')
    ).toBeTruthy();
    expect(
      dindContainersList.some((container) => container.Mounts === 'TEST1')
    ).toBeTruthy();
    expect(
      dindContainersList.some(
        (container) => container.Names === 'TESTCONTAINER'
      )
    ).toBeTruthy();
    expect(
      dindContainersList.some(
        (container) => container.Ports === '0.0.0.0:9999->80/tcp'
      )
    ).toBeTruthy();
    expect(dindContainersList).toHaveLength(3);
    expect(
      dindContainersList.some(
        (container) => container.Names === 'hungry_khorana'
      )
    ).toBeFalsy();
    expect(Array.isArray(dindContainersList)).toBeTruthy();
    expect(dindContainersList.length).toBeGreaterThan(0);
    expect(typeof dindContainersList[0]).toBe('object');
  });

  test('DELETE /prune-all-unused should delete all unused images', async () => {
    // Pull 'hello-world' image into image_test container
    execSync(`docker exec -i image_test sh -c "docker pull hello-world"`, {
      stdio: 'pipe',
    });
    // console.log('TEST1', test1.toString());
    // Get the list of running containers
    const dindContainersResponse = execSync(
      `docker exec -i image_test sh -c "${cmdPruneUnusedImages}"`,
      {
        stdio: 'pipe',
      }
    );
    // const dindContainersResponse = parseOutputGetAllImages(dindContainers);

    const dindContainers = parseOutputPruneUnusedImages(dindContainersResponse);
    console.log('dindContainers', dindContainers);

    expect(
      dindContainers.some((container) => container['Deleted Images:'])
    ).toBeTruthy();
    expect(
      dindContainers.some((container) =>
        container['Deleted Images:'].includes('untagged: hello-world:latest')
      )
    ).toBeTruthy();
    expect(
      dindContainers.some((container) => container['Total reclaimed space:'])
    ).toBeTruthy();
    expect(dindContainers).toHaveLength(1);
    expect(
      dindContainers.some((container) =>
        container['Deleted Images:'].includes('untagged: mongo:latest')
      )
    ).toBeFalsy();
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });

  test('DELETE /remove-image-by-name should remove image by name', async () => {
    // Pull 'hello-world' image into image_test container
    execSync(`docker exec -i image_test sh -c "docker pull hello-world"`, {
      stdio: 'pipe',
    });
    // console.log('TEST1', test1.toString());
    // Get the list of running containers
    const dindContainersResponse = execSync(
      `docker exec -i image_test sh -c "${cmdRemoveSingleImage} hello-world"`,
      {
        stdio: 'pipe',
      }
    );
    // const dindContainersResponse = parseOutputGetAllImages(dindContainers);

    const dindContainers = parseOutputRemoveSingleImage(dindContainersResponse);
    console.log('dindContainers', dindContainers);

    expect(
      dindContainers.some((container) => container['Deleted'])
    ).toBeTruthy();
    expect(
      dindContainers.some((container) =>
        container.Deleted.includes('Untagged: hello-world:latest')
      )
    ).toBeTruthy();
    expect(dindContainers).toHaveLength(1);
    expect(
      dindContainers.some((container) =>
        container.Deleted.includes('Untagged: mongo:latest')
      )
    ).toBeFalsy();
    expect(Array.isArray(dindContainers)).toBeTruthy();
    expect(dindContainers.length).toBeGreaterThan(0);
    expect(typeof dindContainers[0]).toBe('object');
  });
});
