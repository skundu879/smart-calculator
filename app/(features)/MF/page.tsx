'use client';
import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { cardDetailsObj } from '@/lib/cardDetails';
import InputCard from '@/components/InputCard';
import { dynamicMathCalculation } from '@/utils/dynamicMathCalculation';
import { isEmpty } from '@/utils/emptyValidation';
import { Result } from 'postcss';
import ResultCard from '@/components/ResultCard';

const MutualFund = () => {
  const router = usePathname();
  const pathSegments = router.split('/')[1];
  const cardTitle = 'Mutual Fund Calculator';
  const cardDescription =
    'The following tabs allow you to choose between SIP and lumpsum investment.';
  const [resultData, setResultData] = useState([
    { title: 'Total Investment', color: 'warning', value: 0 },
    { title: 'Total Interest', color: 'good', value: 0 },
    { title: 'Total Amount', color: null, value: 0 },
  ]);

  const executeFormula = (
    data: any,
    params: any,
    formula: any,
    activeTab: string
  ) => {
    const dynamicFuntion = dynamicMathCalculation(params, formula);
    const result = Number(
      !isEmpty(data) &&
        Math.round(
          dynamicFuntion(data[params[0]], data[params[1]], data[params[2]])
        )
    );
    setResultData([
      {
        title: 'Principal Amount',
        color: 'warning',
        value:
          activeTab === 'SIP'
            ? data[params[0]] * data[params[2]] * 12
            : data[params[0]],
      },
      {
        title: 'Interest Earned',
        color: 'good',
        value:
          result -
          (activeTab === 'SIP'
            ? data[params[0]] * data[params[2]] * 12
            : data[params[0]]),
      },
      { title: 'Total Amount', color: null, value: result },
    ]);
  };
  return (
    <div className='flex md:flex-row flex-col gap-2'>
      {cardDetailsObj.map((ele, key) => {
        if (ele.cardTitle === pathSegments) {
          return (
            <>
              {' '}
              <InputCard
                cardObject={ele.calculationDetails}
                title={cardTitle}
                description={cardDescription}
                executeFormula={executeFormula}
                key={key}
              />
              <ResultCard
                key={key}
                data={resultData}
                graphData={{
                  title: 'Total Investment',
                  data: [
                    {
                      value: resultData[0].value,
                      total: resultData[2].value,
                      color: 'warning',
                    },
                    {
                      value: resultData[1].value,
                      total: resultData[2].value,
                      color: 'good',
                    },
                  ],
                }}
              />
            </>
          );
        }
      })}
    </div>
  );
};

export default MutualFund;
