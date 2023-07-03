import React, { useState, useEffect } from "react";

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
