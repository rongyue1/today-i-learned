import supabase from "../supabase";

function Fact({ fact, categoryLists, setFactsList }) {
  async function handleClick() {
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ voteInteresting: fact.voteInteresting + 1 })
      .eq("id", fact.id)
      .select();

    if (!error) {
      setFactsList((preFacts) =>
        preFacts.map((f) => (f.id === fact.id ? updatedFact[0] : f))
      );
    } else {
      alert("Oops, something went wrong!");
    }
  }
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
          <button onClick={handleClick}>👍 {fact.voteInteresting}</button>
          <button>🤯 {fact.voteMindblowing}</button>
          <button>⛔️ {fact.voteFalse}</button>
        </div>
      </li>
    </ul>
  );
}
export default Fact;
