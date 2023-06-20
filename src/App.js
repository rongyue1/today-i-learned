import "./style.css";
import Header from "./components/Header";
import NewFactForm from "./components/NewFactForm";
import FactList from "./components/FactList";
import CategoryFilter from "./components/CategoryFilter";

function App() {
  return (
    <>
      <Header />
      <NewFactForm />
      <main>
        <CategoryFilter />
        <FactList />
      </main>
    </>
  );
}

export default App;
