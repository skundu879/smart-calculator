import { CardProps } from '@/interface/cardProps';
import { title } from 'process';

export const cardDetailsObj: Array<CardProps> = [
  {
    cardTitle: 'MF',
    cardDescription: 'Mutual Fund',
    cardContent:
      'Estimate your future SIP accumulation considering investment amount,interest rate, and investment period.',
    cardIcon: 'undraw_savings_re_eq4w.svg',
    cardUrl: '/MF',
    calculationDetails: {
      tabsList: ['SIP', 'LUMPSUM'],
      inputFields: {
        SIP: [
          {
            id: 1,
            title: 'investment',
            label: 'Monthly Investment (in Rupees)',
            defaultValue: 5000,
            max: 100000,
            step: 500,
          },
          {
            id: 2,
            title: 'monthlyInterestRate',
            label: 'Expected return rate (per year)',
            defaultValue: 12,
            max: 50,
            step: 1,
          },
          {
            id: 3,
            title: 'months',
            label: 'Time Period (in Year)',
            defaultValue: 5,
            max: 60,
            step: 0.5,
          },
        ],
        LUMPSUM: [
          {
            id: 1,
            title: 'principal',
            label: 'Total Investment (in Rupees)',
            defaultValue: 100000,
            max: 1000000,
            step: 1000,
          },
          {
            id: 2,
            title: 'decimalRate',
            label: 'Expected return rate (per year)',
            defaultValue: 12,
            max: 50,
            step: 1,
          },
          {
            id: 3,
            title: 'years',
            label: 'Time Period (in Year)',
            defaultValue: 10,
            max: 60,
            step: 0.5,
          },
        ],
      },
      formulas: {
        SIP: {
          params: ['investment', 'monthlyInterestRate', 'months'],
          formula:
            'investment * ((Math.pow(1 + (monthlyInterestRate/100/12), (months*12)) - 1) / (monthlyInterestRate/100/12)) * (1 + (monthlyInterestRate/100/12))',
        },
        LUMPSUM: {
          params: ['principal', 'decimalRate', 'years'],
          formula: 'principal * Math.pow(1 + (decimalRate/100), years)',
        },
      },
      results: {
        SIP: [
          {
            title: 'Invested amount',
            color: 'warning',
            formula: 'investment*(months*12)',
          },
          {
            title: 'Estimated return',
            color: 'good',
            formula: '(result-investment*(months*12))',
          },
          {
            title: 'Total value',
            color: null,
            formula: 'result',
          },
        ],
        LUMPSUM: [
          {
            title: 'Invested amount',
            color: 'warning',
            formula: 'principal',
          },
          {
            title: 'Estimated return',
            color: 'good',
            formula: '(result-principal)',
          },
          {
            title: 'Total value',
            color: null,
            formula: 'result',
          },
        ],
      },
    },
  },
];
