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

type CustomDropdownProps = {
  options: Array<{
    value: string;
    label: string;
  }>;
  value: string;
  onChange: (value: string) => void;
};

const InputDropdown = ({ options, value, onChange }: CustomDropdownProps) => {
  return (
    <Select
      onValueChange={onChange}
      defaultValue={value}
    >
      <SelectTrigger>
        <SelectValue placeholder='options...' />
      </SelectTrigger>
      <SelectContent>
        {options.map((option, index) => (
          <SelectGroup key={index}>
            <SelectItem value={option.value}>
              <SelectLabel>{option.label}</SelectLabel>
            </SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
};

export default InputDropdown;
