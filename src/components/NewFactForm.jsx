import React, { useState } from "react";

function NewFactForm({ categoryLists }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const textLength = text.length;

  return (
    <form className="fact-form">
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
        {categoryLists.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
    </form>
  );
}
export default NewFactForm;
