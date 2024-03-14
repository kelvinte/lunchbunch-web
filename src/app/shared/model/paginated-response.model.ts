export class PaginatedResponse<T> {
  result: T;
  page: number;
  size: number;
  totalPage: number;
  totalItem: number;
}
