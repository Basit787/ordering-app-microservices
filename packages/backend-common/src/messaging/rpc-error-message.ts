// The message inside a failed request-reply call: an RpcException body, an rxjs timeout or a broker error
export const rpcErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === "object" && error !== null && "message" in error && typeof error.message === "string") {
    return error.message === "Timeout has occurred" ? fallback : error.message;
  }
  return typeof error === "string" ? error : fallback;
};

// The `code` of a failed request-reply call (RpcErrorBody), if the handler set one
export const rpcErrorCode = (error: unknown): string | undefined =>
  typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
    ? error.code
    : undefined;
