import React, { useState, useEffect } from "react";
import "../style.css";
import Header from "./Header";
import Loader from "./Loader";
import FactList from "./FactList";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import categories from "../data";

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
          categories={categories}
          setFactsList={setFactsList}
          setShowForm={setShowForm}
        />
      ) : null}
      <main className="main">
        <CategoryFilter
          categoryLists={categories}
          onClick={(cat) => {
            setCat(cat);
          }}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} categoryLists={categories} />
        )}
      </main>
    </>
  );
}
export default App;
