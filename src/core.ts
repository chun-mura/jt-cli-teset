import jsonata from 'jsonata';
import { ProcessOptions, ProcessResult } from './types';
import { parseInput } from './parsers';
import { formatOutput } from './formatters';

export async function processData(
  input: string,
  options: ProcessOptions
): Promise<ProcessResult> {
  try {
    // Parse input data
    const parseResult = parseInput(input, options.inputFormat);
    if (!parseResult.success) {
      return {
        success: false,
        error: parseResult.error
      };
    }

    // Compile and execute JSONata expression
    let expression;
    try {
      expression = jsonata(options.expression);
    } catch (error) {
      return {
        success: false,
        error: `Invalid JSONata expression: ${error instanceof Error ? error.message : String(error)}`
      };
    }

    let result;
    try {
      result = await expression.evaluate(parseResult.data);
    } catch (error) {
      let errorMessage = 'Unknown error';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (error && typeof error === 'object' && 'message' in error) {
        errorMessage = String(error.message);
      } else {
        errorMessage = JSON.stringify(error);
      }
      
      return {
        success: false,
        error: `JSONata evaluation error: ${errorMessage}`
      };
    }

    // Format output
    const formatResult = formatOutput(result, options.outputFormat);
    if (!formatResult.success) {
      return {
        success: false,
        error: formatResult.error
      };
    }

    return {
      success: true,
      data: formatResult.data
    };
  } catch (error) {
    return {
      success: false,
      error: `Unexpected error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}