export interface Cashflow {
  fromDateTime: string;
  toDateTime: string;
  periodFrequence: string;
  baseCurrencyCode: string;
  totalClosingAvailableBalance: number;
  totalClosingCurrentBalance: number;
  totalPendingMoneyIn: number;
  totalPendingMoneyOut: number;
  totalMoneyIn: number;
  totalMoneyOut: number;
  totalOpeningAvailableBalance: number;
  totalOpeningCurrentBalance: number;
  cashflowPeriods: CashflowPeriod[];
}

export interface CashflowPeriod {
  periodNumber: number;
  totalPendingMoneyIn: number;
  totalPendingMoneyOut: number;
  totalMoneyIn: number;
  totalMoneyOut: number;
}
