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
import Disclaimer from './Disclaimer';
import TableDialog from './TableDialog';
import DataGrid from './DataGrid';

const Colors: Record<string, string> = {
  warning: 'bg-yellow-300',
  good: 'bg-green-600',
  bad: 'bg-red-600',
};

type GraphDataItem = {
  value: number;
  total: number;
  color: string;
};

type ResultDetailItem = {
  title: string;
  color?: string;
  lebel?: string;
  isTable?: boolean;
  isGraph?: boolean;
};

type ResultCardProps = {
  resultDetails: {
    displayList: ResultDetailItem[];
    columns?: Array<object>;
  };
  calculatedData: Record<string, number>;
};

const ResultCard = ({ resultDetails, calculatedData }: ResultCardProps) => {
  const resultContent = (
    title: string,
    label: string,
    color?: string,
    isTable?: boolean
  ) => {
    return (
      <div>
        {isTable ? (
          <div className=' flex mt-10 justify-center text-center w-auto'>
            <TableDialog
              label={title}
              title={title}
              description='How each EMI is divided between principal and interest repayment.'
            >
              <div className='flex flex-col'>
                <DataGrid
                  columns={resultDetails.columns || []}
                  data={calculatedData[label]}
                />
              </div>
            </TableDialog>
          </div>
        ) : (
          <div className='flex flex-row justify-between items-center mt-6'>
            <Label className='flex flex-row items-center'>
              {title}
              {color && (
                <div
                  className={cn(Colors[color], ' ml-2 h-2 w-8 rounded-md')}
                />
              )}
            </Label>
            <Label>{abbreviateNumber(calculatedData[label])}</Label>
          </div>
        )}
      </div>
    );
  };

  const getGrpahData = (
    resultDetails: Array<ResultDetailItem>,
    calculatedBytabData: any
  ) => {
    const graphData: GraphDataItem[] = [];
    resultDetails.map((ele: any) => {
      if (ele.isGraph) {
        graphData.push({
          value: calculatedBytabData[ele.lebel],
          total: calculatedBytabData['totalAmount'],
          color: ele.color,
        });
      }
    });
    return graphData;
  };

  return (
    <Card className='sm:w-[420px] w-full flex flex-col justify-between '>
      <div>
        <CardHeader>
          <CardTitle>Estimated Return</CardTitle>
          <CardDescription>Review Your Estimated Payout</CardDescription>
        </CardHeader>
        <CardContent>
          {resultDetails.displayList.map((ele: any) => {
            return resultContent(ele.title, ele.lebel, ele.color, ele.isTable);
          })}
        </CardContent>
        <CardFooter className='mt-8'>
          {resultDetails.displayList.some((ele) => ele.isGraph) && (
            <StackedBar
              graphData={getGrpahData(
                resultDetails.displayList,
                calculatedData
              )}
            />
          )}
        </CardFooter>
      </div>
      <Disclaimer />
    </Card>
  );
};

export default ResultCard;
