import React from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './ui/card';
import Image from 'next/image';
import { CardProps } from '@/interface/cardProps';
import { cn } from '@/lib/utils';

const CalcCard = ({
  cardTitle,
  cardDescription,
  cardContent,
  cardIcon,
}: CardProps) => {
  return (
    <div>
      <Card className='min-h-[11rem] sm:h-[20rem] flex flex-col justify-between bg-gradient-to-b from-sky-100 to-orange-50 shadow'>
        <div>
          <CardHeader>
            <CardTitle>{cardTitle}</CardTitle>
            <CardDescription>{cardDescription}</CardDescription>
          </CardHeader>
          <CardContent className='sm:block hidden'>{cardContent}</CardContent>
        </div>
        <CardFooter className='flex flex-row justify-end pr-0 pb-0'>
          <Image
            src={`/svg/${cardIcon}`}
            alt='SIPIcon'
            width={28}
            height={24}
            className='w-20 sm:w-36 mb-0 '
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CalcCard;
