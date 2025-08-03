import React from "react";
import { Link } from "react-router-dom";
import { UserPlus, Users } from "@phosphor-icons/react";

interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  faixa: string;
  dataCadastro: string;
}

const STORAGE_KEY = "alunos_cadastrados";

function loadAlunos(): Aluno[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAlunos(alunos: Aluno[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

export default function CadastroAlunos() {
  const [alunos, setAlunos] = React.useState<Aluno[]>(loadAlunos());
  const [nome, setNome] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [telefone, setTelefone] = React.useState("");
  const [dataNascimento, setDataNascimento] = React.useState("");
  const [faixa, setFaixa] = React.useState("Branca");
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    saveAlunos(alunos);
  }, [alunos]);

  function adicionarAluno(e: React.FormEvent) {
    e.preventDefault();
    if (!nome || !email) return;

    setIsSubmitting(true);

    const novoAluno: Aluno = {
      id: Date.now().toString(),
      nome,
      email,
      telefone,
      dataNascimento,
      faixa,
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    };

    const novosAlunos = [...alunos, novoAluno];
    setAlunos(novosAlunos);
    saveAlunos(novosAlunos);
    
    // Limpar formulário
    setNome("");
    setEmail("");
    setTelefone("");
    setDataNascimento("");
    setFaixa("Branca");
    
    setIsSubmitting(false);
  }

  return (
    <div className="container" style={{ backgroundColor: "#0D1117", minHeight: "100vh" }}>
      <div className="card" style={{ marginTop: "20px" }}>
        <div className="flex flex-between mb-3">
          <div>
            <h1 className="flex gap-2" style={{ color: "#ccdae7", fontSize: "2rem", margin: 0 }}>
              <UserPlus size={32} color="#5542f6" />
              Cadastro de Alunos
            </h1>
            <p style={{ margin: "8px 0 0 0", color: "#a0aec0" }}>
              Cadastre novos alunos na sua academia
            </p>
          </div>
          <Link to="/lista-alunos" className="btn btn-success">
            <Users size={20} />
            Ver Alunos ({alunos.length})
          </Link>
        </div>
        
        <form onSubmit={adicionarAluno} className="grid gap-3">
          <h3 style={{ margin: 0, color: "#ccdae7", fontSize: "1.3rem" }}>Dados do Aluno</h3>
          
          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Nome Completo *</label>
              <input
                type="text"
                className="form-input"
                value={nome}
                onChange={e => setNome(e.target.value)}
                required
                placeholder="Digite o nome completo"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="exemplo@email.com"
              />
            </div>
          </div>

          <div className="grid grid-2">
            <div className="form-group">
              <label className="form-label">Telefone</label>
              <input
                type="tel"
                className="form-input"
                value={telefone}
                onChange={e => setTelefone(e.target.value)}
                placeholder="(11) 99999-9999"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Data de Nascimento</label>
              <input
                type="date"
                className="form-input"
                value={dataNascimento}
                onChange={e => setDataNascimento(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Faixa</label>
            <select
              className="form-select"
              value={faixa}
              onChange={e => setFaixa(e.target.value)}
            >
              <option value="Branca">Branca</option>
              <option value="Cinza">Cinza</option>
              <option value="Amarela">Amarela</option>
              <option value="Laranja">Laranja</option>
              <option value="Verde">Verde</option>
              <option value="Azul">Azul</option>
              <option value="Roxa">Roxa</option>
              <option value="Marrom">Marrom</option>
              <option value="Preta">Preta</option>
            </select>
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className={`btn ${isSubmitting ? 'btn-warning' : 'btn-primary'}`}
            style={{ marginTop: "10px" }}
          >
            {isSubmitting ? "Cadastrando..." : (
              <>
                <UserPlus size={20} />
                Cadastrar Aluno
              </>
            )}
          </button>
        </form>

        <div className="card" style={{ 
          marginTop: "30px", 
          backgroundColor: "rgba(85, 66, 246, 0.1)", 
          border: "1px solid rgba(85, 66, 246, 0.3)" 
        }}>
          <h4 style={{ margin: "0 0 10px 0", color: "#5542f6" }}>💡 Dica</h4>
          <p style={{ margin: 0, color: "#a0aec0", fontSize: "14px" }}>
            Após cadastrar o aluno, você pode visualizar todos os alunos cadastrados clicando no botão "Ver Alunos" acima.
          </p>
        </div>
      </div>
    </div>
  );
} 