import { useEffect, useState } from "react";

type Quote = { quote: string; author: string };

export default function WorkQuote() {
  const [quote, setQuote] = useState<Quote | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/quotes")
      .then((r) => r.json())
      .then((data: { quotes: Quote[] }) => {
        const random = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        setQuote(random);
      })
      .catch(() => {});
  }, []);

  if (!quote) return null;

  return (
    <div className="work-quote">
      <p className="quote-text">"{quote.quote}"</p>
      <p className="quote-author">— {quote.author}</p>
    </div>
  );
}
