"use client";

import { IoHome } from "react-icons/io5";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      startContent={<IoHome />}
      className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
      onPress={() => router.push("/")}
    >
      Home
    </Button>
  );
}
