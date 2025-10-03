import { BrowserRouter, Routes , Route } from "react-router-dom";
import Accueil from "../pages/accueil.jsx";
import Login from "../pages/login.jsx";
import Register from "../pages/register.jsx";
import PrivateRoute from "../components/Privateroute.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        {/*route privée*/}
        <Route path="/"
          element={<PrivateRoute>
            <Accueil />
          </PrivateRoute>}/>
      </Routes>
    </BrowserRouter>
  );
}