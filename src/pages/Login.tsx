import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeSlash } from "@phosphor-icons/react";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<LoginForm>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simular autenticação (em um projeto real, seria uma API)
    setTimeout(() => {
      if (
        formData.email === "cleberson@academia.com" &&
        formData.password === "123456"
      ) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", formData.email);
        navigate("/");
      } else {
        setError("Email ou senha incorretos. Tente novamente.");
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleInputChange = (field: keyof LoginForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  return (
    <div
      className="login-container"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #0D1117 0%, #1a202c 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <div
        className="login-card"
        style={{
          background: "#1a202c",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
          border: "1px solid #2d3748",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div
          className="login-header"
          style={{ textAlign: "center", marginBottom: "30px" }}
        >
          <h1
            style={{
              color: "#ccdae7",
              fontSize: "2rem",
              margin: "0 0 10px 0",
              fontWeight: "700",
            }}
          >
            Master Fight
          </h1>
          <p
            style={{
              color: "#a0aec0",
              margin: 0,
              fontSize: "1rem",
            }}
          >
            Área do Professor
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">
              <User
                size={20}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Email
            </label>
            <input
              type="email"
              className="form-input"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="professor@academia.com"
            />
          </div>

          <div className="form-group">
            <label className="form-label">
              <Lock
                size={20}
                style={{ marginRight: "8px", verticalAlign: "middle" }}
              />
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                className="form-input"
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Digite sua senha"
                required
                style={{ paddingRight: "50px" }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-100%)",
                  background: "none",
                  border: "none",
                  color: "#a0aec0",
                  cursor: "pointer",
                  padding: "4px",
                }}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div
              style={{
                backgroundColor: "rgba(220, 53, 69, 0.1)",
                border: "1px solid rgba(220, 53, 69, 0.3)",
                borderRadius: "8px",
                padding: "12px",
                marginBottom: "20px",
                color: "#dc3545",
                fontSize: "14px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`btn ${isLoading ? "btn-warning" : "btn-primary"}`}
            style={{ width: "100%", marginTop: "10px" }}
          >
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "rgba(255, 193, 7, 0.1)",
            borderRadius: "8px",
            border: "1px solid rgba(255, 193, 7, 0.3)",
          }}
        >
          <p style={{ margin: 0, color: "#ffc107", fontSize: "12px" }}>
            ⚠️ Esta é uma versão de demonstração.
            {/* <br/> Em produção, use autenticação segura. */}
          </p>
        </div>
      </div>
    </div>
  );
}
