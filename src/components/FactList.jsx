import Fact from "./Fact";
import { useState } from "react";

function FactList({ facts, categoryLists }) {
  return (
    <section>
      {facts.map((fact) => (
        <Fact key={fact.id} fact={fact} categoryLists={categoryLists} />
      ))}
      {/* {console.log(facts)} */}
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}
export default FactList;
