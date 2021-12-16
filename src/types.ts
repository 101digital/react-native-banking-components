
export interface ConsentPeriod {
    period: number;
    type: string;
  }
  
  export interface ConsentSummaryItem {
    id: string;
    title: string;
    message?: string;
  }
  
  export interface ConsentSummary {
    id: string;
    summaryTitle: string;
    summaryMessage?: string;
    items: ConsentSummaryItem[];
    directUrl?: {
      title: string;
      link: string;
    };
  }
  export interface DynamicConsent {
    companyName: string;
    cdrPolicyLink: string;
    guideLinkAccountLink: string;
    companyLink: string;
    consentPeriods: ConsentPeriod[];
    consentSummaries: ConsentSummary[];
  }