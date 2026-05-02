type Meta = Record<string, unknown> | undefined;

const format = (level: string, message: string, meta?: Meta) => {
  const ts = new Date().toISOString();
  const metaPart = meta ? ` ${JSON.stringify(meta)}` : "";
  return `[${ts}] [${level}] ${message}${metaPart}`;
};

export const info = (message: string, meta?: Meta) => {
  console.log(format("INFO", message, meta));
};

export const warn = (message: string, meta?: Meta) => {
  console.warn(format("WARN", message, meta));
};

export const error = (message: string, meta?: Meta) => {
  if (meta instanceof Error) {
    console.error(format("ERROR", message), meta);
  } else {
    console.error(format("ERROR", message, meta));
  }
};

export const debug = (message: string, meta?: Meta) => {
  if (process.env.DEBUG) console.log(format("DEBUG", message, meta));
};

export default { info, warn, error, debug };
