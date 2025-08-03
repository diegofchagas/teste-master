import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trash, User } from "@phosphor-icons/react";

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

export default function ListaAlunos() {
  const [alunos, setAlunos] = React.useState<Aluno[]>([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Carregar dados quando o componente montar
  React.useEffect(() => {
    const dadosCarregados = loadAlunos();
    setAlunos(dadosCarregados);
  }, []);

  // Salvar dados quando alunos mudarem
  React.useEffect(() => {
    if (alunos.length > 0) {
      saveAlunos(alunos);
    }
  }, [alunos]);

  // Recarregar dados a cada 2 segundos para sincronização
  React.useEffect(() => {
    const interval = setInterval(() => {
      const dadosAtualizados = loadAlunos();
      if (JSON.stringify(dadosAtualizados) !== JSON.stringify(alunos)) {
        setAlunos(dadosAtualizados);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [alunos]);

  function removerAluno(id: string) {
    if (window.confirm("Tem certeza que deseja remover este aluno?")) {
      const novosAlunos = alunos.filter(aluno => aluno.id !== id);
      setAlunos(novosAlunos);
      saveAlunos(novosAlunos);
    }
  }

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.faixa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container" style={{ backgroundColor: "#0D1117", minHeight: "100vh" }}>
      <div className="card" style={{ marginTop: "20px" }}>
        <div className="flex flex-between mb-3">
          <div className="flex gap-2">
            <Link to="/cadastro-alunos" style={{ textDecoration: "none", color: "#5542f6" }}>
              <ArrowLeft size={24} />
            </Link>
            <h1 style={{ margin: 0, color: "#ccdae7", fontSize: "2rem" }}>Alunos Cadastrados</h1>
          </div>
          <Link to="/cadastro-alunos" className="btn btn-success">
            <User size={20} />
            Novo Aluno
          </Link>
        </div>

        <div className="form-group">
          <input
            type="text"
            className="form-input"
            placeholder="Buscar por nome, email ou faixa..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mb-2">
          <p style={{ color: "#a0aec0", margin: 0 }}>
            Total de alunos: <strong>{alunos.length}</strong>
            {searchTerm && ` | Resultados da busca: ${filteredAlunos.length}`}
          </p>
        </div>

        {filteredAlunos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <User size={64} />
            </div>
            <h3>
              {searchTerm ? "Nenhum aluno encontrado" : "Nenhum aluno cadastrado"}
            </h3>
            <p>
              {searchTerm ? "Tente ajustar os termos de busca" : "Comece cadastrando seu primeiro aluno"}
            </p>
            {!searchTerm && (
              <Link to="/cadastro-alunos" className="btn btn-primary">
                Cadastrar Primeiro Aluno
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-2">
            {filteredAlunos.map(aluno => (
              <div key={aluno.id} className="card fade-in">
                <div className="flex flex-between">
                  <div className="flex gap-2">
                    <div className="aluno-avatar">
                      {aluno.nome.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 style={{ margin: "0 0 8px 0", color: "#ccdae7" }}>{aluno.nome}</h4>
                      <p style={{ margin: "4px 0", color: "#a0aec0" }}><strong>Email:</strong> {aluno.email}</p>
                      {aluno.telefone && <p style={{ margin: "4px 0", color: "#a0aec0" }}><strong>Telefone:</strong> {aluno.telefone}</p>}
                      {aluno.dataNascimento && <p style={{ margin: "4px 0", color: "#a0aec0" }}><strong>Data de Nascimento:</strong> {aluno.dataNascimento}</p>}
                      <p style={{ margin: "4px 0", color: "#a0aec0" }}><strong>Faixa:</strong> {aluno.faixa}</p>
                      <p style={{ margin: "4px 0", fontSize: "0.9em", color: "#718096" }}><strong>Cadastrado em:</strong> {aluno.dataCadastro}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => removerAluno(aluno.id)}
                    className="btn btn-danger"
                    style={{ padding: "4px 8px", fontSize: "14px" }}
                  >
                    <Trash size={16} />
                    Remover
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 