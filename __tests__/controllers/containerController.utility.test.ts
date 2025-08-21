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

describe('containerController utility function tests', () => {
  describe('parseOutputContainers tests', () => {
    test('should handle empty input', () => {
      const result = parseOutputContainers('');
      expect(result).toEqual([]);
    });

    test('should handle single line JSON', () => {
      const input = '{"Names":"container1","Image":"nginx","Status":"Up"}';
      const result = parseOutputContainers(input);
      expect(result).toEqual([
        { Names: 'container1', Image: 'nginx', Status: 'Up' },
      ]);
    });

    test('should handle multiple lines of JSON', () => {
      const input =
        '{"Names":"container1","Image":"nginx"}\n{"Names":"container2","Image":"alpine"}';
      const result = parseOutputContainers(input);
      expect(result).toHaveLength(2);
      expect(result[0].Names).toBe('container1');
      expect(result[1].Names).toBe('container2');
    });

    test('should handle Buffer input', () => {
      const input = Buffer.from('{"Names":"container1","Image":"nginx"}');
      const result = parseOutputContainers(input);
      expect(result).toEqual([{ Names: 'container1', Image: 'nginx' }]);
    });

    test('should handle malformed JSON gracefully', () => {
      expect(() => {
        parseOutputContainers('invalid json');
      }).toThrow();
    });
  });

  describe('parseOutputContainersNames tests', () => {
    test('should handle empty input', () => {
      const result = parseOutputContainersNames('');
      expect(result).toEqual([]);
    });

    test('should handle single line JSON', () => {
      const input = '"container1"';
      const result = parseOutputContainersNames(input);
      expect(result).toEqual([{ name: 'container1' }]);
    });

    test('should handle multiple lines of JSON', () => {
      const input = '"container1"\n"container2"';
      const result = parseOutputContainersNames(input);
      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('container1');
      expect(result[1].name).toBe('container2');
    });

    test('should handle Buffer input', () => {
      const input = Buffer.from('"container1"');
      const result = parseOutputContainersNames(input);
      expect(result).toEqual([{ name: 'container1' }]);
    });
  });

  describe('parseOutputStartStop tests', () => {
    test('should handle empty input', () => {
      const result = parseOutputStartStop('');
      expect(result).toEqual([{ message: '' }]);
    });

    test('should handle string input', () => {
      const input = 'container123abc';
      const result = parseOutputStartStop(input);
      expect(result).toEqual([{ message: 'container123abc' }]);
    });

    test('should handle Buffer input', () => {
      const input = Buffer.from('container123abc');
      const result = parseOutputStartStop(input);
      expect(result).toEqual([{ message: 'container123abc' }]);
    });

    test('should handle whitespace input', () => {
      const input = '   ';
      const result = parseOutputStartStop(input);
      expect(result).toEqual([{ message: '' }]);
    });
  });

  describe('parseOutputPruneStoppedContainers tests', () => {
    test('should handle empty input', () => {
      const result = parseOutputPruneStoppedContainers('');
      expect(result).toEqual([
        { 'Deleted Containers:': [], 'Total reclaimed space:': [] },
      ]);
    });

    test('should handle input with deleted containers', () => {
      const input =
        'Deleted Containers:\ndeleted: container1\ndeleted: container2\nTotal reclaimed space: 1.2GB';
      const result = parseOutputPruneStoppedContainers(input);
      expect(result[0]['Deleted Containers:']).toEqual([
        'deleted: container1',
        'deleted: container2',
      ]);
    });

    test('should handle input with no deleted containers', () => {
      const input = 'Total reclaimed space: 0B';
      const result = parseOutputPruneStoppedContainers(input);
      expect(result[0]['Deleted Containers:']).toEqual([]);
    });

    test('should handle Buffer input', () => {
      const input = Buffer.from(
        'Deleted Containers:\ndeleted: container1\nTotal reclaimed space: 0B'
      );
      const result = parseOutputPruneStoppedContainers(input);
      expect(result[0]['Deleted Containers:']).toEqual(['deleted: container1']);
    });
  });

  describe('transformLogs tests', () => {
    test('should handle empty input', () => {
      const result = transformLogs('');
      expect(result).toEqual([{ message: '' }]);
    });

    test('should handle string input', () => {
      const input = 'log line 1\nlog line 2';
      const result = transformLogs(input);
      expect(result).toEqual([
        { message: 'log line 1' },
        { message: 'log line 2' },
      ]);
    });

    test('should handle Buffer input', () => {
      const input = Buffer.from('log line 1\nlog line 2');
      const result = transformLogs(input);
      expect(result).toEqual([
        { message: 'log line 1' },
        { message: 'log line 2' },
      ]);
    });

    test('should handle single line input', () => {
      const input = 'single log line';
      const result = transformLogs(input);
      expect(result).toEqual([{ message: 'single log line' }]);
    });
  });

  describe('parseOutputRemoveSpecificContainer tests', () => {
    test('should handle empty input', () => {
      const result = parseOutputRemoveSpecificContainer('');
      expect(result).toEqual([{ message: '' }]);
    });

    test('should handle single line input', () => {
      const input = 'deleted: container1';
      const result = parseOutputRemoveSpecificContainer(input);
      expect(result[0].message).toEqual('deleted: container1');
    });

    test('should handle multiple lines input', () => {
      const input = 'deleted: container1\ndeleted: container2';
      const result = parseOutputRemoveSpecificContainer(input);
      expect(result[0].message).toEqual(
        'deleted: container1\ndeleted: container2'
      );
    });

    test('should handle Buffer input', () => {
      const input = Buffer.from('deleted: container1');
      const result = parseOutputRemoveSpecificContainer(input);
      expect(result[0].message).toEqual('deleted: container1');
    });
  });

  describe('Command string tests', () => {
    test('cmdGetAllRunningContainers should be a valid command', () => {
      expect(typeof cmdGetAllRunningContainers).toBe('string');
      expect(cmdGetAllRunningContainers).toContain('docker');
    });

    test('cmdGetAllRunningContainersNames should be a valid command', () => {
      expect(typeof cmdGetAllRunningContainersNames).toBe('string');
      expect(cmdGetAllRunningContainersNames).toContain('docker');
    });

    test('cmdStopASpecificContainer should be a valid command', () => {
      expect(typeof cmdStopASpecificContainer).toBe('string');
      expect(cmdStopASpecificContainer).toContain('docker');
    });

    test('cmdStartASpecificContainer should be a valid command', () => {
      expect(typeof cmdStartASpecificContainer).toBe('string');
      expect(cmdStartASpecificContainer).toContain('docker');
    });

    test('cmdPruneStoppedContainers should be a valid command', () => {
      expect(typeof cmdPruneStoppedContainers).toBe('string');
      expect(cmdPruneStoppedContainers).toContain('docker');
    });

    test('cmdGetSpecificLog should be a valid command', () => {
      expect(typeof cmdGetSpecificLog).toBe('string');
      expect(cmdGetSpecificLog).toContain('docker');
    });

    test('cmdRemoveSpecificContainer should be a valid command', () => {
      expect(typeof cmdRemoveSpecificContainer).toBe('string');
      expect(cmdRemoveSpecificContainer).toContain('docker');
    });
  });
});
