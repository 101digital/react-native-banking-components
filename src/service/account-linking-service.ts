type BankingClient = {
  openBankAispClient: any;
  openBankAuthClient: any;
};

export class AccountLinkingService {
  private static _instance: AccountLinkingService = new AccountLinkingService();

  private _openBankAispClient?: any;
  private _openBankAuthClient?: any;

  constructor() {
    if (AccountLinkingService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use AccountLinkingService.getInstance() instead of new.'
      );
    }
    AccountLinkingService._instance = this;
  }

  public static instance(): AccountLinkingService {
    return AccountLinkingService._instance;
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

  getAccountConsents = async () => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.get(
        'account-access-consents/consents'
      );
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };
}
