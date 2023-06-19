function FactList(props) {
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
          <span className="tag" style={{ backgroundColor: "#3b82f6" }}>
            {props.category}
          </span>
        </li>
      </ul>
    </section>
  );
}
export default FactList;
