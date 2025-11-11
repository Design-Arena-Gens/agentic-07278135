export const dynamic = "force-dynamic"; // server-render every request so quote updates daily without rebuild

function getUtcDaySeed(): number {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth() + 1;
  const d = now.getUTCDate();
  // yyyymmdd
  const seedStr = `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`;
  // simple hash
  let h = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    h ^= seedStr.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h;
}

function pickIndex(length: number, seed: number): number {
  // xorshift32
  let x = seed || 1;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  const u = (x >>> 0) / 0xffffffff;
  return Math.floor(u * length);
}

const QUOTES: { text: string; author: string }[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Whether you think you can or you think you can?t, you?re right.", author: "Henry Ford" },
  { text: "Simplicity is the soul of efficiency.", author: "Austin Freeman" },
  { text: "What we know is a drop, what we don?t know is an ocean.", author: "Isaac Newton" },
  { text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.", author: "Antoine de Saint-Exup?ry" },
  { text: "If you?re going through hell, keep going.", author: "Winston Churchill" },
  { text: "Do or do not. There is no try.", author: "Yoda" },
  { text: "Stay hungry, stay foolish.", author: "Whole Earth Catalog" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It always seems impossible until it?s done.", author: "Nelson Mandela" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "Well begun is half done.", author: "Aristotle" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" }
];

export default function Page() {
  const seed = getUtcDaySeed();
  const index = pickIndex(QUOTES.length, seed);
  const { text, author } = QUOTES[index];

  const today = new Date();
  const formatted = today.toLocaleDateString("en-US", {
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="main">
      <div className="card">
        <div className="header">
          <div className="title">Quote of the Day</div>
          <div className="date">{formatted} (UTC)</div>
        </div>
        <div className="quote">?{text}?</div>
        <div className="author">? {author}</div>
        <div className="footer">A new quote appears each UTC day.</div>
      </div>
    </main>
  );
}
