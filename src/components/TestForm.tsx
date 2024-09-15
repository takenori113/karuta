// components/TestForm.tsx
import React from "react";
import { useRouter } from "next/router";

const TestForm: React.FC = () => {
  const router = useRouter();

  const handleClick = (e: any) => {
    e.preventDefault;
    router.push("/test");
  };

  return (
    <div className="text-center py-5">
      <h2 className="text-4xl mb-4">覚えようもモード</h2>
        <button
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded"
          onClick={handleClick}
        >
          はじめる
        </button>
    </div>
  );
};

export default TestForm;
