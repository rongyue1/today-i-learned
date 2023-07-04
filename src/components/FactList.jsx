import Fact from "./Fact";

function FactList({ facts, setFactsList, categoryLists }) {
  return (
    <section>
      {facts.map((fact) => (
        <Fact
          key={fact.id}
          fact={fact}
          categoryLists={categoryLists}
          setFactsList={setFactsList}
        />
      ))}
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}
export default FactList;
