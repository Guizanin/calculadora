import { Calculator } from "./main/components/Calculator";

function App() {
  return (
    <div className="App">
      <Calculator />
      <div className="overlay">
        <div className="header">
          <h2>Histórico</h2>
        </div>
      </div>
    </div>
  );
}

export default App;
