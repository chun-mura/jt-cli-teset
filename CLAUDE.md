# Claude Development Context

## Project Overview

**jt-cli-test** is a CLI tool for querying and transforming JSON data using JSONata expressions. This tool aims to provide a powerful yet simple interface for JSON data manipulation similar to `jq` but using JSONata syntax.

## Project Goals

1. Create a CLI tool for querying and transforming JSON data using JSONata
2. Support multiple input formats: JSON, YAML, JSON Lines
3. Support multiple output formats: JSON, CSV
4. Provide comprehensive error handling
5. Package for distribution (Homebrew, NPM)

## Technical Requirements

- **Language**: Node.js/TypeScript (implementation flexibility allowed)
- **JSONata**: Use latest version of JSONata library
- **Input formats**: JSON (default), YAML, JSON Lines
- **Output formats**: JSON (default), CSV (comma-separated)
- **Input sources**: stdin, file
- **Output destinations**: stdout, file
- **Error handling**: Comprehensive and detailed
- **Configuration**: No config files needed
- **Logging**: No logging levels required

## Command Line Interface

```bash
jt-cli-test [options] <expression> [file]
```

### Arguments
- `expression`: JSONata expression to evaluate
- `file`: Input file (optional, reads from stdin if not provided)

### Options
- `-f, --format <format>`: Input format (json, yaml, jsonl)
- `-o, --output <format>`: Output format (json, csv)
- `--output-file <file>`: Output file path
- `-h, --help`: Show help
- `-V, --version`: Show version

## Implementation Notes

### Dependencies
- JSONata library (latest version)
- YAML parser (if using Node.js ecosystem)
- CSV generation library
- Commander.js or similar for CLI parsing

### Error Handling Strategy
- Validate JSONata expressions before execution
- Handle malformed input data gracefully
- Provide clear error messages for file I/O issues
- Format-specific error handling for YAML/JSON Lines

### CSV Output Considerations
- Handle nested objects by flattening or converting to JSON strings
- Support array outputs by creating multiple rows
- Use comma as delimiter
- Handle special characters in CSV properly

### Testing Strategy
- Unit tests for core functionality
- Integration tests for CLI interface
- Test with various input formats
- Test error conditions

## Development Commands

```bash
# Development setup
npm install

# Run tests
npm test

# Build
npm run build

# Lint
npm run lint

# Type check
npm run typecheck
```

## File Structure

```
jt-cli-test/
├── src/
│   ├── cli.ts          # CLI interface and argument parsing
│   ├── core.ts         # Core JSONata processing logic
│   ├── parsers/        # Input format parsers
│   ├── formatters/     # Output format formatters
│   └── utils/          # Utility functions
├── tests/
├── examples/
├── package.json
├── tsconfig.json
├── README.md
└── CLAUDE.md
```

## Future Enhancements

- Performance optimizations for large datasets
- Additional output formats (XML, etc.)
- Streaming support for large files
- Interactive mode
- Configuration file support
- Plugin system for custom functions

## Distribution

- NPM package publication
- Homebrew formula creation
- GitHub releases with binaries
- Docker container (optional)

## License

MIT License