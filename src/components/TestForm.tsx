// components/TestForm.tsx
import React from "react";
import { useRouter } from "next/router";

const TestForm: React.FC = () => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault;
    router.push("/reading");
  };

  return (
    <form className="text-center py-5" action="submit">
      <div className="mb-4">
        <p className="mb-2">テストする枚数を設定してください</p>
        <input type="number" className="border p-2 rounded" />
      </div>
      <button
        className="border-solid border-2 border-indigo-600 py-2 px-4 rounded"
        onClick={handleClick}
      >
        テストスタート
      </button>
    </form>
  );
};

export default TestForm;