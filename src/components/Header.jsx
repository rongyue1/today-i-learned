function Header({ showForm, setShowForm }) {
  const appName = "Today I Learned";

  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appName}</h1>
      </div>

      <button
        onClick={() => setShowForm((show) => !show)}
        className="btn btn-large"
      >
        {showForm ? "close" : "Share a fact"}
      </button>
    </header>
  );
}
export default Header;
