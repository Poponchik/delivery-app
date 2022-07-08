import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Registration from "./registration"
import Autorization from "./autorization"
import Shop from "./shop"
import ShoppingCart from "./cart"
import History from "./history"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/registration" element={<Registration/>} />
        <Route path="/auth/login" element={<Autorization/>} />
        <Route path="/" element={<Shop/>} />
        <Route path="/shopping" element={<ShoppingCart/>}/>
        <Route path="/history" element={<History/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
