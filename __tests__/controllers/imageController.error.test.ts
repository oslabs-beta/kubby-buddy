import express from 'express';
import containerRouter from '../../server/routes/containerRoutes';
import { Server } from 'http';
import {
  setRmOption,
  setVolOption,
  getPortMapping,
  parseOutputGetAllImages,
  parseOutputPruneUnusedImages,
  parseOutputRemoveSingleImage,
  parseOutputrunContainerFromImage,
  parseOutputContainers,
} from '../../server/controllers/imageController';

const app = express();
app.use('/', containerRouter);
let server: Server;

beforeAll(async () => {
  server = app.listen(9002);
});

afterAll(async () => {
  server.close();
});

describe('imageController utility function tests', () => {
  test('setRmOption should return empty string for non-yes values', () => {
    expect(setRmOption('no')).toBe('');
    expect(setRmOption('')).toBe('');
    expect(setRmOption('maybe')).toBe('');
  });

  test('setRmOption should return --rm for yes value', () => {
    expect(setRmOption('yes')).toBe('--rm');
  });

  test('setVolOption should handle empty volume name', () => {
    expect(setVolOption('', '/some/path')).toBe('');
    expect(setVolOption('   ', '/some/path')).toBe('');
  });

  test('setVolOption should handle empty file directory', () => {
    expect(setVolOption('myvolume', '')).toBe('-v myvolume:/App');
    expect(setVolOption('myvolume', '   ')).toBe('-v myvolume:/App');
  });

  test('setVolOption should handle both volume name and directory', () => {
    expect(setVolOption('myvolume', '/custom/path')).toBe(
      '-v myvolume:/custom/path'
    );
  });

  test('getPortMapping should return empty string for empty port', async () => {
    const result = await getPortMapping('', 'nginx');
    expect(result).toBe('');
  });

  test('getPortMapping should return empty string for whitespace-only port', async () => {
    const result = await getPortMapping('   ', 'nginx');
    expect(result).toBe('');
  });

  test('parseOutputGetAllImages should handle empty input', () => {
    const result = parseOutputGetAllImages('');
    expect(result).toEqual([]);
  });

  test('parseOutputGetAllImages should handle single line JSON', () => {
    const input = '{"Repository":"test","Tag":"latest"}';
    const result = parseOutputGetAllImages(input);
    expect(result).toEqual([{ Repository: 'test', Tag: 'latest' }]);
  });

  test('parseOutputContainers should handle multiple lines of JSON', () => {
    const input =
      '{"Names":"container1","Image":"nginx"}\n{"Names":"container2","Image":"alpine"}';
    const result = parseOutputContainers(input);
    expect(result).toHaveLength(2);
    expect(result[0].Names).toBe('container1');
    expect(result[1].Names).toBe('container2');
  });

  test('parseOutputrunContainerFromImage should return array with message', () => {
    const input = 'container123abc';
    const result = parseOutputrunContainerFromImage(input);
    expect(result).toEqual([{ message: 'container123abc' }]);
  });

  test('parseOutputrunContainerFromImage should handle Buffer input', () => {
    const input = Buffer.from('container123abc');
    const result = parseOutputrunContainerFromImage(input);
    expect(result).toEqual([{ message: 'container123abc' }]);
  });

  test('parseOutputPruneUnusedImages should handle no deleted images', () => {
    const input = 'Total reclaimed space: 0B';
    const result = parseOutputPruneUnusedImages(input);
    expect(result[0]['Deleted Images:']).toEqual([]);
    expect(result[0]['Total reclaimed space:']).toContain(
      'Total reclaimed space: 0B'
    );
  });

  test('parseOutputRemoveSingleImage should handle multiline output', () => {
    const input = 'Untagged: hello-world:latest\nDeleted: sha256:abc123';
    const result = parseOutputRemoveSingleImage(input);
    expect(result[0].Deleted).toEqual([
      'Untagged: hello-world:latest',
      'Deleted: sha256:abc123',
    ]);
  });
});

