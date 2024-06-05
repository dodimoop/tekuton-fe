import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import React, { ChangeEvent } from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface MySwitchProps extends Omit<SwitchProps, "onChange" | "checked"> {
  id?: string;
  name: string;
  label?: string;
  value?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  transformInput?: (value: any) => any;
  transformOutput?: (e: ChangeEvent<HTMLInputElement>) => any;
  control?: any;
  validation?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const MySwitch: React.FC<MySwitchProps> = ({
  id,
  name,
  label = "",
  value,
  onChange,
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
      render={({
        field: { value, onChange, onBlur, ref },
        fieldState: { invalid, error },
      }) => (
        <FormControlLabel
          control={
            <Switch
              id={id}
              name={name}
              checked={transformInput ? transformInput(value) : value ?? false}
              onChange={(e: any) => {
                if (transformOutput) {
                  onChange(transformOutput(e));
                } else {
                  onChange(e);
                }
              }}
              {...props}
            />
          }
          label={label}
        />
      )}
    />
  );
};

export default MySwitch;
