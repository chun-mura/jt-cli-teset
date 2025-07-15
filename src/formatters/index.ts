import { OutputFormat } from '../types';

export interface FormatResult {
  success: boolean;
  data?: string;
  error?: string;
}

export function formatOutput(data: any, format: OutputFormat): FormatResult {
  try {
    switch (format) {
      case 'json':
        return formatJSON(data);
      case 'csv':
        return formatCSV(data);
      default:
        return {
          success: false,
          error: `Unsupported output format: ${format}`
        };
    }
  } catch (error) {
    return {
      success: false,
      error: `Format error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function formatJSON(data: any): FormatResult {
  try {
    const jsonString = JSON.stringify(data, null, 2);
    return {
      success: true,
      data: jsonString
    };
  } catch (error) {
    return {
      success: false,
      error: `JSON formatting error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function formatCSV(data: any): FormatResult {
  try {
    if (data === null || data === undefined) {
      return {
        success: true,
        data: ''
      };
    }

    if (!Array.isArray(data)) {
      // Convert single object to array
      data = [data];
    }

    if (data.length === 0) {
      return {
        success: true,
        data: ''
      };
    }

    // Get all unique keys from all objects
    const allKeys = new Set<string>();
    data.forEach((item: any) => {
      if (typeof item === 'object' && item !== null) {
        Object.keys(item).forEach(key => allKeys.add(key));
      }
    });

    const headers = Array.from(allKeys);
    
    if (headers.length === 0) {
      // Handle primitive values
      const csvRows = data.map((item: any) => formatCSVValue(item));
      return {
        success: true,
        data: csvRows.join('\n')
      };
    }

    // Create CSV header
    const csvHeader = headers.map(h => formatCSVValue(h)).join(',');
    
    // Create CSV rows
    const csvRows = data.map((item: any) => {
      if (typeof item !== 'object' || item === null) {
        // Handle primitive values by putting them in the first column
        return formatCSVValue(item) + ','.repeat(headers.length - 1);
      }
      
      return headers.map(header => {
        const value = item[header];
        return formatCSVValue(value);
      }).join(',');
    });

    const csvContent = [csvHeader, ...csvRows].join('\n');
    
    return {
      success: true,
      data: csvContent
    };
  } catch (error) {
    return {
      success: false,
      error: `CSV formatting error: ${error instanceof Error ? error.message : String(error)}`
    };
  }
}

function formatCSVValue(value: any): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'object') {
    // Convert objects and arrays to JSON strings
    value = JSON.stringify(value);
  } else {
    value = String(value);
  }
  
  // Escape quotes and wrap in quotes if necessary
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    value = '"' + value.replace(/"/g, '""') + '"';
  }
  
  return value;
}