// pages/index.tsx
import React from "react";
import Header from "@/components/Header";
import ReadingMode from "@/components/ReadingMode";
import TestForm from "@/components/TestForm";

const Home: React.FC = () => (
  <div className="container mx-auto">
    {/* アプリのヘッダー */}
    <Header />

    {/* 読み上げモードのセクション */}
    <ReadingMode buttonText="読み上げモード（自動）" />
    {/* テストフォームのセクション */}
    <div className="mt-8">
      <TestForm />
    </div>
  </div>
);

export default Home;
