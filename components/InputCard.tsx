'use client';
import React, { createElement, ReactElement, useEffect } from 'react';
import InputSlider from '@/components/InputSlider';
import InputNumber from '@/components/InputNumber';
import InputDropdown from '@/components/InputDropdown';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { isEmpty } from '@/utils/emptyValidation';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface CardObjectTypes {
  tabsList: string[];
  inputFields: Record<string, any>[];
  formulas: Record<string, any>;
  results: Record<string, any>;
  accordionList?: Array<{
    id: number;
    title: string;
  }>;
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

const inputFieldsTypeMap: Record<string, React.FC<any>> = {
  slider: InputSlider,
  inputNumber: InputNumber,
  InputDropdown: InputDropdown,
};

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
    isTooltip,
    tooltipText,
    handleChange,
    inputType,
    dropdownList,
  }: any) => {
    const inputField = React.createElement(inputFieldsTypeMap[inputType], {
      defaultValue: defaultValue,
      label: label,
      max: max,
      min: min,
      step: step,
      handleChange: (ele: any) => handleChange(ele, title),
      key: title,
      value: formData[title],
      isDisabled: isDisabled,
      isTooltip: isTooltip,
      tooltipText: tooltipText,
      dropdownList: dropdownList,
    });
    return inputField;
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
      <CardContent className='px-8 pb-8 '>
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
              cardObject.inputFields[activeTab].map(
                (field: any, index: number) => {
                  if (!field.isAccordion) {
                    return getTabContent({
                      ...field,
                      handleChange,
                    });
                  }
                }
              )}

            <Accordion
              type='single'
              collapsible
              className='w-full'
              // defaultValue='accordion-1'
            >
              {cardObject.accordionList &&
                cardObject.accordionList.map((accordion: any) => (
                  <AccordionItem
                    key={accordion.id}
                    value={`accordion-${accordion.id}`}
                  >
                    <AccordionTrigger>{accordion.title}</AccordionTrigger>
                    <AccordionContent className='flex flex-col gap-8 sm:p-4 p-1'>
                      {!isEmpty(formData) &&
                        cardObject.inputFields[activeTab].map((field: any) => {
                          if (
                            field.isAccordion &&
                            field.accordionId === accordion.id
                          ) {
                            return getTabContent({
                              ...field,
                              handleChange,
                            });
                          }
                        })}
                    </AccordionContent>
                  </AccordionItem>
                ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InputCard;
