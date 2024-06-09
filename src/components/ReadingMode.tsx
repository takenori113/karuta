// components/ReadingMode.tsx
import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";



const ReadingMode: React.FC = () => {
  const router = useRouter();
  const handleClick = (e: any) => {
    e.preventDefault;
    router.push("/reading");
  };
  return (
    <div className="text-center py-5">
      <h2 className="text-4xl mb-4">読み上げモード</h2>

      <button
        className="border-solid border-2 border-indigo-600 py-2 px-4 rounded"
        onClick={handleClick}
      >
        読み上げモードスタート
      </button>
    </div>
  );
};

export default ReadingMode;
