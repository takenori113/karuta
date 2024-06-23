import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

type KarutaCard = { sentence: string; image: string; voice: string };
const karutaCards: KarutaCard[] = [
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/e.jpg",
    voice: "/e.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/hi.jpg",
    voice: "/hi.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/ho.jpg",
    voice: "/ho.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/ku.jpg",
    voice: "/ku.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/mo.jpg",
    voice: "/mo.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/ne.jpg",
    voice: "/ne.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/re.jpg",
    voice: "/re.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/se.jpg",
    voice: "/se.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/u.jpg",
    voice: "/u.m4a",
  },
  {
    sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎",
    image: "/yu.jpg",
    voice: "/yu.m4a",
  },
];

type Phase = "question" | "answer" | "beforeStart" | "complete";
type Mode = "manual" | "auto";

const playAudio = async (filePath: string, iteration: number) => {
  const audio = new Audio(filePath);
  return new Promise<void>((resolve) => {
    audio.play();
    audio.onended = () => {
      if (iteration > 1) {
        playAudio(filePath, iteration - 1).then(resolve);
      } else {
        resolve();
      }
    };
  });
};

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
  const [mode, setMode] = useState<Mode>("auto");

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
    readAndShow();
  };

  // カルタを順番にみ上げる関数
  const readAndShow = () => {
    const playNextCard = async () => {
      if (phase === "question" && questionOrder.length > 0) {
        setIsPlaying(true);
        await playAudio(karutaCards[questionOrder[questionNum]].voice, 2);
        setIsPlaying(false);
        setPhase("answer");
      } else if (phase === "answer") {
        // 画像を一定時間表示
        setPhase("answer");
        const nextQuestionNum = questionNum + 1;
        if (nextQuestionNum < karutaCards.length) {
          setQuestionNum(nextQuestionNum);
          setPhase("question");
        } else {
          setPhase("complete");
        }
      }
    };

    if (phase === "question" || phase === "answer") {
      playNextCard();
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">読み上げモード（手動）</h1>
      {phase === "answer" && (
        <div>
          <Image
            src={karutaCards[questionOrder[questionNum]].image}
            alt="Karuta Image"
            className="w-2/3"
            width={400}
            height={400}
          />
        </div>
      )}

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
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
          onClick={readAndShow}
          disabled={isPlaying}
        >
          次へ
        </button>
      )}
      <div>
        <Link href="/">ホームに戻る</Link>
      </div>
    </div>
  );
};

export default ReadingMode;
