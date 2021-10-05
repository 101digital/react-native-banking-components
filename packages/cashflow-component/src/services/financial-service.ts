type FinancialClient = {
  financialClient: any;
};

export class FinancialService {
  private static _instance: FinancialService = new FinancialService();

  private _financialClient?: any;

  constructor() {
    if (FinancialService._instance) {
      throw new Error(
        'Error: Instantiation failed: Use FinancialService.getInstance() instead of new.'
      );
    }
    FinancialService._instance = this;
  }

  public static instance(): FinancialService {
    return FinancialService._instance;
  }

  public initClients = (clients: FinancialClient) => {
    this._financialClient = clients.financialClient;
  };

  getCashFlow = async (
    walletIds: string[],
    periodFrequence: string,
    baseCurrencyCode: string,
    fromDateTime: string,
    toDateTime?: string,
    sort?: string
  ) => {
    return `{
            "fromDateTime": "2021-01-01T00:00:00",
            "toDateTime": "2021-04-30T23:59:59",
            "periodFrequence": "weekly",
            "baseCurrencyCode": "Not used now",
            "totalClosingAvailableBalance": 5000000,
            "totalClosingCurrentBalance": 6000000,
            "totalPendingMoneyIn": 10000,
            "totalPendingMoneyOut": 10000,
            "totalMoneyIn": 100000,
            "totalMoneyOut": 200000,
            "totalOpeningAvailableBalance": 6000000,
            "totalOpeningCurrentBalance": 7000000,
            "cashflowPeriods": [
              {
                "periodNumber": 1,
                "totalPendingMoneyIn": 5000,
                "totalPendingMoneyOut": 5000,
                "totalMoneyIn": 50000,
                "totalMoneyOut": 50000
              },
              {
                "periodNumber": 2,
                "totalPendingMoneyIn": 0,
                "totalPendingMoneyOut": 0,
                "totalMoneyIn": 0,
                "totalMoneyOut": 50000
              },
              {
                "periodNumber": 3,
                "totalPendingMoneyIn": 0,
                "totalPendingMoneyOut": 0,
                "totalMoneyIn": 50000,
                "totalMoneyOut": 100000
              }
            ]
          }`;
  };
}
