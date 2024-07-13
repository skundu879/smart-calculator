import React from 'react';
import { Slider } from './ui/slider';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import _ from 'lodash';

interface InputSliderProps {
  label: string;
  max: number;
  step: number;
  defaultValue: number;
  value: number;
  handleChange: (value: number) => void;
}

const InputSlider: React.FC<InputSliderProps> = React.memo(
  function InputSlider({
    label,
    max,
    step,
    defaultValue,
    value,
    handleChange,
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
          <Label htmlFor={`input-slider-${label}`}>{label}</Label>
          <Input
            id={`input-slider-${label}`}
            type='number'
            value={value}
            className='md:w-40 w-24'
            onChange={handleInputChange}
          />
        </div>
        <Slider
          defaultValue={[defaultValue]}
          value={[value]}
          max={max}
          step={step}
          onValueChange={handleSliderChange}
        />
      </div>
    );
  }
);

InputSlider.displayName = 'InputSlider';

export default InputSlider;
