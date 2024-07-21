import Link from 'next/link';
import CalcCard from '@/components/CalcCard';
import { cardDetailsObj } from '@/lib/cardDetails';

export default function Home() {
  return (
    <main className='flex flex-col items-center p-8'>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 grid-cols-2 '>
        {cardDetailsObj.map((ele) => (
          <Link
            key={ele.cardTitle}
            href={ele.cardUrl}
          >
            <CalcCard
              key={ele.cardTitle}
              cardTitle={ele.cardTitle}
              cardDescription={ele.cardDescription}
              cardContent={ele.cardContent}
              cardIcon={ele.cardIcon}
              cardUrl={ele.cardUrl}
              calculationDetails={ele.calculationDetails}
            />
          </Link>
        ))}
      </div>
    </main>
  );
}
