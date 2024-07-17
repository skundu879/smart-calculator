'use client';
import React from 'react';
import { usePathname } from 'next/navigation';
import { cardDetailsObj } from '@/lib/cardDetails';
import InputCard from '@/components/InputCard';
import ResultCard from '@/components/ResultCard';

const MutualFund = () => {
  const router = usePathname();
  const pathSegments = router.split('/')[1];
  const cardTitle = 'Mutual Fund Calculator';
  const cardDescription =
    'The following tabs allow you to choose between SIP and lumpsum investment.';
  return (
    <div className='flex md:flex-row flex-col gap-2'>
      {cardDetailsObj.map((ele, key) => {
        if (ele.cardTitle === pathSegments) {
          return (
            <React.Fragment key={key}>
              <InputCard
                cardObject={ele.calculationDetails as any}
                title={cardTitle}
                description={cardDescription}
              />
              <ResultCard resultDetails={ele.calculationDetails.results} />
            </React.Fragment>
          );
        }
        return null;
      })}
    </div>
  );
};

export default MutualFund;
