import * as yaml from 'js-yaml';
import { InputFormat } from '../types';

export interface ParseResult {
  success: boolean;
  data?: any;
  error?: string;
}

export function parseInput(input: string, format: InputFormat): ParseResult {
  try {
    switch (format) {
      case 'json':
        return parseJSON(input);
      case 'yaml':
        return parseYAML(input);
      case 'jsonl':
        return parseJSONL(input);
      default:
        return {
          success: false,
          error: `Unsupported input format: ${format}`
        };
    }
  } catch (error) {
    return {
      success: false,
      error: `Parse error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function parseJSON(input: string): ParseResult {
  try {
    const data = JSON.parse(input);
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: `Invalid JSON: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function parseYAML(input: string): ParseResult {
  try {
    const data = yaml.load(input);
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: `Invalid YAML: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function parseJSONL(input: string): ParseResult {
  try {
    const lines = input.trim().split('\n');
    const data = lines.map(line => {
      if (line.trim() === '') return null;
      return JSON.parse(line);
    }).filter(item => item !== null);
    
    return {
      success: true,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: `Invalid JSON Lines: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}