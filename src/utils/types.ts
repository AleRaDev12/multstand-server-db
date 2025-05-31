// User roles from existing system
export type UserRole = 'manager' | 'master' | 'unregistered' | 'unknown';

// Label types for entity formatting
export type LabelType = 'full' | 'short' | 'line';

// Entity field mapping
export type EntityFieldsMap<T, P> = {
  [K in keyof T]?: P;
};

// Role-based labels
type RoleLabels<T, P> = {
  full: EntityFieldsMap<T, P>;
  short: EntityFieldsMap<T, P>;
  line?: EntityFieldsMap<T, P>;
};

export type EntityLabels<T, P> = {
  [key in Extract<UserRole, 'manager' | 'master'>]: RoleLabels<T, P>;
};

// Pagination types
export interface PaginationInput {
  page?: number;
  limit?: number;
}

export interface PaginationOutput {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
} 