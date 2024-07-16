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
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import {
  activeTabSelector,
  setActivetab,
  setFormDatas,
  formDataSelector,
} from '@/lib/featureSlice/mutualFundSlice';

const InputCard = ({ cardObject, title, description, executeFormula }: any) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => activeTabSelector(state));
  const formData = useAppSelector((state) => formDataSelector(state));
  console.log('formData', formData);

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
    const result = executeFormula(
      formData,
      cardObject.formulas[activeTab].params,
      cardObject.formulas[activeTab].formula,
      activeTab
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
