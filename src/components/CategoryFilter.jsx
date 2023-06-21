function CategoryFilter({ categoryLists }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-category"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3b82f6, #ef4444, #16a34a, #eab308)",
            }}
          >
            all
          </button>
        </li>
        {categoryLists.map((category) => (
          <li className="category" key={category.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
export default CategoryFilter;
