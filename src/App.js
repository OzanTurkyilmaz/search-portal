import MainPage from "./components/MainPage/MainPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Search from "./components/Search/Search";
import AddLinkPage from "./components/AddLinkPage/AddLinkPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<MainPage />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/addlink" element={<AddLinkPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
