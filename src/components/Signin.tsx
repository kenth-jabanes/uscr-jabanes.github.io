// src/components/Signin.tsx

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Button, Input, Spinner } from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../../public/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../public/icons/EyeFilledIcon";
import { setUser } from "@/app/reduxUtils/userSlice";
import { useDispatch } from "react-redux";

const SigninComponent = () => {
  const [isInputUserPasswordVisible, setIsInputUserPasswordVisible] =
    useState(false);
  const [signInPending, setSignInPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setSignInPending(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      console.error("Error signing in:", error.message);
      setSignInPending(false);
      alert(error.message);
    } else {
      const user = data.user;
      if (user) {
        dispatch(setUser(user));
      }
      // console.log("Signed in successfully:", data);
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center relative">
      {signInPending && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <Spinner color="primary" />
        </div>
      )}
      {!signInPending && (
        <>
          <form
            className="animate-in h-full flex flex-col w-full justify-center items-center gap-2 px-3 md:px-12 2xl:px-80"
            onSubmit={handleSubmit}
          >
            <div className="w-full overflow-y-auto flex flex-col justify-center items-center rounded-md shadow-sm gap-3 ">
              <h4 className="absolute top-16 lg:top-32 self-center lg:self-start font-semibold text-xl">
                LOGIN
              </h4>
              <Input
                type="email"
                label="Email"
                variant="bordered"
                color="primary"
                isRequired
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Input
                type={isInputUserPasswordVisible ? "text" : "password"}
                label="Password"
                variant="bordered"
                color="primary"
                isRequired
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endContent={
                  <button
                    className="focus:outline-none"
                    type="button"
                    onClick={() =>
                      setIsInputUserPasswordVisible(!isInputUserPasswordVisible)
                    }
                  >
                    {isInputUserPasswordVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
              />

              <Button
                fullWidth
                type="submit"
                color="primary"
                size="lg"
                disabled={signInPending}
                isDisabled={!email || password.length < 8}
                className="text-white mt-3"
              >
                {signInPending ? "Signing In..." : "Sign In"}
              </Button>
            </div>
          </form>
          <Button
            type="submit"
            variant="ghost"
            color="primary"
            onPress={() => {
              return router.push("/ident/signup");
            }}
            className="absolute bottom-5"
          >
            Create New Account
          </Button>
        </>
      )}
    </div>
  );
};

export default SigninComponent;
