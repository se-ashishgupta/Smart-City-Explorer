import React from "react";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../constant/validation";
import InputField from "../../components/common/fields/InputField";
import { Link } from "react-router-dom";

const SignIn = ({ open, handleOpen, signUpHandleOpen }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginHandler = (login) => {
    console.log(login);
    handleOpen();
  };

  const onGoogleOAuth = () => {
    window.location.href = import.meta.env.VITE_GOOGLE_LOGIN_URL;
  };

  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <form onSubmit={handleSubmit(loginHandler)}>
          <CardBody className="flex flex-col gap-4">
            <Typography
              className="mb-3 font-semibold text-center"
              variant="h4"
              color="gray"
            >
              Sign In to your account.
            </Typography>

            <div>
              <Button
                type="button"
                fullWidth
                variant="outlined"
                color="blue-gray"
                className="flex items-center justify-center gap-3"
                onClick={onGoogleOAuth}
              >
                <img
                  src="https://docs.material-tailwind.com/icons/google.svg"
                  alt="metamask"
                  className="h-5 w-5"
                />
                Continue with Google
              </Button>
            </div>

            <Typography className="-mb-2 text-center" variant="h6">
              OR
            </Typography>

            <InputField
              control={control}
              name="email"
              errors={errors}
              label="Email"
            />

            <InputField
              control={control}
              name="password"
              label="Password"
              type="password"
              isPassword={true}
              errors={errors}
            />
            <div className="-ml-2.5 -mt-3">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0 space-y-2">
            <Button type="submit" variant="gradient" fullWidth>
              Sign In
            </Button>

            <Typography variant="small" className="mt-4 flex justify-center">
              Don&apos;t have an account?
              <Typography
                variant="small"
                color="blue-gray"
                className="ml-1 font-bold cursor-pointer"
                onClick={() => {
                  handleOpen();
                  signUpHandleOpen();
                }}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </form>
      </Card>
    </Dialog>
  );
};

export default SignIn;
