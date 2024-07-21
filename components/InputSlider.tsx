import React from 'react';
import { Slider } from './ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import _ from 'lodash';
import TooltipButton from './TootipButton';
import Image from 'next/image';

interface InputSliderProps {
  label: string;
  max: number;
  min: number;
  step: number;
  defaultValue: number;
  value: number;
  isDisabled?: boolean;
  handleChange: (value: number) => void;
  isTooltip?: boolean;
  tooltipText?: string;
}

const InputSlider: React.FC<InputSliderProps> = React.memo(
  function InputSlider({
    label,
    max,
    min,
    step,
    defaultValue,
    value,
    isDisabled,
    handleChange,
    isTooltip,
    tooltipText,
  }) {
    // Debounce handleChange to improve performance
    const debounceChange = React.useCallback(
      _.debounce((value: number) => handleChange(value), 10),
      [handleChange]
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      debounceChange(Number(event.target.value));
    };

    const handleSliderChange = (value: number[]) => {
      debounceChange(value[0]);
    };

    return (
      <div className='flex flex-col gap-8'>
        <div className='flex flex-row justify-between items-center'>
          <Label
            htmlFor={`input-slider-${label}`}
            className='flex flex-row gap-2'
          >
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
            id={`input-slider-${label}`}
            type='number'
            value={value}
            className='md:w-40 w-24'
            onChange={handleInputChange}
            step={step}
            min={min}
            max={max}
            disabled={isDisabled}
          />
        </div>
        {!isDisabled && (
          <Slider
            defaultValue={[defaultValue]}
            value={[value]}
            max={max}
            min={min}
            step={step}
            onValueChange={handleSliderChange}
            disabled={isDisabled}
          />
        )}
      </div>
    );
  }
);

InputSlider.displayName = 'InputSlider';

export default InputSlider;
