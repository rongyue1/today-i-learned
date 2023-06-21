function CategoryFilter() {
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
        {CATEGORIES.map((category) => (
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
