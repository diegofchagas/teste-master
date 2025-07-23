import logo2 from "./assets/martial-arts-uniform-svgrepo-com.svg"

import "./App.css";
import {  SignOut } from "@phosphor-icons/react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import AlunosMensalidade from "./pages/AlunosMensalidade";
import Home from "./pages/Home";
import CadastroAlunos from "./pages/CadastroAlunos";
// import ListaAlunos from "./pages/ListaAlunos";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function Navigation() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <header>
      <nav>
        <img src={logo2} alt="" />
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isLoggedIn && (
            <>
              {/* <li>
                <Link to="/cadastro-alunos">Cadastro de Alunos</Link>
              </li> */}
              <li>
                <Link to="/controle-mensalidades">Controle de Mensalidades</Link>
              </li>
            </>
          )}
          {isLoggedIn ? (
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ fontSize: "0.8rem", color: "#a0aec0" }}>
                {userEmail}
              </span>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "#dc3545",
                  cursor: "pointer",
                  padding: "0.75em 1.25em",
                  borderRadius: "99px",
                  fontSize: "0.800em",
                  fontWeight: "bold",
                  transition: "all 1s"
                }}
                title="Sair"
              >
                <SignOut size={16} />
              </button>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <a href="">Cadastre-se</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

function App() {
  return (
    <Router>
      <Navigation />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {/* <Route 
          path="/cadastro-alunos" 
          element={
            <ProtectedRoute>
              <CadastroAlunos />
            </ProtectedRoute>
          } 
        /> */}
        {/* <Route 
          path="/lista-alunos" 
          element={
            <ProtectedRoute>
              <ListaAlunos />
            </ProtectedRoute>
          } 
        /> */}
        <Route 
          path="/controle-mensalidades" 
          element={
            <ProtectedRoute>
              <AlunosMensalidade />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;
