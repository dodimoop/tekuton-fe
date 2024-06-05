import { TextField, TextFieldProps } from "@mui/material";
import React, { ChangeEvent } from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";

interface MyTextFieldProps extends Omit<TextFieldProps, "onChange" | "value"> {
  id?: string;
  name: string;
  label?: string;
  value?: string | Date;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  transformInput?: (value: string | Date) => string;
  transformOutput?: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => any;
  control?: any;
  validation?: Omit<
    RegisterOptions<FieldValues, string>,
    "disabled" | "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
}

const MyTextField: React.FC<MyTextFieldProps> = ({
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
        <TextField
          size="small"
          variant="outlined"
          margin="normal"
          fullWidth
          label={label}
          name={name}
          value={transformInput ? transformInput(value) : value ?? ""}
          onChange={(e) => {
            if (transformOutput) {
              onChange(transformOutput(e));
            } else {
              onChange(e);
            }
          }}
          {...(invalid && {
            error: true,
          })}
          helperText={error?.message || ""}
          {...props}
        />
      )}
    />
  );
};

export default MyTextField;
