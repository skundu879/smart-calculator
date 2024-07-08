'use client';
import React, { useEffect, useState } from 'react';
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

const InputCard = ({ cardObject, title, description, executeFormula }: any) => {
  const [activeTab, setActiveTab] = useState('SIP');
  const [inputValues, setInputValues] = useState<{
    SIP: { [key: string]: any };
    LUMPSUM: { [key: string]: any };
    [key: string]: { [key: string]: any };
  }>({
    SIP: {},
    LUMPSUM: {},
  });

  const getTabList = (tab: string, key: number) => (
    <TabsTrigger
      value={tab}
      key={key}
    >
      {tab}
    </TabsTrigger>
  );
  const getTabContent = ({ defaultValue, label, max, step, title }: any) => {
    return (
      <InputSlider
        defaultValue={defaultValue}
        label={label}
        max={max}
        step={step}
        handleChange={(ele) => handleChange(ele, title)}
        key={title}
        value={inputValues[activeTab][title]}
      />
    );
  };
  const onTabValueChange = (tab: string) => {
    setActiveTab(tab);
  };
  const handleChange = (ele: any, title: string) => {
    setInputValues({
      ...inputValues,
      [activeTab]: { ...inputValues[activeTab], [title]: ele },
    });
  };
  useEffect(() => {
    cardObject.inputFields[activeTab].forEach((element: any) => {
      setInputValues((inputValues) => ({
        ...inputValues,
        [activeTab]: {
          ...inputValues[activeTab],
          [element.title]: element.defaultValue,
        },
      }));
    });
  }, [activeTab, cardObject.inputFields]);
  useEffect(() => {
    executeFormula(
      inputValues[activeTab],
      cardObject.formulas[activeTab].params,
      cardObject.formulas[activeTab].formula,
      activeTab
    );
  }, [inputValues, activeTab]);
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
            {!isEmpty(inputValues[activeTab]) &&
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
