import React, { useState } from "react";
import supabase from "../supabase";

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

function NewFactForm({ facts, categories, setFactsList, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  async function handleSubmit(e) {
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
      const { data: newFact, error } = await supabase
        .from("facts")
        .insert([{ text, source, category }])
        .select();
      if (!error) {
        // add new fact to state
        setFactsList((preFacts) => [newFact[0], ...preFacts]);
      } else {
        alert("Oops, something went wrong!");
      }

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
        {categories.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large">POST</button>
    </form>
  );
}

export default NewFactForm;
