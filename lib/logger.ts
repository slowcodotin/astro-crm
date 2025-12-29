type LogLevel = 'info' | 'debug' | 'warn' | 'error';

const LOG_LEVEL_PRIORITY: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

// Set this via process.env.LOG_LEVEL in your .env file
const CURRENT_LOG_LEVEL: LogLevel = (process.env.NEXT_PUBLIC_LOG_LEVEL as LogLevel) || 'debug';

export const logger = {
  debug: (message: string, data?: any) => log('debug', message, data),
  info: (message: string, data?: any) => log('info', message, data),
  warn: (message: string, data?: any) => log('warn', message, data),
  error: (message: string, data?: any) => log('error', message, data),
};

function log(level: LogLevel, message: string, data?: any) {
  if (LOG_LEVEL_PRIORITY[level] < LOG_LEVEL_PRIORITY[CURRENT_LOG_LEVEL]) return;

  const timestamp = new Date().toISOString().split('T')[1].split('.')[0]; // HH:mm:ss
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  const styles = {
    debug: '\x1b[36m', // Cyan
    info: '\x1b[32m',  // Green
    warn: '\x1b[33m',  // Yellow
    error: '\x1b[31m', // Red
    reset: '\x1b[0m',
  };

  const color = styles[level];
  const output = `${color}${prefix} ${message}${styles.reset}`;

  if (data) {
    console.log(output, data);
  } else {
    console.log(output);
  }
}
