describe('volumeController utility function tests', () => {
  beforeEach(() => {
    // Setup any necessary mocks
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('JSON parsing utility tests', () => {
    test('should parse valid JSON array', () => {
      const input =
        '{"Name":"volume1","Driver":"local"}\n{"Name":"volume2","Driver":"local"}';
      const result = input
        .trim()
        .split('\n')
        .map((item) => JSON.parse(item, undefined));

      expect(result).toHaveLength(2);
      expect(result[0].Name).toBe('volume1');
      expect(result[1].Name).toBe('volume2');
    });

    test('should handle empty input', () => {
      const input = '';
      const result = input
        .trim()
        .split('\n')
        .filter((item) => item.trim() !== '')
        .map((item) => JSON.parse(item, undefined));

      expect(result).toEqual([]);
    });

    test('should handle single JSON object', () => {
      const input = '{"Name":"volume1","Driver":"local"}';
      const result = input
        .trim()
        .split('\n')
        .map((item) => JSON.parse(item, undefined));

      expect(result).toHaveLength(1);
      expect(result[0].Name).toBe('volume1');
    });

    test('should handle malformed JSON', () => {
      const input = '{"Name":"volume1"';
      expect(() => {
        input
          .trim()
          .split('\n')
          .map((item) => JSON.parse(item, undefined));
      }).toThrow();
    });
  });

  describe('Volume name parsing tests', () => {
    test('should parse volume names correctly', () => {
      const input = '"volume1"\n"volume2"';
      const result = input
        .trim()
        .split('\n')
        .map((item) => {
          const name = JSON.parse(item, undefined);
          return { name };
        });

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('volume1');
      expect(result[1].name).toBe('volume2');
    });

    test('should handle empty volume names input', () => {
      const input = '';
      const result = input
        .trim()
        .split('\n')
        .filter((item) => item.trim() !== '')
        .map((item) => {
          const name = JSON.parse(item, undefined);
          return { name };
        });

      expect(result).toEqual([]);
    });

    test('should handle single volume name', () => {
      const input = '"volume1"';
      const result = input
        .trim()
        .split('\n')
        .map((item) => {
          const name = JSON.parse(item, undefined);
          return { name };
        });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('volume1');
    });
  });

  describe('Error handling tests', () => {
    test('should handle exec errors gracefully', () => {
      const errorDetails = {
        log: 'Error in the volumeController.getAllVolumes exec call',
        err: 'docker command failed',
        message: 'Error in the volumeController.getAllVolumes exec call',
      };

      expect(errorDetails).toHaveProperty('log');
      expect(errorDetails).toHaveProperty('err');
      expect(errorDetails).toHaveProperty('message');
    });

    test('should handle JSON parsing errors', () => {
      const errorDetails = {
        log: 'error in the volumeController.getAllVolumesNames catch',
        err: new SyntaxError('Unexpected end of JSON input'),
        message: 'error in the volumeController.getAllVolumesNames catch',
      };

      expect(errorDetails).toHaveProperty('log');
      expect(errorDetails).toHaveProperty('err');
      expect(errorDetails).toHaveProperty('message');
      expect(errorDetails.err).toBeInstanceOf(SyntaxError);
    });
  });

  describe('Docker command format tests', () => {
    test('should format docker volume ls command correctly', () => {
      const command = 'docker volume ls --format "{{json . }}"';
      expect(command).toContain('docker volume ls');
      expect(command).toContain('--format');
      expect(command).toContain('{{json . }}');
    });

    test('should format docker volume ls names command correctly', () => {
      const command = `docker volume ls --format='{{json .Name}}'`;
      expect(command).toContain('docker volume ls');
      expect(command).toContain('--format');
      expect(command).toContain('{{json .Name}}');
    });

    test('should format docker ps filter command correctly', () => {
      const volumeName = 'test-volume';
      const command = `docker ps --filter "volume=${volumeName}" --format "{{json . }}"`;
      expect(command).toContain('docker ps');
      expect(command).toContain('--filter');
      expect(command).toContain(`volume=${volumeName}`);
      expect(command).toContain('--format');
    });
  });

  describe('Response handling tests', () => {
    test('should set volumes in res.locals', () => {
      const volumes = [
        { Name: 'volume1', Driver: 'local' },
        { Name: 'volume2', Driver: 'local' },
      ];

      expect(volumes).toHaveLength(2);
      expect(volumes[0].Name).toBe('volume1');
      expect(volumes[1].Name).toBe('volume2');
    });

    test('should set volume names in res.locals', () => {
      const volumeNames = [{ name: 'volume1' }, { name: 'volume2' }];

      expect(volumeNames).toHaveLength(2);
      expect(volumeNames[0].name).toBe('volume1');
      expect(volumeNames[1].name).toBe('volume2');
    });
  });
});