describe('imageController additional utility function tests', () => {
  test('setVolOption should handle null/undefined inputs', () => {
    expect(setVolOption(null as any, '/some/path')).toBe('');
    expect(setVolOption(undefined as any, '/some/path')).toBe('');
    expect(setVolOption('myvolume', null as any)).toBe('-v myvolume:/App');
    expect(setVolOption('myvolume', undefined as any)).toBe('-v myvolume:/App');
  });

  test('setRmOption should handle null/undefined inputs', () => {
    expect(setRmOption(null as any)).toBe('');
    expect(setRmOption(undefined as any)).toBe('');
  });

  test('parseOutputGetAllImages should handle multiple lines of JSON', () => {
    const input =
      '{"Repository":"test1","Tag":"latest"}\n{"Repository":"test2","Tag":"v1.0"}';
    const result = parseOutputGetAllImages(input);
    expect(result).toHaveLength(2);
    expect(result[0].Repository).toBe('test1');
    expect(result[1].Repository).toBe('test2');
  });

  test('parseOutputGetAllImages should handle Buffer input', () => {
    const input = Buffer.from('{"Repository":"test","Tag":"latest"}');
    const result = parseOutputGetAllImages(input);
    expect(result).toEqual([{ Repository: 'test', Tag: 'latest' }]);
  });

  test('parseOutputrunContainerFromImage should handle empty input', () => {
    const result = parseOutputrunContainerFromImage('');
    expect(result).toEqual([{ message: '' }]);
  });

  test('parseOutputrunContainerFromImage should handle whitespace input', () => {
    const result = parseOutputrunContainerFromImage('   ');
    expect(result).toEqual([{ message: '' }]);
  });

  test('parseOutputPruneUnusedImages should handle input with deleted images', () => {
    const input =
      'Deleted Images:\ndeleted: sha256:abc123\ndeleted: sha256:def456\nTotal reclaimed space: 1.2GB';
    const result = parseOutputPruneUnusedImages(input);
    expect(result[0]['Deleted Images:']).toEqual([
      'deleted: sha256:abc123',
      'deleted: sha256:def456',
    ]);
    expect(result[0]['Total reclaimed space:']).toContain(
      'Total reclaimed space: 1.2GB'
    );
  });

  test('parseOutputPruneUnusedImages should handle input without deleted images section', () => {
    const input = 'Total reclaimed space: 0B';
    const result = parseOutputPruneUnusedImages(input);
    expect(result[0]['Deleted Images:']).toEqual([]);
    expect(result[0]['Total reclaimed space:']).toContain(
      'Total reclaimed space: 0B'
    );
  });

  test('parseOutputRemoveSingleImage should handle single line output', () => {
    const input = 'Untagged: hello-world:latest';
    const result = parseOutputRemoveSingleImage(input);
    expect(result[0].Deleted).toEqual(['Untagged: hello-world:latest']);
  });

  test('parseOutputRemoveSingleImage should handle empty input', () => {
    const input = '';
    const result = parseOutputRemoveSingleImage(input);
    expect(result[0].Deleted).toEqual([]);
  });

  test('parseOutputRemoveSingleImage should handle Buffer input', () => {
    const input = Buffer.from(
      'Untagged: hello-world:latest\nDeleted: sha256:abc123'
    );
    const result = parseOutputRemoveSingleImage(input);
    expect(result[0].Deleted).toEqual([
      'Untagged: hello-world:latest',
      'Deleted: sha256:abc123',
    ]);
  });
});

describe('imageController error handling tests', () => {
  test('parseOutputGetAllImages should handle malformed JSON gracefully', () => {
    expect(() => {
      parseOutputGetAllImages('invalid json');
    }).toThrow();
  });

  test('parseOutputContainers should handle malformed JSON gracefully', () => {
    expect(() => {
      parseOutputContainers('invalid json');
    }).toThrow();
  });

  test('parseOutputGetAllImages should handle partial JSON', () => {
    expect(() => {
      parseOutputGetAllImages('{"Repository":"test"');
    }).toThrow();
  });

  test('parseOutputContainers should handle partial JSON', () => {
    expect(() => {
      parseOutputContainers('{"Names":"container1"');
    }).toThrow();
  });
});

describe('getPortMapping function tests', () => {
  test('getPortMapping should return empty string for empty port', async () => {
    const result = await getPortMapping('', 'nginx');
    expect(result).toBe('');
  });

  test('getPortMapping should return empty string for whitespace-only port', async () => {
    const result = await getPortMapping('   ', 'nginx');
    expect(result).toBe('');
  });

  test('getPortMapping should return empty string for null/undefined port', async () => {
    const result1 = await getPortMapping(null as any, 'nginx');
    expect(result1).toBe('');

    const result2 = await getPortMapping(undefined as any, 'nginx');
    expect(result2).toBe('');
  });

  test('getPortMapping should handle docker inspect errors gracefully', async () => {
    // This test would require mocking the exec call, but for now we'll test the basic functionality
    // The function should throw an error when docker inspect fails
    await expect(getPortMapping('8080', 'nonexistent-image')).rejects.toThrow();
  });
});
