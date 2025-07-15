export class JTError extends Error {
  constructor(message: string, public code?: string) {
    super(message);
    this.name = 'JTError';
  }
}

export class ParseError extends JTError {
  constructor(message: string, public format: string) {
    super(message, 'PARSE_ERROR');
    this.name = 'ParseError';
  }
}

export class JSONataError extends JTError {
  constructor(message: string) {
    super(message, 'JSONATA_ERROR');
    this.name = 'JSONataError';
  }
}

export class FileError extends JTError {
  constructor(message: string, public filePath: string) {
    super(message, 'FILE_ERROR');
    this.name = 'FileError';
  }
}

export class FormatError extends JTError {
  constructor(message: string, public format: string) {
    super(message, 'FORMAT_ERROR');
    this.name = 'FormatError';
  }
}

export function handleError(error: any): never {
  if (error instanceof JTError) {
    console.error(`Error: ${error.message}`);
    if (error.code) {
      console.error(`Code: ${error.code}`);
    }
  } else if (error instanceof Error) {
    console.error(`Unexpected error: ${error.message}`);
  } else {
    console.error(`Unknown error: ${String(error)}`);
  }
  
  process.exit(1);
}

export function formatErrorMessage(error: any): string {
  if (error instanceof ParseError) {
    return `Failed to parse ${error.format} input: ${error.message}`;
  } else if (error instanceof JSONataError) {
    return `JSONata expression error: ${error.message}`;
  } else if (error instanceof FileError) {
    return `File operation failed for '${error.filePath}': ${error.message}`;
  } else if (error instanceof FormatError) {
    return `Output formatting error (${error.format}): ${error.message}`;
  } else if (error instanceof JTError) {
    return `${error.message}`;
  } else if (error instanceof Error) {
    return `Unexpected error: ${error.message}`;
  } else {
    return `Unknown error: ${String(error)}`;
  }
}