function FactList(props) {
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

  function findColor(categoryName) {
    return categoryName.name === props.category;
  }

  return (
    <section>
      <ul className="fact-list">
        <li className="fact">
          <p>
            {props.text}
            <a className="source" href={props.source}>
              (source)
            </a>
          </p>
          <span
            className="tag"
            style={{ backgroundColor: CATEGORIES.find(findColor).color }}
          >
            {props.category}
          </span>
          <div className="vote-buttons">
            <button>👍 {props.votesInteresting}</button>
            <button>🤯 {props.votesMindblowing}</button>
            <button>⛔️ {props.votesFalse}</button>
          </div>
        </li>
      </ul>
    </section>
  );
}
export default FactList;
