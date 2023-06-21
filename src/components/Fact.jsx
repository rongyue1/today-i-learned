function Fact({ fact, categoryLists }) {
  return (
    <ul className="fact-list">
      <li className="fact">
        <p>
          {fact.text}
          <a className="source" href={fact.source}>
            (source)
          </a>
        </p>
        <span
          className="tag"
          style={{
            backgroundColor: categoryLists.find(
              (categoryName) => categoryName.name === fact.category
            ).color,
          }}
        >
          {fact.category}
        </span>
        <div className="vote-buttons">
          <button>👍 {fact.votesInteresting}</button>
          <button>🤯 {fact.votesMindblowing}</button>
          <button>⛔️ {fact.votesFalse}</button>
        </div>
      </li>
    </ul>
  );
}
export default Fact;
