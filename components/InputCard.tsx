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
  setActivetab: (tab: string) => void;
  setFormDatas: (data: any) => void;
  calculateMutualFund: (data: any) => void; // Add this line
  activeTab: any;
  formData: any;
}

const InputCard: React.FC<InputCardProps> = ({
  cardObject,
  title,
  description,
  setActivetab,
  setFormDatas,
  calculateMutualFund,
  activeTab,
  formData,
}): ReactElement => {
  console.log('formData', formData, activeTab);
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
    isDisabled,
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
        isDisabled={isDisabled}
      />
    );
  };
  const onTabValueChange = (tab: string) => {
    setActivetab(tab);
  };
  const handleChange = (ele: any, title: string) => {
    setFormDatas({ title, value: ele });
  };
  useEffect(() => {
    cardObject.inputFields[activeTab].forEach((element: any) => {
      setFormDatas({ title: element.title, value: element.defaultValue });
    });
  }, [activeTab, cardObject.inputFields]);
  useEffect(() => {
    calculateMutualFund({
      formula: cardObject.formulas,
      resultFormuala: cardObject.results,
    });
  }, [activeTab, formData]);
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
