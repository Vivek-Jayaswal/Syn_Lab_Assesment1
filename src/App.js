import { BrowserRouter, NavLink, Outlet, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import { ToastContainer } from "react-toastify";
import "./App.css"
import 'react-toastify/dist/ReactToastify.css';
import "./toastify.css";


const className = ({ isActive }) => `link ${isActive ? "active-link" : ""}`;

const AppLayout = () => {
  return (
    <div className="app">
      <div className="navbar">
        <nav>
          <NavLink className={className} to={"/"}>Home</NavLink>
          <NavLink className={className} to={"/create"}>Create User</NavLink>
        </nav>
      </div>

      <div className="outlet">
        <Outlet />
      </div>

    </div>
  )
}

function App() {
  return (
    <>
      <ToastContainer className="react__toast"/>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/edit/:id" element={<EditUser />} />
            <Route path="/create" element={<CreateUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
