
export interface AccountingSoftware {
  id: string;
  name: string;
  logo: string;
  description: string;
  isConnected: boolean;
  lastSync?: string;
}

export interface AccountingIntegrationConfig {
  apiKey?: string;
  clientId?: string;
  clientSecret?: string;
  redirectUri?: string;
  refreshToken?: string;
  companyId?: string;
  environment?: 'production' | 'sandbox';
}

export interface AccountingConnectionStatus {
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync?: Date;
  error?: string;
}

export interface AccountingDataSyncOptions {
  startDate: Date;
  endDate: Date;
  includeCategories?: string[];
  includeDepartments?: string[];
}
