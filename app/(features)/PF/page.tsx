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
  calculateMutualFund,
  calculatedDataByTabSelector,
} from '../../../lib/featureSlice/PF/providentFundSlice';

const cardTitle = 'Provident Fund Calculator';
const cardDescription =
  'Calculate your future retirement corpus for EPF, PPF, or GPF with our easy-to-use tool. Get insights based on government rates';

const ProvidentFund = () => {
  const router = usePathname();
  const pathSegments = router.split('/')[1];
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
    dispatch(calculateMutualFund({ formula, resultFormuala }));
  };

  return (
    <div className='flex md:flex-row flex-col gap-2 h-full'>
      {cardDetailsObj.map((ele, key) => {
        if (ele.cardTitle === pathSegments) {
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
              <ResultCard
                resultDetails={ele.calculationDetails.results[activeTab]}
                calculatedData={calculatedData}
              />
            </React.Fragment>
          );
        }
        return null;
      })}
    </div>
  );
};

export default ProvidentFund;
