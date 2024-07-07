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
      <Card className={cn('h-[310px]')}>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>{cardContent}</CardContent>
        <CardFooter className='flex justify-end pr-0'>
          <Image
            src={`/svg/${cardIcon}`}
            alt='SIPIcon'
            width={28}
            height={24}
            className='w-28 sm:w-36 h-20 mb-0'
          />
        </CardFooter>
      </Card>
    </div>
  );
};

export default CalcCard;
