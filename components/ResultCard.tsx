import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';
import StackedBar from './StackBar';
import { cn } from '@/lib/utils';
import { abbreviateNumber } from '@/utils/abbreviateNumber';

const Colors: Record<string, string> = {
  warning: 'bg-yellow-300',
  good: 'bg-green-600',
};

type ResultCardProps = {
  data: Array<object>;
  graphData: {
    title: string;
    data: Array<object>;
  };
};

const ResultCard = ({ data, graphData }: ResultCardProps) => {
  const resultContent = (title: string, value: number, color?: string) => {
    return (
      <div className='flex flex-row justify-between items-center mt-6'>
        <Label className='flex flex-row items-center'>
          {title}
          {color && (
            <div className={cn(Colors[color], ' ml-2 h-2 w-8 rounded-md')} />
          )}
        </Label>
        <Label>{abbreviateNumber(value)}</Label>
      </div>
    );
  };
  return (
    <Card className='w-96'>
      <CardHeader>
        <CardTitle>Estimated Return</CardTitle>
        <CardDescription>
          Review Your Estimated Mutual Fund Payout
        </CardDescription>
      </CardHeader>
      <CardContent>
        {data.map((ele: any) => {
          return resultContent(ele.title, ele.value, ele.color);
        })}
      </CardContent>
      <CardFooter className='mt-8'>
        <StackedBar graphData={graphData} />
      </CardFooter>
    </Card>
  );
};

export default ResultCard;
