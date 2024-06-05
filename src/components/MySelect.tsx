import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface MySelectProps extends Omit<SelectProps, "onChange" | "value"> {
  id?: string;
  name: string;
  label?: string;
  value?: string[]; // Modify value type to string array for multiple select
  options: { id: string | number; label: string }[];
  onChange: (event: ChangeEvent<{ value: string | number[] }>) => void; // Modify value type for multiple select
  transformInput?: (value: any) => any;
  transformOutput?: (e: ChangeEvent<{ value: string | number[] }>) => any; // Modify value type for multiple select
  control?: any;
  validation?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const MySelect: React.FC<MySelectProps> = ({
  id,
  name,
  label = "",
  value,
  onChange,
  options,
  control,
  transformInput,
  transformOutput,
  validation = {},
  ...props
}) => {
  if (props?.required && !validation.required) {
    validation.required = "This field is required!";
  }

  return (
    <Controller
      name={name}
      control={control}
      rules={validation}
      defaultValue={[]} // Default value as an empty array
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
        <FormControl fullWidth error={invalid}>
          <Select
            size="small"
            fullWidth
            label={label}
            name={name}
            multiple // Add multiple property
            value={transformInput ? transformInput(value) : value ?? []} // Default to empty array
            onChange={(e: any) => {
              if (transformOutput) {
                onChange(transformOutput(e));
              } else {
                onChange(e);
              }
            }}
            {...props}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {invalid && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    ></Controller>
  );
};

export default MySelect;
