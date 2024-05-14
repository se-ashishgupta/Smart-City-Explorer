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

const SignUp = ({ open, handleOpen, signInHandleOpen }) => {
  return (
    <Dialog
      size="xs"
      open={open}
      handler={handleOpen}
      className="bg-transparent shadow-none"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardBody className="flex flex-col gap-4">
          <Typography
            className="mb-3 font-semibold text-center"
            variant="h4"
            color="gray"
          >
            Sign Up to your account.
          </Typography>

          <div>
            <Button
              fullWidth
              variant="outlined"
              color="blue-gray"
              className="flex items-center justify-center gap-3"
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

          <Input label="Name" size="lg" />

          <Input label="Email" size="lg" />

          <Input label="Password" size="lg" />

          <Input label="Conform Password" size="lg" />
          <div className="-ml-2.5 -mt-3">
            <Checkbox label="Remember Me" />
          </div>
        </CardBody>
        <CardFooter className="pt-0 space-y-2">
          <Button variant="gradient" onClick={handleOpen} fullWidth>
            Sign Up
          </Button>

          <Typography variant="small" className="mt-4 flex justify-center">
            Already have an account?
            <Typography
              variant="small"
              color="blue-gray"
              className="ml-1 font-bold cursor-pointer"
              onClick={() => {
                handleOpen();
                signInHandleOpen();
              }}
            >
              Sign In
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </Dialog>
  );
};

export default SignUp;
