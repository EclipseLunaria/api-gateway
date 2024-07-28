export interface MicroService {
  name: string;
  url: string;
}

export interface MicroServiceStatus {
  name: string;
  status: number;
  isOnline: boolean;
  message?: string;
  ping?: number;
}
