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
    // async function loadFacts() {
    //   setIsLoading(true);
    //   const res = await fetch(supabaseUrl, {
    //     headers: {
    //       apikey,
    //       authorization: "Bearer " + apikey,
    //     },
    //   });
    //   const data = await res.json();
    //   if (cat === "all") {
    //     setFactsList(data);
    //   } else {
    //     const filteredData = await data.filter((f) => f.category === cat);
    //     setFactsList(filteredData);
    //   }
    //   setIsLoading(false);
    // }
    // loadFacts();

    async function loadFacts() {
      const { data: supabaseData, error } = await supabase
        .from("facts")
        .select("*");
      setFactsList(supabaseData);
      // console.log(supabaseData);
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
