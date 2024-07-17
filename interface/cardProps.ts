export type CardProps = {
  cardTitle: string;
  cardDescription: string;
  cardContent: String;
  cardIcon: string;
  cardUrl: string;
  calculationDetails: {
    tabsList: Array<string>;
    inputFields: {
      [key: string]: Array<{
        id: number;
        title: string;
        label: string;
        defaultValue: number;
        max: number;
        min: number;
        step: number;
      }>;
    };
    formulas: {
      [key: string]: {
        params: Array<string>;
        formula: string;
      };
    };
    results: {
      [key: string]: Array<{
        params: Array<string>;
        formula: string;
        title: string;
        lebel: string;
        color: string;
        isGraph: boolean;
      }>;
    };
  };
};
