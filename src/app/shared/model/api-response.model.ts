export class ApiResponse<T> {
  data: T;
  status: number;
  success: boolean;
  title: string;
}
