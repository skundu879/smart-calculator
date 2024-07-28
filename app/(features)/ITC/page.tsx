'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { cardDetailsObj } from '@/lib/cardDetails';
import InputCard from '@/components/InputCard';
import ResultCard from '@/components/ResultCard';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  activeTabSelector,
  setActivetab,
  setFormDatas,
  formDataSelector,
  calculateMonthlyEMI,
  calculatedDataByTabSelector,
} from '@/lib/featureSlice/ITC/incomeTaxCalculatorSlice';

const cardTitle = 'Income Tax Calculator';
const cardDescription =
  'Easily estimate your income tax burden for any tax year by inputting your financial details and utilizing our advanced calculations.';

const IncomeTaxCalculator = () => {
  console.log('IncomeTaxCalculator');
  const router = usePathname();
  const pathSegments = router;
  const activeTab: any = useAppSelector((state) => activeTabSelector(state));
  const formData = useAppSelector((state) => formDataSelector(state));
  const calculatedData = useAppSelector((state) =>
    calculatedDataByTabSelector(state)
  );
  const dispatch = useAppDispatch();
  const handleActivetab = (tab: string) => {
    dispatch(setActivetab(tab));
  };
  const handleFormDatas = (data: any) => {
    const { value, title } = data;
    dispatch(setFormDatas({ title, value }));
  };
  const handleCalculateMutualFund = ({
    formula,
    resultFormuala,
  }: {
    formula: any;
    resultFormuala: any;
  }) => {
    dispatch(calculateMonthlyEMI({ formula, resultFormuala }));
  };

  return (
    <div className='flex md:flex-row flex-col gap-2'>
      {cardDetailsObj.map((ele, key) => {
        if (ele.cardUrl === pathSegments) {
          return (
            <React.Fragment key={key}>
              <InputCard
                cardObject={ele.calculationDetails as any}
                title={cardTitle}
                description={cardDescription}
                setActivetab={handleActivetab}
                setFormDatas={handleFormDatas}
                calculateMutualFund={handleCalculateMutualFund}
                activeTab={activeTab}
                formData={formData}
              />
              {/* <ResultCard
                resultDetails={ele.calculationDetails.results[activeTab]}
                calculatedData={calculatedData}
              /> */}
            </React.Fragment>
          );
        }
        return null;
      })}
    </div>
  );
};

export default IncomeTaxCalculator;
