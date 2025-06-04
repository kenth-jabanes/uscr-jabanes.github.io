"use client";

import React from "react";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="relative min-h-[100svh] w-full">
        <div className="absolute inset-0 w-full">
          <Image
            src="/csu-admin-orig.png"
            alt="Background"
            fill
            className="object-cover object-center w-full opacity-70 md:opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/60 from-80% to-red-500/60"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <Card className="bg-blue-600 opacity-90 border border-gray-300 rounded-md">
            <CardBody className="h-full flex flex-col justify-center">
              <div className="flex flex-col justify-around gap-2 p-4">
                <div
                  className={`w-56 text-start border p-2 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 text-white hover:opacity-90`}
                  onClick={() => router.push("/ident")}
                >
                  <p className="font-semibold text-center">EMPLOYEE</p>
                </div>
                <div
                  className={`w-56 text-start border p-2 rounded-xl cursor-pointer transition-all duration-300 bg-gradient-to-r from-yellow-400 via-red-500 to-blue-500 text-white hover:opacity-90`}
                  onClick={() => router.push("/home")}
                >
                  <p className="font-semibold text-center">STUDENT</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <div className="absolute top-5 left-5">
            <Image
              src="/ucsr-logo.png"
              alt="UCSR Logo"
              width={110}
              height={110}
            />
          </div>
        </div>
      </div>
    </>
  );
}
