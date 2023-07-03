import React, { useState, useEffect } from "react";
import "../style.css";
import Header from "./Header";
import Loader from "./Loader";
import FactList from "./FactList";
import NewFactForm from "./NewFactForm";
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

function App() {
  const [showForm, setShowForm] = useState(false);
  // show facts that are under specific category
  const [cat, setCat] = useState("all");
  const [facts, setFactsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load data from Supabase
    const url = "https://mwaifpppdhglwrzlrnqi.supabase.co/rest/v1/facts";
    const apikey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13YWlmcHBwZGhnbHdyemxybnFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5MTg0MDIsImV4cCI6MjAwMzQ5NDQwMn0.fljtMtPmcQAMv8fHvp-LqBpYE9Ka1oilTvDJHB7GoEU";

    async function loadFacts() {
      setIsLoading(true);
      const res = await fetch(url, {
        headers: {
          apikey,
          authorization: "Bearer " + apikey,
        },
      });
      const data = await res.json();
      if (cat === "all") {
        setFactsList(data);
      } else {
        const filteredData = await data.filter((f) => f.category === cat);
        setFactsList(filteredData);
      }
      setIsLoading(false);
    }
    loadFacts();
  }, [cat]);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? (
        <NewFactForm
          facts={facts}
          categories={CATEGORIES}
          setFactsList={setFactsList}
          setShowForm={setShowForm}
        />
      ) : null}
      <main className="main">
        <CategoryFilter
          categoryLists={CATEGORIES}
          onClick={(cat) => {
            setCat(cat);
          }}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} categoryLists={CATEGORIES} />
        )}
      </main>
    </>
  );
}
export default App;
