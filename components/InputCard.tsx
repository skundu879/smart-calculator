'use client';
import React, { ReactElement, useEffect } from 'react';
import InputSlider from '@/components/InputSlider';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isEmpty } from '@/utils/emptyValidation';
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  activeTabSelector,
  setActivetab,
  setFormDatas,
  formDataSelector,
  calculateMutualFund,
} from '@/lib/featureSlice/mutualFundSlice';

interface CardObjectTypes {
  tabsList: string[];
  inputFields: Record<string, any>[];
  formulas: Record<string, any>;
  results: Record<string, any>;
}

interface InputCardProps {
  cardObject: CardObjectTypes; // Adjust according to actual shape
  title: string;
  description: string;
}

const InputCard: React.FC<InputCardProps> = ({
  cardObject,
  title,
  description,
}): ReactElement => {
  const dispatch = useAppDispatch();
  const activeTab: any = useAppSelector((state) => activeTabSelector(state));
  const formData = useAppSelector((state) => formDataSelector(state));

  const getTabList = (tab: string, key: number) => (
    <TabsTrigger
      value={tab}
      key={key}
    >
      {tab}
    </TabsTrigger>
  );
  const getTabContent = ({
    defaultValue,
    label,
    max,
    min,
    step,
    title,
  }: any) => {
    return (
      <InputSlider
        defaultValue={defaultValue}
        label={label}
        max={max}
        min={min}
        step={step}
        handleChange={(ele) => handleChange(ele, title)}
        key={title}
        value={formData[title]}
      />
    );
  };
  const onTabValueChange = (tab: string) => {
    dispatch(setActivetab(tab));
  };
  const handleChange = (ele: any, title: string) => {
    dispatch(setFormDatas({ title, value: ele }));
  };
  useEffect(() => {
    cardObject.inputFields[activeTab].forEach((element: any) => {
      dispatch(
        setFormDatas({ title: element.title, value: element.defaultValue })
      );
    });
  }, [activeTab, cardObject.inputFields, dispatch]);
  useEffect(() => {
    dispatch(
      calculateMutualFund({
        formula: cardObject.formulas,
        resultFormuala: cardObject.results,
      })
    );
  }, [formData, activeTab]);
  return (
    <Card className='sm:w-3/5'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className='p-8 '>
        <Tabs
          defaultValue={activeTab}
          onValueChange={onTabValueChange}
        >
          <TabsList className='sm:mb-8'>
            {cardObject.tabsList.map((tab: any, key: number) => {
              return getTabList(tab, key);
            })}
          </TabsList>
          <TabsContent
            value={activeTab}
            className='flex flex-col gap-8'
          >
            {!isEmpty(formData) &&
              cardObject.inputFields[activeTab].map((field: any) => {
                return getTabContent(field);
              })}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InputCard;
