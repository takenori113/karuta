// pages/reading-mode.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";


type KarutaCard = { sentence: string; image: string; voice?: string };
const karetaCards: KarutaCard[] = [
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/e.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/hi.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/ho.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/ku.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/mo.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/ne.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/re.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/se.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/u.jpg" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/yu.jpg" },
];
type Phase = "question" | "answer" | "beforeStart";

const ReadingMode: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("beforeStart");
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);

  const getRandomArray = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };
  useEffect(() => {}, []);

  const handleStartReading = () => {
    setQuestionOrder(getRandomArray());
    setPhase("question");
  };

  const switchPhase = () => {
    if (phase === "question") {
      setPhase("answer");
    } else if (phase === "answer") {
      const nextQuestionNum = questionNum + 1;
      setQuestionNum(nextQuestionNum);
      setPhase("question");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">読み上げモード</h1>
      {phase === "answer" ? (
        <div>
          <Image
            src={karetaCards[questionOrder[questionNum]].image}
            alt="Top Image"
            height={400}
            width={400}
          />
        </div>
      ) : (
        <></>
      )}

      {phase === "beforeStart" ? (
        <button
          onClick={handleStartReading}
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
        >
          読み上げスタート
        </button>
      ) : (
        <></>
      )}

      {/* 読み上げ中の状態表示 */}
      {phase === "answer" ? (
        <div className="mt-4">
          <p>{karetaCards[0].sentence}</p>
        </div>
      ) : (
        ""
      )}
      {phase !== "beforeStart" ? (
        <button
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
          onClick={switchPhase}
        >
          次へ
        </button>
      ) : (
        <></>
      )}
      <Link href="/"></Link>
    </div>
  );
};

export default ReadingMode;
