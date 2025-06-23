const logger = {
  info: (msg) => log("INFO", msg),
  warn: (msg) => log("WARN", msg),
  error: (msg) => log("ERROR", msg),
};

function log(level, msg) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${msg}`;
  // Save to external logger middleware instead of console
  // Placeholder example:
  window.localStorage.setItem(`log-${Date.now()}`, logEntry);
}

export default logger;
