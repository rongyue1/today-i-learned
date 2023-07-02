import React, { useState, useEffect } from "react";
import "../style.css";
import Header from "./Header";
import FactList from "./FactList";
import CategoryFilter from "./CategoryFilter";

const CATEGORIES = [
  { name: "technology", color: "#3b82f6" },
  { name: "science", color: "#16a34a" },
  { name: "finance", color: "#ef4444" },
  { name: "society", color: "#eab308" },
  { name: "entertainment", color: "#db2777" },
  { name: "health", color: "#14b8a6" },
  { name: "history", color: "#f97316" },
  { name: "news", color: "#8b5cf6" },
];

// const initialFacts = [
//   {
//     id: 1,
//     text: "React is being developed by Meta (formerly facebook)",
//     source: "https://opensource.fb.com/",
//     category: "technology",
//     votesInteresting: 24,
//     votesMindblowing: 9,
//     votesFalse: 4,
//     createdIn: 2021,
//   },
//   {
//     id: 2,
//     text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
//     source:
//       "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
//     category: "society",
//     votesInteresting: 11,
//     votesMindblowing: 2,
//     votesFalse: 0,
//     createdIn: 2019,
//   },
//   {
//     id: 3,
//     text: "Lisbon is the capital of Portugal",
//     source: "https://en.wikipedia.org/wiki/Lisbon",
//     category: "society",
//     votesInteresting: 8,
//     votesMindblowing: 3,
//     votesFalse: 1,
//     createdIn: 2015,
//   },
// ];

// check if source is a URL
function isValidHttpUrl(string) {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
}

function NewFactForm({ facts, setFactsList, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  function handleSubmit(e) {
    // prevent browser reload
    e.preventDefault();
    // check if all inputs are valid
    if (
      text &&
      text.length <= 200 &&
      source &&
      isValidHttpUrl(source) &&
      category
    ) {
      // create new Object to take new data
      const newFact = {
        id: facts.length + 1,
        text,
        source,
        category,
        votesInteresting: 0,
        votesMindblowing: 0,
        votesFalse: 0,
        createdIn: new Date().getFullYear(),
      };
      // add new fact to state
      setFactsList((preFacts) => [newFact, ...preFacts]);
      // reset input field
      setText("");
      setSource("");
      setCategory("");
      // close form
      setShowForm(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Share a interesting fact..."
      />
      <span>{200 - textLength} words</span>
      <input
        value={source}
        onChange={(e) => setSource(e.target.value)}
        type="text"
        placeholder="Trustworthy source..."
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">POST</button>
    </form>
  );
}

function App() {
  const [showForm, setShowForm] = useState(false);
  const [facts, setFactsList] = useState([]);

  useEffect(() => {
    // Load data from Supabase
    const url = "https://mwaifpppdhglwrzlrnqi.supabase.co/rest/v1/facts";
    const apikey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13YWlmcHBwZGhnbHdyemxybnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MTg0MDIsImV4cCI6MjAwMzQ5NDQwMn0.fljtMtPmcQAMv8fHvp-LqBpYE9Ka1oilTvDJHB7GoEU";

    async function loadFacts() {
      const res = await fetch(url, {
        headers: {
          apikey,
          authorization: "Bearer " + apikey,
        },
      });
      const data = await res.json();
      setFactsList(data);
    }
    loadFacts();
  }, []);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          facts={facts}
          setFactsList={setFactsList}
          setShowForm={setShowForm}
        />
      ) : null}
      <main className="main">
        <CategoryFilter
          categoryLists={CATEGORIES}
          onClick={(name) => console.log("reach " + name)}
        />
        <FactList facts={facts} categoryLists={CATEGORIES} />
      </main>
    </>
  );
}
export default App;
