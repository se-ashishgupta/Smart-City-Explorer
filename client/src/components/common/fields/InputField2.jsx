import { Input } from "@material-tailwind/react";
import React, { memo, useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField = memo((props) => {
  const {
    name,
    control,
    disabled = false,
    type = "text",
    errors = {},
    isPassword,
    maxlength = 1000,
    label,
    initialValue,
    readOnly = false,
    dateTime = false,
  } = props;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordChange = (value, onChange) => {
    onChange(value);
  };

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={initialValue || ""}
      render={({ field: { onChange, value } }) => (
        <div className=" space-y-1">
          <div className="relative w-full h-10">
            <Input
              size="lg"
              // labelProps={{
              //   className: `${
              //     errors[name]
              //       ? ""
              //       : "peer-focus:before:!border-primaryColor peer-focus:after:!border-primaryColor"
              //   } peer-focus:before:border-t-4 peer-focus:before:border-l-4  peer-focus:after:border-t-4 after:border-r peer-focus:after:border-r-4 font-semibold`,
              // }}
              // className="focus:border-4 focus:border-primaryColor"
              labelProps={{
                className: `font-semibold peer-disabled:text-gray-500 peer-disabled:text-gray-600 peer-disabled:before:border-gray-400 peer-disabled:after:border-gray-400 before:border-t-[2px] after:border-t-[2px]`,
              }}
              // className="bg-white disabled:border"
              className="bg-white disabled:border-[2px]"
              label={label}
              error={errors[name] ? errors[name] : null}
              placeholder=" "
              type={
                dateTime ? "datetime-local" : isPasswordVisible ? "text" : type
              }
              value={type !== "file" ? value : undefined}
              readOnly={readOnly}
              onChange={(e) => {
                if (type === "file") {
                  onChange(e.target.files[0]);
                } else if (isPassword) {
                  handlePasswordChange(e.target.value, onChange);
                } else if (type === "checkbox") {
                  onChange(e.target.checked);
                } else {
                  onChange(e.target.value);
                }
              }}
              maxLength={maxlength}
              id={name}
              // placeholder={name}
              disabled={disabled}
              icon={
                isPassword && (
                  <div
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-1/2 right-0asdfs -translate-y-1/2 cursor-pointer"
                  >
                    {isPasswordVisible ? (
                      <AiOutlineEyeInvisible color="#aaa" size={20} />
                    ) : (
                      <AiOutlineEye color="#aaa" size={20} />
                    )}
                  </div>
                )
              }
            />
          </div>

          {errors[name] && (
            <p className=" text-red-600 pl-1 pt-1 text-sm font-medium">
              {errors[name]?.message}
            </p>
          )}
        </div>
      )}
    />
  );
});

export default InputField;
