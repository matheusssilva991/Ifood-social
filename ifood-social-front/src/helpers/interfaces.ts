export interface IToast {
  severity?: "success" | "info" | "warn" | "error" | undefined;
  summary: string;
  detail: string;
  life?: number;
}
