import React, { ReactElement, ChangeEvent, forwardRef, Ref } from 'react';
import TooltipButton from './TootipButton';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input'; // Import the Input component
import Image from 'next/image';
import { useToast } from '@/components/ui/use-toast';
import * as z from 'zod';

interface InputNumberProps {
  defaultValue?: number;
  label: string;
  max?: number;
  min?: number;
  step?: number;
  value: number;
  isDisabled?: boolean;
  isTooltip?: boolean;
  tooltipText?: string;
  handleChange: (value: any) => void;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      defaultValue,
      label,
      max,
      min,
      step,
      value,
      isDisabled,
      isTooltip,
      tooltipText,
      handleChange,
    }: InputNumberProps,
    ref: Ref<HTMLInputElement>
  ): ReactElement => {
    const { toast } = useToast();
    const numberSchema = z
      .number()
      .min(min || 0, `Value must be greater than or equal to ${min}`)
      .max(max || 999999999999, `Value must be less than or equal to ${max}`);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      try {
        numberSchema.parse(Number(newValue));
        handleChange(newValue);
      } catch (err: any) {
        toast({
          variant: 'destructive',
          description: err.errors[0].message,
          duration: 4000,
        });
      }
    };
    return (
      <div className='flex flex-row justify-between items-center w-full'>
        <Label htmlFor={`input-number-${label}`} className='text-wrap mr-4'>
          {label}
          {isTooltip && (
            <TooltipButton
              buttonLabel={
                <Image
                  src={'/svg/starIcon.svg'}
                  alt='Star'
                  width={14}
                  height={14}
                />
              }
              tooltipText={tooltipText || ''}
            />
          )}
        </Label>
        <Input
          defaultValue={defaultValue}
          id={`input-number-${label}`}
          type='number'
          value={value}
          className='md:w-40 w-24'
          onChange={handleInputChange}
          step={step}
          min={min}
          max={max}
          disabled={isDisabled}
          ref={ref}
        />
      </div>
    );
  }
);

InputNumber.displayName = 'InputNumber';

export default InputNumber;
