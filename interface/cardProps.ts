import { ColumnDef } from '@tanstack/react-table';

export type CardProps = {
  cardTitle: string;
  cardDescription: string;
  cardContent: String;
  cardIcon: string;
  cardUrl: string;
  calculationDetails?: {
    tabsList: Array<string>;
    accordionList?: Array<{
      id: number;
      title: string;
    }>;
    inputFields?: {
      [key: string]: Array<{
        id: number;
        accordionId?: number;
        title: string;
        label: string;
        defaultValue?: number | string;
        dropdownList?: Array<{
          itemValue: string;
          itemLabel: string;
        }>;
        max?: number;
        min?: number;
        step?: number;
        isDisabled?: boolean;
        isTooltip?: boolean;
        isAccordion?: boolean;
        tooltipText?: string;
        inputType:
          | 'slider'
          | 'inputNumber'
          | 'InputDropdown'
          | 'radio'
          | 'checkbox';
      }>;
    };
    formulas?: {
      [key: string]: {
        params: Array<string>;
        formula: string;
      };
    };
    results?: {
      [key: string]: {
        displayList: Array<{
          params: Array<string>;
          formula: string;
          title: string;
          lebel: string;
          color: 'good' | 'bad' | 'warning' | '';
          isGraph: boolean;
          isTable?: boolean;
        }>;
        columns?: ColumnDef<object>[];
      };
    };
  };
};
