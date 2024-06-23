// components/ReadingMode.tsx
import React from "react";
import { useRouter } from "next/router";
type Props = {
  buttonText: string;
};

const ReadingMode = ({ buttonText }: Props) => {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault;
    buttonText === "読み上げモード（自動）"
      ? router.push("/reading")
      : router.push("/reading/manual");
  };
  return (
    <div className="text-center py-5">
      <h2 className="text-4xl mb-4">{buttonText}</h2>

      <button
        className="border-solid border-2 border-indigo-600 py-2 px-4 rounded"
        onClick={handleClick}
      >
        スタート
      </button>
    </div>
  );
};

export default ReadingMode;
