import McqScreen  from './components/McqScreen';
import questionsData from './common/Questions.json';
import './App.css'
function App() {
  return (
    <div className="App">
      <McqScreen questionsData={questionsData} />
    </div>
  );
}

export default App;
