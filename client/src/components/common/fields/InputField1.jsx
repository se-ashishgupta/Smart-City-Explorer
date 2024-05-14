import React, { memo, useState } from "react";
import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const InputField1 = memo((props) => {
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
    <div>
      <Controller
        control={control}
        name={name}
        defaultValue={initialValue || ""}
        render={({ field: { onChange, value } }) => (
          <div className=" space-y-1">
            <div className="relative w-full h-10">
              <input
                className="bg-white peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50  transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-blue-gray-200 focus:border-gray-900"
                error={errors[name] ? errors[name] : null}
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
                type={
                  dateTime
                    ? "datetime-local"
                    : isPasswordVisible
                    ? "text"
                    : type
                }
                disabled={disabled}
              />
              <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-semibold !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight  transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all  after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all  peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-900 before:border-blue-gray-200 peer-focus:before:!border-gray-900 after:border-blue-gray-200 peer-focus:after:!border-gray-900">
                {label}
              </label>

              {isPassword && (
                <div
                  className="absolute grid w-5 h-5 place-items-center text-blue-gray-500 top-2/4 right-3 -translate-y-2/4"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  {isPasswordVisible ? (
                    <AiOutlineEyeInvisible color="#aaa" size={20} />
                  ) : (
                    <AiOutlineEye color="#aaa" size={20} />
                  )}{" "}
                  <i className="fas fa-heart" aria-hidden="true"></i>
                </div>
              )}
            </div>

            {errors[name] && (
              <p className=" text-red-600 pl-1 pt-1 text-sm font-medium">
                {errors[name]?.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
});

export default InputField1;
