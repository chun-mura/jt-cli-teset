export type InputFormat = 'json' | 'yaml' | 'jsonl';
export type OutputFormat = 'json' | 'csv';

export interface ProcessOptions {
  expression: string;
  inputFormat: InputFormat;
  outputFormat: OutputFormat;
  outputFile?: string;
}

export interface ProcessResult {
  success: boolean;
  data?: any;
  error?: string;
}