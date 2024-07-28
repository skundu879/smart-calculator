import React from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import TooltipButton from './TootipButton';
import Image from 'next/image';

type CustomDropdownProps = {
  dropdownList: Array<{
    itemValue: string;
    itemLabel: string;
  }>;
  defaultValue: string;
  handleChange: (value: string) => void;
  label: string;
  isTooltip: boolean;
  tooltipText?: string;
};

const InputDropdown = ({
  dropdownList,
  defaultValue,
  handleChange,
  label,
  isTooltip,
  tooltipText,
}: CustomDropdownProps) => {
  return (
    <div className='flex flex-row justify-between items-center'>
      <Label
        htmlFor={`input-number-${label}`}
        className='sm:text-sm text-xs'
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
      <div className='w-40'>
        <Select
          onValueChange={handleChange}
          defaultValue={defaultValue}
        >
          <SelectTrigger>
            <SelectValue placeholder='options...' />
          </SelectTrigger>
          <SelectContent>
            {dropdownList.map((option, index) => (
              <SelectGroup key={index}>
                <SelectItem
                  value={option.itemValue}
                  className='text-xs text-start'
                >
                  <SelectLabel>{option.itemLabel}</SelectLabel>
                </SelectItem>
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default InputDropdown;
