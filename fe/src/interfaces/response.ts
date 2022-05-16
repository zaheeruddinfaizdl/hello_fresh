export interface APIResponse<T> {
  data: T;
  error: string;
  message: string;
  ok: boolean;
}
