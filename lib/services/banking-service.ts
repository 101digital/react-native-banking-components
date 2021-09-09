type BankingClient = {
  walletClient: any;
  openBankAispClient: any;
  openBankAuthClient: any;
};

export class BankingService {
  private static _instance: BankingService = new BankingService();

  private _walletClient?: any;
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

  public static getInstance(): BankingService {
    return BankingService._instance;
  }

  public initClients = (clients: BankingClient) => {
    this._walletClient = clients.walletClient;
    this._openBankAispClient = clients.openBankAispClient;
    this._openBankAuthClient = clients.openBankAuthClient;
  };

  getWallets = async () => {
    if (this._walletClient) {
      const response = await this._walletClient.get('wallets', {
        params: {
          pageSize: 0,
          pageNumber: 0,
        },
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  getWalletDetails = async (walletId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.get(`wallets/${walletId}`);
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  linkBankAccount = async (bankId: string, accountId: string, consentId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.post('wallets/link-bank-accounts', {
        bankId,
        accountId,
        consentId,
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  unlinkBankWallet = async (walletId: string) => {
    if (this._walletClient) {
      const response = await this._walletClient.delete(`wallets/${walletId}`);
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  getTransactions = async (walletIds: string, pageNumber?: number) => {
    if (this._walletClient) {
      const response = await this._walletClient.get('transactions', {
        params: {
          walletIds: walletIds,
          pageNumber,
          pageSize: 10,
        },
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  setDefaultWallet = async (walletId: string, isDefaultWallet: boolean) => {
    if (this._walletClient) {
      const response = await this._walletClient.patch(`wallets/${walletId}`, {
        isDefaultWallet,
      });
      return response.data;
    } else {
      throw new Error('Wallet Client is not registered');
    }
  };

  getBanks = async (searchText?: string) => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.get('account-access-consents/banks', {
        params: {
          customerFacing: true,
          searchText,
        },
      });
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };

  requestConsent = async (bankId: string) => {
    if (this._openBankAuthClient) {
      const response = await this._openBankAuthClient.post(`account-access-consents/${bankId}`);
      return response.data;
    } else {
      throw new Error('Bank Auth Client is not registered');
    }
  };

  confirmConsent = async (bankId: string, accountRequestId: string, consentCode: string) => {
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
