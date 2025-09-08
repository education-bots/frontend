import Link from "next/link";

function MainPage() {
  const cards = [
    { title: "Poems", emoji: "🎶", desc: "Rhymes, recitations & sing-alongs.", slug: "poems", from: "from-pink-400", to: "to-pink-600" },
    { title: "Counting", emoji: "🔢", desc: "Counting games with friendly characters.", slug: "counting", from: "from-yellow-300", to: "to-yellow-500" },
    { title: "Alphabet", emoji: "🔤", desc: "A to Z with sounds & fun activities.", slug: "alphabet", from: "from-blue-300", to: "to-blue-500" },
  
   { title: "Shapes", emoji: "🔺", desc: "Discover circles, squares & more.", slug: "shapes", from: "from-green-300", to: "to-green-500" },
  { title: "Colors", emoji: "🎨", desc: "Mix and play with colorful palettes.", slug: "colors", from: "from-purple-300", to: "to-purple-500" },
  { title: "Stories", emoji: "📖", desc: "Short stories with pictures & voice.", slug: "stories", from: "from-orange-300", to: "to-orange-500" },
  { title: "Drawing", emoji: "✏️", desc: "Draw, color & save your art.", slug: "drawing", from: "from-cyan-300", to: "to-cyan-500" },
  { title: "Songs", emoji: "🎵", desc: "Sing-along filled melodies for kids.", slug: "songs", from: "from-rose-300", to: "to-rose-500" },
  { title: "Games", emoji: "🕹️", desc: "Mini-games that teach & reward.", slug: "games", from: "from-lime-300", to: "to-lime-500" },
    // aur bhi subjects ...
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-yellow-50 to-blue-50 flex flex-col items-center p-6 font-sans">
      {/* Header */}
      <header className="w-full max-w-6xl text-center mt-8">
        <h1 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-blue-600 drop-shadow-md">
          🌟 KiddoLearn — Agentic AI for Little Learners 🌟
        </h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto text-sm md:text-lg">
          Fun, safe and interactive lessons for Kindergarten to Grade 1. Bright visuals, friendly characters and bite-sized learning.
        </p>
      </header>

      {/* Cards Grid */}
      <section className="w-full max-w-6xl mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((c, i) => (
          <article
            key={i}
            className={`
              relative overflow-hidden rounded-3xl p-6 h-56 flex flex-col justify-between
              bg-gradient-to-br ${c.from} ${c.to} text-white shadow-xl
              transition transform duration-500 hover:scale-105 hover:-translate-y-1 hover:shadow-2xl
            `}
            aria-label={c.title}
          >
            {/* Content */}
            <div className="flex items-center gap-4">
              <div className="text-5xl md:text-6xl p-2 rounded-full bg-white/20 backdrop-blur-sm shadow-sm">
                {c.emoji}
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold drop-shadow-sm">{c.title}</h3>
                <p className="text-sm md:text-base opacity-95 mt-1">{c.desc}</p>
              </div>
            </div>

            {/* Footer with button */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-white text-sm font-semibold">
                  ⭐
                </div>
                <span className="text-xs md:text-sm">Beginner</span>
              </div>

              <Link href={`/agent/${c.slug}`}>
                <button className="px-4 py-2 rounded-full bg-white/90 text-slate-800 text-sm font-semibold shadow-sm hover:scale-95 active:translate-y-0.5 transition">
                  Try
                </button>
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
export default MainPage;