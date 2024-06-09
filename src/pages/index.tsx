// pages/index.tsx
import React from 'react';
import Header from '@/components/Header';
import ReadingMode from '@/components/ReadingMode';
import TestForm from '@/components/TestForm';

const Home: React.FC = () => (
  <div className="container mx-auto">
    {/* アプリのヘッダー */}
    <Header />
    
    {/* 読み上げモードのセクション */}
    <ReadingMode />
    
    {/* テストフォームのセクション */}
    <TestForm />
  </div>
);

export default Home;
