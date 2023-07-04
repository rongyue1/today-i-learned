import supabase from "../supabase";

function Fact({ fact, categoryLists, setFactsList }) {
  async function handleClick(e) {
    const buttonName = e.target.value;
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [buttonName]: fact[buttonName] + 1 })
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
          <button onClick={(e) => handleClick(e)} value="voteInteresting">
            👍 {fact.voteInteresting}
          </button>
          <button onClick={(e) => handleClick(e)} value="voteMindblowing">
            🤯 {fact.voteMindblowing}
          </button>
          <button onClick={(e) => handleClick(e)} value="voteFalse">
            ⛔️ {fact.voteFalse}
          </button>
        </div>
      </li>
    </ul>
  );
}
export default Fact;
