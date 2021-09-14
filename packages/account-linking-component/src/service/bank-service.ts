type BankingClient = {
  openBankAispClient: any;
  openBankAuthClient: any;
};

export class BankingService {
  private static _instance: BankingService = new BankingService();

  private _openBankAispClient?: any;
  private _openBankAuthClient?: any;

  constructor() {
    if (BankingService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use BankingService.getInstance() instead of new.'
      );
    }
    BankingService._instance = this;
  }

  public static instance(): BankingService {
    return BankingService._instance;
  }

  public initClients = (clients: BankingClient) => {
    this._openBankAispClient = clients.openBankAispClient;
    this._openBankAuthClient = clients.openBankAuthClient;
  };

  getBanks = async (searchText?: string) => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.get(
        'account-access-consents/banks',
        {
          params: {
            customerFacing: true,
            searchText,
          },
        }
      );
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };

  requestConsent = async (bankId: string) => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.post(
        `account-access-consents/${bankId}`
      );
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };

  confirmConsent = async (
    bankId: string,
    accountRequestId: string,
    consentCode: string
  ) => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.post(
        `account-access-consents/${bankId}/consents`,
        {
          code: consentCode,
          accountRequestId,
        }
      );
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };

  fetchBankAccounts = async (consentId: string) => {
    if (this._openBankAispClient) {
      const response = await this._openBankAispClient.get('accounts', {
        params: {
          consentId,
        },
      });
      return response.data;
    } else {
      throw new Error('Bank AISP Client is not registered');
    }
  };
}
