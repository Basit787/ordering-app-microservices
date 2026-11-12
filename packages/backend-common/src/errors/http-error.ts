// Thrown outside Nest's own exceptions (e.g. upload filters); becomes `{ error, details? }` with this status
export class HttpError extends Error {
  constructor(
    public readonly statusCode: number,
    message: string,
    public readonly details?: Record<string, string[] | undefined>,
  ) {
    super(message);
    this.name = "HttpError";
  }
}
