# Reference
https://dev.classmethod.jp/articles/made-oss-jt-poweredby-claude-code/

# jt-cli-test

A powerful CLI tool for querying and transforming JSON data using JSONata expressions.

## Features

- Query JSON data using JSONata expressions
- Support for multiple input formats: JSON, YAML, JSON Lines
- Multiple output formats: JSON, CSV
- Read from stdin or file
- Output to stdout or file
- Comprehensive error handling

## Installation

```bash
npm install -g jt-cli-test
```

## Usage

### Basic Usage

```bash
# Query JSON from stdin
echo '{"name": "John", "age": 30}' | jt-cli-test 'name'

# Query JSON from file
jt-cli-test 'name' data.json

# Query with JSONata expression
jt-cli-test '$sum(items.price)' data.json
```

### Input Formats

```bash
# JSON (default)
jt-cli-test 'name' data.json

# YAML
jt-cli-test -f yaml 'name' data.yaml

# JSON Lines
jt-cli-test -f jsonl 'name' data.jsonl
```

### Output Formats

```bash
# JSON output (default)
jt-cli-test 'items' data.json

# CSV output
jt-cli-test -o csv 'items' data.json
```

### File Output

```bash
# Output to file
jt-cli-test 'items' data.json --output-file result.json

# CSV to file
jt-cli-test -o csv 'items' data.json --output-file result.csv
```

### Complete Example

```bash
jt-cli-test -f yaml -o csv 'items[price > 10].{name: name, price: price}' data.yaml --output-file filtered.csv
```

## Command Line Options

```
Usage: jt-cli-test [options] <expression> [file]

Arguments:
  expression              JSONata expression to evaluate
  file                    Input file (reads from stdin if not specified)

Options:
  -f, --format <format>   Input format: json, yaml, jsonl (default: json)
  -o, --output <format>   Output format: json, csv (default: json)
  --output-file <file>    Output file (writes to stdout if not specified)
  -h, --help              Show help
  -V, --version           Show version
```

## Examples

### Working with Arrays

```bash
# Filter and transform array items
jt-cli-test 'items[price > 100].{name: name, discounted: price * 0.9}' products.json

# Sort by field
jt-cli-test 'items^(>price)' products.json

# Group by field
jt-cli-test '$groupBy(items, "category")' products.json
```

### Working with Objects

```bash
# Extract nested values
jt-cli-test 'user.profile.email' data.json

# Merge objects
jt-cli-test '{user.name: name, user.age: age, status: "active"}' data.json
```

### CSV Output Examples

```bash
# Simple CSV output
jt-cli-test -o csv 'items.{name: name, price: price}' data.json

# CSV with custom headers
jt-cli-test -o csv 'items.{Product: name, Cost: price}' data.json
```

## Error Handling

The tool provides detailed error messages for:
- Invalid JSONata expressions
- Malformed input data
- File read/write errors
- Format conversion errors

## JSONata Resources

- [JSONata Documentation](https://jsonata.org/)
- [JSONata Exerciser](https://try.jsonata.org/)
- [JSONata Expression Language](https://docs.jsonata.org/overview.html)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Support

For issues and questions, please use the [GitHub Issues](https://github.com/username/jt-cli-test/issues) page.
