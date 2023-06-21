import React, { useState } from "react";
import "./style.css";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Header showForm={showForm} setShowForm={setShowForm} />
      {showForm ? <NewFactForm /> : null}
      <main className="main">
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

export default App;
