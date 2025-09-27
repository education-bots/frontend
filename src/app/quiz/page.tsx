"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const quizData = [
  {
    id: 1,
    type: "mcq",
    question: "🌈 What color is the sky on a clear day?",
    options: ["Blue", "Green", "Red", "Yellow"],
    answer: "Blue",
  },
  {
    id: 2,
    type: "fill",
    question: "2 + 2 = ______",
    answer: "4",
  },
  {
    id: 3,
    type: "mcq",
    question: "🍎 Which one is a fruit?",
    options: ["Apple", "Car", "Book", "Chair"],
    answer: "Apple",
  },
];

export default function QuizPage() {
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});

  // Countdown Timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Prevent page refresh/close
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, []);

  const handleAnswer = (answer: string) => {
    setAnswers({ ...answers, [quizData[currentQ].id]: answer });
  };

  const nextQuestion = () => {
    if (currentQ < quizData.length - 1) setCurrentQ(currentQ + 1);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const q = quizData[currentQ];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-100 to-pink-100 p-6">
      {/* Timer (Fixed under navbar - Right side) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed top-20 right-6 z-50 text-lg md:text-xl font-bold 
                   text-purple-700 bg-white px-5 py-4 
                   rounded-xl shadow-lg"
      >
        ⏰ Time Left: {formatTime(timeLeft)}
      </motion.div>

      {/* Question Card */}
      <motion.div
        key={q.id}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-28 bg-gradient-to-r from-blue-400 to-indigo-400 
                   p-8 rounded-3xl shadow-2xl text-white max-w-lg w-full"
      >
        <h2 className="text-2xl font-extrabold mb-6">{q.question}</h2>

        {q.type === "mcq" ? (
          <div className="grid gap-3">
            {q.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                className={`px-4 py-3 rounded-xl font-bold shadow-md transition 
                  ${
                    answers[q.id] === opt
                      ? "bg-yellow-300 text-purple-800"
                      : "bg-white text-gray-800 hover:bg-pink-200"
                  }`}
              >
                {opt}
              </button>
            ))}
          </div>
        ) : (
          <input
            type="text"
            placeholder="Write your answer..."
            value={answers[q.id] || ""}
            onChange={(e) => handleAnswer(e.target.value)}
            className="w-full p-3 rounded-lg text-black"
          />
        )}
      </motion.div>

      {/* Next Button */}
      {currentQ < quizData.length - 1 && (
        <motion.button
          onClick={nextQuestion}
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 rounded-2xl 
                     bg-gradient-to-r from-green-400 to-emerald-400 
                     text-white font-bold shadow-lg"
        >
          Next ➡️
        </motion.button>
      )}
    </section>
  );
}





// "use client";
// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";

// const quizData = [
//   {
//     id: 1,
//     type: "mcq",
//     question: "🌈 What color is the sky on a clear day?",
//     options: ["Blue", "Green", "Red", "Yellow"],
//     answer: "Blue",
//   },
//   {
//     id: 2,
//     type: "fill",
//     question: "2 + 2 = ______",
//     answer: "4",
//   },
//   {
//     id: 3,
//     type: "mcq",
//     question: "🍎 Which one is a fruit?",
//     options: ["Apple", "Car", "Book", "Chair"],
//     answer: "Apple",
//   },
// ];

// export default function QuizPage() {
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
//   const [currentQ, setCurrentQ] = useState(0);
//   const [answers, setAnswers] = useState<Record<number, string>>({});

//   // Countdown Timer
//   useEffect(() => {
//     if (timeLeft <= 0) return;
//     const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft]);

//   // Prevent page switch
//   useEffect(() => {
//     const handler = (e: BeforeUnloadEvent) => {
//       e.preventDefault();
//       e.returnValue = "";
//     };
//     window.addEventListener("beforeunload", handler);
//     return () => window.removeEventListener("beforeunload", handler);
//   }, []);

//   const handleAnswer = (answer: string) => {
//     setAnswers({ ...answers, [quizData[currentQ].id]: answer });
//   };

//   const nextQuestion = () => {
//     if (currentQ < quizData.length - 1) setCurrentQ(currentQ + 1);
//   };

//   const formatTime = (seconds: number) => {
//     const m = Math.floor(seconds / 60);
//     const s = seconds % 60;
//     return `${m}:${s < 10 ? "0" : ""}${s}`;
//   };

//   const q = quizData[currentQ];

//   return (
//     <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-100 to-pink-100 p-6">
//       {/* Timer */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="mb-6 text-xl font-bold text-purple-700 bg-white px-4 py-2 rounded-xl shadow-lg"
//       >
//         ⏰ Time Left: {formatTime(timeLeft)}
//       </motion.div>

//       {/* Question Card */}
//       <motion.div
//         key={q.id}
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="bg-gradient-to-r from-blue-400 to-indigo-400 p-8 rounded-2xl shadow-xl text-white max-w-lg w-full"
//       >
//         <h2 className="text-2xl font-extrabold mb-4">{q.question}</h2>

//         {q.type === "mcq" ? (
//           <div className="grid gap-3">
//             {q.options?.map((opt) => (
//               <button
//                 key={opt}
//                 onClick={() => handleAnswer(opt)}
//                 className={`px-4 py-2 rounded-xl font-bold shadow-md transition 
//                   ${
//                     answers[q.id] === opt
//                       ? "bg-yellow-300 text-purple-800"
//                       : "bg-white text-gray-800 hover:bg-pink-200"
//                   }`}
//               >
//                 {opt}
//               </button>
//             ))}
//           </div>
//         ) : (
//           <input
//             type="text"
//             placeholder="Write your answer..."
//             value={answers[q.id] || ""}
//             onChange={(e) => handleAnswer(e.target.value)}
//             className="w-full p-3 rounded-lg text-black"
//           />
//         )}
//       </motion.div>

//       {/* Next Button */}
//       <motion.button
//         onClick={nextQuestion}
//         whileHover={{ scale: 1.05 }}
//         className="mt-6 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400 to-emerald-400 text-white font-bold shadow-lg"
//       >
//         Next ➡️
//       </motion.button>
//     </section>
//   );
// }



