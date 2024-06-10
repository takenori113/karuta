// pages/reading-mode.tsx
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import useSound from "use-sound";

type KarutaCard = { sentence: string; image: string; voice?: string };
const karutaCards: KarutaCard[] = [
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/e.jpg", voice: "/e.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/hi.jpg", voice: "/hi.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/ho.jpg", voice: "/ho.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/ku.jpg", voice: "/ku.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/mo.jpg", voice: "/mo.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/ne.jpg", voice: "/ne.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/re.jpg", voice: "/re.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/se.jpg", voice: "/se.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/u.jpg", voice: "/u.m4a" },
  { sentence: "生まれは、神田駿河台、わんぱく小僧の剛太郎", image: "/yu.jpg", voice: "/yu.m4a" },
];

type Phase = "question" | "answer" | "beforeStart";

const ReadingMode: React.FC = () => {
  const [phase, setPhase] = useState<Phase>("beforeStart");
  const [questionNum, setQuestionNum] = useState<number>(0);
  const [questionOrder, setQuestionOrder] = useState<number[]>([]);

  // useSoundフックを使って各音声を再生するための関数を取得
  const [playE] = useSound("/e.m4a");
  const [playHi] = useSound("/hi.m4a");
  const [playHo] = useSound("/ho.m4a");
  const [playKu] = useSound("/ku.m4a");
  const [playMo] = useSound("/mo.m4a");
  const [playNe] = useSound("/ne.m4a");
  const [playRe] = useSound("/re.m4a");
  const [playSe] = useSound("/se.m4a");
  const [playU] = useSound("/u.m4a");
  const [playYu] = useSound("/yu.m4a");

  // 各音声の再生関数を配列にまとめる
  const playSounds = [
    playE,
    playHi,
    playHo,
    playKu,
    playMo,
    playNe,
    playRe,
    playSe,
    playU,
    playYu,
  ];

  const getRandomArray = () => {
    const numbers = Array.from({ length: 10 }, (_, i) => i);
    for (let i = numbers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
    }
    return numbers;
  };

  const handleStartReading = () => {
    const order = getRandomArray();
    setQuestionOrder(order);
    setQuestionNum(0); // 最初の質問のインデックスを0に設定
    setPhase("question");
    playSounds[order[0]](); // 最初の音声を再生
  };

  const switchPhase = () => {
    if (phase === "question") {
      setPhase("answer");
    } else if (phase === "answer") {
      const nextQuestionNum = questionNum + 1;
      if (nextQuestionNum < karutaCards.length) {
        setQuestionNum(nextQuestionNum);
        setPhase("question");
        playSounds[questionOrder[nextQuestionNum]](); // 次の音声を再生
      } else {
        // 全ての質問が終わったら、リセットまたは終了
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
            src={karutaCards[questionOrder[questionNum]].image}
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
          <p>{karutaCards[questionOrder[questionNum]].sentence}</p>
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
