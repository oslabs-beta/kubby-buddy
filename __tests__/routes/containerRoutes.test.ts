import td from 'testdouble';
import mockDocker from '../../__mocks__/dockerode';
import request from 'supertest';
import app from '../../server/server';

td.replace('dockerode', mockDocker);

describe('Container routes', () => {
  it('Should start a container', () => {
    request(app).post('/container/start').send();
  });
});
