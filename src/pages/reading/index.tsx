import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { karutaCards } from "@/karuta/karuta";

type Phase = "question" | "answer" | "beforeStart" | "complete";

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

const ReadingMode: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("beforeStart");
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [readingCount, setReadingCount] = useState<number>(2);

  const audioRef = useRef<HTMLAudioElement | null>(null); //これにより、現在再生されているaudioElementを操作する

  const playAudio = async (filePath: string, iteration: number) => {
    const audio = new Audio(filePath);
    return new Promise<void>((resolve) => {
      if (!audioRef.current) {
        audioRef.current = new Audio(filePath);
      } else {
        audioRef.current.src = filePath;
      }
      audioRef.current.play();
      audioRef.current.onended = () => {
        if (iteration > 1) {
          playAudio(filePath, iteration - 1).then(resolve);
        } else {
          resolve();
        }
      };
    });
  };

  const getRandomArray = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  const handleStartReading = async () => {
    const order = getRandomArray();
    setQuestionOrder(order);
    setQuestionNum(0);
    setPhase("question");
  };

  // カルタを順番に自動で読み上げる関数
  useEffect(() => {
    const playNextCard = async () => {
      if (phase === "question" && questionOrder.length > 0) {
        setIsPlaying(true);
        await playAudio(
          karutaCards[questionOrder[questionNum]].voice,
          readingCount
        );
        setIsPlaying(false);
        setPhase("answer");
      } else if (phase === "answer") {
        // 画像を一定時間表示
        await sleep(3000); // 3秒表示
        if (isPaused) return;
        const nextQuestionNum = questionNum + 1;
        if (nextQuestionNum < karutaCards.length) {
          setQuestionNum(nextQuestionNum);
          setPhase("question");
        } else {
          setPhase("complete");
        }
      }
    };

    if ((phase === "question" || phase === "answer") && isPaused === false) {
      playNextCard();
    }
  }, [phase, questionNum, questionOrder, isPaused]);

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReadingCountChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setReadingCount(Number(event.target.value));
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">{`読み上げモード`}</h1>
      <div>
        {phase !== "beforeStart" && phase !== "complete" && (
          <h2 className="text-3xl font-bold mb-6">{`${
            questionOrder.length
          }枚中、${questionNum + 1}枚目`}</h2>
        )}
      </div>

      {phase === "beforeStart" && (
        <button
          onClick={handleStartReading}
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
        >
          読み上げスタート
        </button>
      )}

      {phase === "answer" && (
        <div className="mt-4">
          <p>{karutaCards[questionOrder[questionNum]].sentence}</p>
        </div>
      )}

      {phase === "complete" && (
        <div className="mt-4">
          <p>全てのカルタの読み上げが完了しました！</p>
          <button
            onClick={() => setPhase("beforeStart")}
            className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
          >
            再スタート
          </button>
        </div>
      )}

      {phase !== "beforeStart" && phase !== "complete" && (
        <button
          className={
            !isPlaying
              ? "border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
              : "border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4 opacity-50"
          }
          onClick={() => setPhase("answer")}
          disabled={isPlaying}
        >
          次へ
        </button>
      )}
      {phase !== "beforeStart" && phase !== "complete" && (
        <button
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4 ml-8"
          onClick={handlePauseResume}
        >
          {isPaused ? "再開" : "一時停止"}
        </button>
      )}
      <Link
        href="/"
        className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4 ml-8"
      >
        ホームに戻る
      </Link>
      <div className="mb-4">
        <label className="mr-4">
          <input
            type="radio"
            name="readingCount"
            value="1"
            checked={readingCount === 1}
            onChange={handleReadingCountChange}
          />
          1回読み
        </label>
        <label>
          <input
            type="radio"
            name="readingCount"
            value="2"
            checked={readingCount === 2}
            onChange={handleReadingCountChange}
          />
          2回読み
        </label>
      </div>
      <div className="mt-2">
        <p>※音声再生中に一時停止をすると、音声再生後に一時停止になります。</p>
      </div>
      {phase === "answer" && (
        <div>
          <Image
            src={karutaCards[questionOrder[questionNum]].image}
            alt="Karuta Image"
            className="w-1/3"
            width={200}
            height={200}
          />
        </div>
      )}
    </div>
  );
};

export default ReadingMode;
