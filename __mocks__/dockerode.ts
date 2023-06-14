import td from "testdouble";
const mockContainer = {
  exec: td.function(),
  start: td.function(),
  stop: td.function(),
  remove: td.function(),
};

const mockDocker = {
  createContainer: td.function(),
};
td.when(mockDocker.createContainer(td.matchers.anything())).thenReturn(
  mockContainer
);

module.exports = mockDocker;
