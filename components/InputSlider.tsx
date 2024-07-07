'use client';
import React, { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type props = {
  label: string;
  max: number;
  step: number;
  defaultValue: number[];
  value: number;
  handleChange: (ele: any) => void;
};

const InputSlider = ({
  label,
  max,
  step,
  defaultValue,
  value,
  handleChange,
}: props) => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-row justify-between items-center'>
        <Label>{label}</Label>
        <Input
          value={value}
          className='md:w-40 w-24'
          onChange={(event) => handleChange(event.target.value)}
        />
      </div>
      <Slider
        defaultValue={[value]}
        value={[value]}
        max={max}
        step={step}
        onValueChange={(event) => handleChange(event[0])}
      />
    </div>
  );
};

export default InputSlider;
