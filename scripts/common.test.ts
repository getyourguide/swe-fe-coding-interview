import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { parseJsonResponse, getTaskArg } from './common';

describe('common utilities', () => {
  describe('parseJsonResponse', () => {
    it('should parse a valid JSON string correctly', () => {
      const jsonString = '{"key": "value", "number": 123}';
      const expected = { key: 'value', number: 123 };
      expect(parseJsonResponse(jsonString)).toEqual(expected);
    });

    it('should parse a valid JSON string with markdown fences correctly', () => {
      const jsonString = '\n{"key": "value", "number": 123}\n';
      const expected = { key: 'value', number: 123 };
      expect(parseJsonResponse(jsonString)).toEqual(expected);
    });

    it('should parse a valid JSON string with markdown fences and other language specifier correctly', () => {
      const jsonString = 'typescript\n{"key": "value", "number": 123}\n';
      const expected = { key: 'value', number: 123 };
      expect(parseJsonResponse(jsonString)).toEqual(expected);
    });

    it('should parse an empty JSON object correctly', () => {
      const jsonString = '{}';
      expect(parseJsonResponse(jsonString)).toEqual({});
    });

    it('should parse complex nested JSON correctly', () => {
      const jsonString = '{"data": {"items": [{"id": 1}, {"id": 2}]}}';
      const expected = { data: { items: [{ id: 1 }, { id: 2 }] } };
      expect(parseJsonResponse(jsonString)).toEqual(expected);
    });

    it('should throw a SyntaxError for invalid JSON string', () => {
      const invalidJsonString = '{"key": "value", "number":}';
      expect(() => parseJsonResponse(invalidJsonString)).toThrow(SyntaxError);
    });

    it('should throw a SyntaxError for non-JSON string', () => {
      const nonJsonString = 'this is not json';
      expect(() => parseJsonResponse(nonJsonString)).toThrow(SyntaxError);
    });

    it('should throw a SyntaxError for only whitespace within markdown fences', () => {
      const jsonString = '\n  \n';
      expect(() => parseJsonResponse(jsonString)).toThrow(SyntaxError);
    });

    it('should handle JSON with leading/trailing newlines and spaces outside fences', () => {
      const jsonString = '\n  \n{"test": true}\n  \n';
      expect(parseJsonResponse(jsonString)).toEqual({ test: true });
    });
  });

  describe('getTaskArg', () => {
    const originalArgv = process.argv;

    beforeEach(() => {
      process.argv = ['node', 'script.ts']; // Reset to a base for each test
    });

    afterEach(() => {
      process.argv = originalArgv; // Restore original after all tests
      vi.restoreAllMocks();
    });

    it('should return "all" if --task argument is not provided', () => {
      expect(getTaskArg()).toBe('all');
    });

    it('should return "all" if --task argument is provided but without a value', () => {
      process.argv = ['node', 'script.ts', '--task'];
      expect(getTaskArg()).toBe('all');
    });

    it('should return "a11y" if --task a11y is provided', () => {
      process.argv = ['node', 'script.ts', '--task', 'a11y'];
      expect(getTaskArg()).toBe('a11y');
    });

    it('should return "tests" if --task tests is provided', () => {
      process.argv = ['node', 'script.ts', '--task', 'tests'];
      expect(getTaskArg()).toBe('tests');
    });

    it('should return "pr" if --task pr is provided', () => {
      process.argv = ['node', 'script.ts', '--task', 'pr'];
      expect(getTaskArg()).toBe('pr');
    });

    it('should return "best-practices" if --task best-practices is provided', () => {
      process.argv = ['node', 'script.ts', '--task', 'best-practices'];
      expect(getTaskArg()).toBe('best-practices');
    });

    it('should return "all" if --task all is provided', () => {
      process.argv = ['node', 'script.ts', '--task', 'all'];
      expect(getTaskArg()).toBe('all');
    });

    it('should ignore other arguments and correctly parse --task', () => {
      process.argv = ['node', 'script.ts', 'arg1', '--task', 'tests', 'arg2'];
      expect(getTaskArg()).toBe('tests');
    });

    it('should handle multiple --task arguments, taking the value after the first --task occurrence', () => {
      process.argv = ['node', 'script.ts', '--task', 'a11y', 'some_other_arg', '--task', 'pr'];
      expect(getTaskArg()).toBe('a11y');
    });

    it('should return "all" for an unrecognized task value (due to type casting in implementation)', () => {
      process.argv = ['node', 'script.ts', '--task', 'invalid-task-name'];
      expect(getTaskArg()).toBe('all');
    });
  });
});
