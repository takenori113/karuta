// pages/reading-mode.tsx
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

type Phase = "question" | "answer" | "beforeStart";
type Mode = "manual" | "auto";

const ReadingMode: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("beforeStart");
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [mode, setMode] = useState<Mode>("auto");
  let order:number[] = [];

  const repeatableAudio = async (iteration: number, filePath: string) => {
    const audio = new Audio(filePath);
    return new Promise<void>((resolve) => {
      audio.play();
      audio.onended = () => {
        if (iteration > 1) {
          repeatableAudio(iteration - 1, filePath).then(resolve);
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

  const getRandomArray = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  const handleStartReading = async () => {
    order = getRandomArray()
    setQuestionNum(0);
    const nextPhase = "question";

    setPhase(c => c = nextPhase);
    console.log(phase);

    await repeatableAudio(2, karutaCards[order[0]].voice);
    await switchPhase();
    await switchPhase();
    console.log("実行したで");
  };

  const switchPhase = async () => {
    console.log("if前")
    if (phase === "question") {
      console.log("くえっしょん");
      setPhase("answer");
      await sleep(1000);
    } else if (phase === "answer") {
      console.log("あんさー");
      const nextQuestionNum = questionNum + 1;
      if (nextQuestionNum < karutaCards.length) {
        setQuestionNum(nextQuestionNum);
        console.log(questionNum);
        setPhase("question");
        await repeatableAudio(2, karutaCards[order[questionNum]].voice); // 次の音声を再生
      } else {
        // 全ての質問が終わったら、リセットまたは終了
        console.log("それ以外");
        setPhase("beforeStart");
      }
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">読み上げモード</h1>
      {phase === "answer" ? (
        <div>
          <Image
            src={karutaCards[order[questionNum]].image}
            alt="Top Image"
            height={400}
            width={400}
          />
        </div>
      ) : null}

      {phase === "beforeStart" ? (
        <button
          onClick={handleStartReading}
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
        >
          読み上げスタート
        </button>
      ) : null}

      {phase === "answer" ? (
        <div className="mt-4">
          <p>{karutaCards[order[questionNum]].sentence}</p>
        </div>
      ) : null}

      {phase !== "beforeStart" ? (
        <button
          className="border-solid border-2 border-indigo-600 py-2 px-4 rounded mb-4"
          onClick={switchPhase}
        >
          次へ
        </button>
      ) : null}

      <Link href="/"></Link>
    </div>
  );
};

export default ReadingMode;
