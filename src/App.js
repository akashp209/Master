import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./components/header/Header";
import "antd/dist/antd.css";
import Home from "./Home";
import LoginPage from "./components/Login/LoginPage";
import Register from "./components/Register/Register";

function App() {
  return (
    // <div className="App">
    //   <Router>
    //   <Routes>
    //     <Route path='/' element={<Home />}/>
    //     <Route path='/login' element={<Login  />}/>
    //   </Routes>
    //  </Router>

    // </div>
    <>
    
     <Router>
     <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />}>
          </Route>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/register" element={<Register />}>
          </Route>
        </Routes>
    </Router>
    </>
  );
}

export default App;
