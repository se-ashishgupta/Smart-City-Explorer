import React, { memo } from "react";
import { Select, Option } from "@material-tailwind/react";
import { Controller } from "react-hook-form";

const SelectField = memo((props) => {
  const {
    errors,
    name = "",
    control,
    options,
    readOnly = false,
    initialValue = "",
    label,
    onSelectChange,
  } = props;

  const defaultValue = options?.find((option) => option.value === initialValue);

  return (
    <>
      <Controller
        control={control}
        id={name}
        name={name}
        defaultValue={defaultValue?.value}
        render={({ field: { onChange, value } }) => (
          <div className="space-y-1">
            <div className="relative w-full h-10 ">
              <Select
                size="lg"
                label={label}
                disabled={readOnly}
                error={errors[name] ? errors[name] : null}
                value={
                  value
                    ? options?.find((option) => option.value === value)?.value
                    : initialValue
                }
                onChange={(selectedOption) => {
                  onChange(selectedOption ? selectedOption : null);
                  if (onSelectChange) {
                    onSelectChange(selectedOption ? selectedOption : null);
                  }
                }}
                labelProps={{
                  className: `font-semibold peer-disabled:text-blue-gray-500 peer-disabled:before:border-blue-gray-200 peer-disabled:after:border-blue-gray-200`,
                }}
                className="bg-white disabled:border"
              >
                {options?.map((item, index) => (
                  <Option
                    key={index}
                    value={item.value}
                    className=" capitalize"
                  >
                    {item.label}
                  </Option>
                ))}
              </Select>
            </div>

            {errors[name] && (
              <p className=" text-red-600 pl-1 pt-1 text-sm font-medium">
                {errors[name]?.message}
              </p>
            )}
          </div>
        )}
      />
    </>
  );
});

export default SelectField;
