// src/components/Signup.tsx

"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseAdmin } from "@/utils/supabase";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@nextui-org/react";
import { EyeSlashFilledIcon } from "../../public/icons/EyeSlashFilledIcon";
import { EyeFilledIcon } from "../../public/icons/EyeFilledIcon";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FaCheck } from "react-icons/fa";

const SignupComponent = () => {
  const [isInputUserPasswordVisible, setIsInputUserPasswordVisible] =
    useState(false);
  const [signupPending, setSignUpPending] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");

  const [isSignupConfirmationModalOpen, setIsSignupConfirmationModalOpen] =
    useState(false);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setSignUpPending(true);

    try {
      const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true,
        user_metadata: {
          email: email,
          password: password,
          first_name: firstName,
          last_name: lastName,
          middle_name: middleName,
        },
      });

      if (error) throw error;

      const userId = data?.user?.id;
      if (!userId) throw new Error("User ID not found in the response data.");

      // Redirect farmers to the sign-in page
      setIsSignupConfirmationModalOpen(true);

      // primaryful signup
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error signing up:", error.message);
        alert(error.message);
      } else {
        console.error("Error signing up:", error);
        alert("An unknown error occurred.");
      }
    } finally {
      setSignUpPending(false);
    }
  };

  return (
    <>
      <Modal
        backdrop="blur"
        isDismissable={false}
        hideCloseButton={true}
        isOpen={isSignupConfirmationModalOpen}
        onOpenChange={setIsSignupConfirmationModalOpen}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col">
                {/* Awaiting administrator Approval */}
                Account created successfully
                {/* <span className="text-xs font-normal">
                  Your account creation is currently under review.
                </span> */}
              </ModalHeader>
              <ModalBody>
                <div className="w-full flex flex-col items-center justify-center gap-4">
                  <div className="bg-[#1462A5] text-white p-5 rounded-full">
                    <FaCheck size={"2rem"} />
                  </div>
                  {
                    /* <p className="text-center">
                    You will receive an email notification once your
                    registration has been approved by the administrator.
                  </p> */ <p className="text-center">
                      You can now sign in to your account.
                    </p>
                  }
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  // color="danger"
                  className="bg-[#1462A5] text-white self-center"
                  onPress={() => router.push(`/ident/signin`)}
                >
                  {/* Okay, thanks! */}
                  Signin now
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full h-full flex flex-col justify-center items-center relative">
        {signupPending && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Spinner color="primary" />
          </div>
        )}
        {!signupPending && (
          <>
            <form
              className="animate-in h-full flex flex-col w-full justify-center items-center gap-2 px-3 md:px-12 2xl:px-80"
              onSubmit={handleSubmit}
            >
              <div className="w-full overflow-y-auto flex flex-col justify-center items-center rounded-md shadow-sm gap-3 ">
                <h4 className="absolute top-16 lg:top-32 self-center lg:self-start font-semibold text-xl">
                  REGISTER
                </h4>

                <div className="w-full flex flex-col lg:flex-row gap-2">
                  <Input
                    type="text"
                    label="First Name"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Middle Name"
                    variant="bordered"
                    color="primary"
                    value={middleName}
                    onChange={(e) => setMiddleName(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Last Name"
                    variant="bordered"
                    color="primary"
                    isRequired
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <div className="w-full flex flex-col lg:flex-row gap-2">
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
                          setIsInputUserPasswordVisible(
                            !isInputUserPasswordVisible
                          )
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
                </div>

                <div className="w-full flex gap-2">
                  <Button
                    fullWidth
                    type="submit"
                    color="primary"
                    size="lg"
                    disabled={signupPending}
                    isDisabled={
                      !(email && password.length >= 8 && firstName && lastName)
                    }
                    className="text-white mt-3"
                  >
                    {signupPending ? "Signing Up..." : "Sign Up"}
                  </Button>
                </div>
              </div>
            </form>
            <Button
              type="submit"
              variant="ghost"
              color="primary"
              onPress={() => {
                return router.push("/ident/signin");
              }}
              className="absolute bottom-5"
            >
              Already Have An Account
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default SignupComponent;
