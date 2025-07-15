#!/usr/bin/env node

import { Command } from 'commander';
import { processData } from './core';
import { readStdin, readFile, writeFile, fileExists } from './utils/fileUtils';
import { InputFormat, OutputFormat, ProcessOptions } from './types';

const program = new Command();

program
  .name('jt-cli-test')
  .description('A powerful CLI tool for querying and transforming JSON data using JSONata expressions')
  .version('1.0.0');

program
  .argument('<expression>', 'JSONata expression to evaluate')
  .argument('[file]', 'Input file (reads from stdin if not specified)')
  .option('-f, --format <format>', 'Input format: json, yaml, jsonl', 'json')
  .option('-o, --output <format>', 'Output format: json, csv', 'json')
  .option('--output-file <file>', 'Output file (writes to stdout if not specified)')
  .action(async (expression: string, file: string | undefined, options: any) => {
    try {
      // Validate input format
      const inputFormat = options.format as InputFormat;
      if (!['json', 'yaml', 'jsonl'].includes(inputFormat)) {
        console.error(`Error: Invalid input format '${inputFormat}'. Must be one of: json, yaml, jsonl`);
        process.exit(1);
      }

      // Validate output format
      const outputFormat = options.output as OutputFormat;
      if (!['json', 'csv'].includes(outputFormat)) {
        console.error(`Error: Invalid output format '${outputFormat}'. Must be one of: json, csv`);
        process.exit(1);
      }

      // Read input data
      let inputData: string;
      if (file) {
        if (!fileExists(file)) {
          console.error(`Error: File '${file}' does not exist`);
          process.exit(1);
        }
        inputData = await readFile(file);
      } else {
        // Check if stdin has data
        if (process.stdin.isTTY) {
          console.error('Error: No input provided. Please provide a file or pipe data to stdin.');
          process.exit(1);
        }
        inputData = await readStdin();
      }

      if (!inputData.trim()) {
        console.error('Error: Input data is empty');
        process.exit(1);
      }

      // Process data
      const processOptions: ProcessOptions = {
        expression,
        inputFormat,
        outputFormat,
        outputFile: options.outputFile
      };

      const result = await processData(inputData, processOptions);

      if (!result.success) {
        console.error(`Error: ${result.error}`);
        process.exit(1);
      }

      // Output result
      if (options.outputFile) {
        await writeFile(options.outputFile, result.data!);
        console.log(`Output written to ${options.outputFile}`);
      } else {
        console.log(result.data);
      }

    } catch (error) {
      console.error(`Error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    }
  });

program.parse();