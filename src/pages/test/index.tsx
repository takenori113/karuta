import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { karutaCards } from "@/karuta/karuta";

type Phase = "question" | "answer" | "beforeStart" | "complete";

const ReadingMode: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("beforeStart");
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);

  useEffect(() => {
    handleStartTest();
  }, []);

  const getRandomArray = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  const handleStartTest = async () => {
    setPhase("beforeStart");
    const order = getRandomArray();
    setQuestionOrder(order);
    setQuestionNum(0);
  };

  const changePhase = () => {
    if (karutaCards.length - 1 >= questionNum) {
      if (phase === "beforeStart") {
        setPhase("question");
      } else if (phase === "question") {
        setPhase("answer");
      } else if (phase === "answer") {
        const currentQuestionNum = questionNum;
        if (karutaCards.length - 2 >= questionNum) {
          setQuestionNum(currentQuestionNum + 1);
          setPhase("question");
        } else {
          setPhase("complete");
        }
      }
    } else {
      setPhase("complete");
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">{`覚えようモード`}</h1>
      <div>
        {phase !== "beforeStart" && phase !== "complete" && (
          <h2 className="text-3xl font-bold mb-6">{`${
            questionOrder.length
          }枚中、${questionNum + 1}枚目`}</h2>
        )}
      </div>

      {phase === "complete" && (
        <button
          onClick={() => handleStartTest()}
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
        >
          再スタート
        </button>
      )}

      {phase !== "complete" && (
        <button
          className={
            "border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
          }
          onClick={() => changePhase()}
        >
          {phase === "beforeStart" ? "テスト開始" : "次へ"}
        </button>
      )}

      <Link
        href="/"
        className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4 ml-8"
      >
        ホームに戻る
      </Link>
      {phase === "answer" && (
        <div className="mt-4 text-2xl text-red-600">
          <p>{karutaCards[questionOrder[questionNum]].sentence}</p>
        </div>
      )}
      {phase === "question" && (
        <div className="mt-4">
          <p>「次へ」を押すと答えが表示されます。</p>
        </div>
      )}
      {phase === "complete" && (
        <div className="mt-4">
          <p>全てのカルタのテストが終わりました。</p>
        </div>
      )}

      {phase === "question" || phase === "answer" ? (
        <div>
          <Image
            src={karutaCards[questionOrder[questionNum]].image}
            alt="Karuta Image"
            className="w-1/3"
            width={200}
            height={200}
          />
        </div>
      ) : null}
    </div>
  );
};

export default ReadingMode;
