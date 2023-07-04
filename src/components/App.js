import React, { useState, useEffect } from "react";
import "../style.css";
import Header from "./Header";
import Loader from "./Loader";
import FactList from "./FactList";
import NewFactForm from "./NewFactForm";
import CategoryFilter from "./CategoryFilter";
import categories from "../data";
import supabase from "../supabase";

function App() {
  const [showForm, setShowForm] = useState(false);
  // show facts that are under specific category
  const [cat, setCat] = useState("all");
  const [facts, setFactsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load data from Supabase
    async function loadFacts() {
      setIsLoading(true);
      let query = supabase.from("facts").select("*");

      if (cat !== "all") {
        query = query.eq("category", cat);
      }

      const { data: facts, error } = await query
        .order("voteInteresting", { ascending: false })
        .limit(100);

      if (!error) {
        setFactsList(facts);
      } else {
        alert("Oops, something went wrong!");
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
