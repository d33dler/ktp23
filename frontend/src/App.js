import MainForm from "./components/MainForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1 style={{display: 'flex', justifyContent: 'center'}}>Rental Price Predictor</h1>
      <MainForm />
    </div>
  );
}

export default App;
