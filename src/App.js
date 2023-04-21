import DefaultFetch from "./components/DefaultFetch";
import Search from "./components/Search";
import "./App.css";
import LoadingSpinner from "./components/LoadingSpinner";

function App() {
  return (
    <div className="App">
      <Search />
      <DefaultFetch />
    </div>
  );
}

export default App;
