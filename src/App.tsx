import { MovieData, TvData } from "./components/FireBase/index";
import "./App.css";

function App() {
  return (
    <>
      <h2>Get Movie Data</h2>
      <MovieData />
      <h2>Get Tv Data</h2>
      <TvData />
    </>
  );
}

export default App;
