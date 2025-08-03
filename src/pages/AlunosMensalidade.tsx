import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Trash,
  User,
  CurrencyCircleDollar,
  CheckCircle,
  XCircle,
  MagnifyingGlass,
  Plus,
  Users,
} from "@phosphor-icons/react";

interface AlunoMensalidade {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  faixa: string;
  pagou: boolean;
  dataPagamento?: string;
  valor: number;
  valorAdicional?: number;
  descricaoAdicional?: string;
  dataVencimento: string;
  dataCadastro: string;
}

const faixasDisponiveis = [
  "Branca",
  "Cinza e Branca",
  "Cinza",
  "Cinza e Preta",
  "Amarela e Branca",
  "Amarela",
  "Amarela e Preta",
  "Laranja e Branca",
  "Laranja",
  "Verde e Branca",
  "Verde",
  "Verde e Preta",
  "Laranja e Preta",
  "Azul",
  "Roxa",
  "Marrom",
  "Preta Lisa",
  "Preta (2°grau) Professor",
  "Preta (3°grau) Professor",
  "Preta (4°grau) Professor",
  "Preta (5°grau) Professor",
  "Preta (6°grau) Professor",
  "Vermelha e Preta (7°grau)",
  "Vermelha e Branca (8°grau)",
  "Vermelha (9°grau) Grao Mestre",
  "Preta (10°grau) Venerável Mestre",
];

const STORAGE_KEY = "alunos_mensalidade";

function loadAlunos(): AlunoMensalidade[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveAlunos(alunos: AlunoMensalidade[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
}

export default function AlunosMensalidade() {
  const [alunos, setAlunos] = React.useState<AlunoMensalidade[]>(loadAlunos());
  const [searchTerm, setSearchTerm] = React.useState("");
  const [mesFiltro, setMesFiltro] = React.useState<string>("");
  const [novoAluno, setNovoAluno] = React.useState({
    nome: "",
    email: "",
    telefone: "",
    faixa: "Branca",
    valor: 150,
    valorAdicional: 0,
    descricaoAdicional: "",
    dataPagamento: "",
  });

  React.useEffect(() => {
    saveAlunos(alunos);
  }, [alunos]);

  function adicionarAluno(e: React.FormEvent) {
    e.preventDefault();
    if (!novoAluno.nome || !novoAluno.email) return;

    const hoje = new Date();
    const dataVencimento = new Date(
      hoje.getFullYear(),
      hoje.getMonth() + 1,
      hoje.getDate()
    )
      .toISOString()
      .split("T")[0];

    const aluno: AlunoMensalidade = {
      id: Date.now().toString(),
      nome: novoAluno.nome,
      email: novoAluno.email,
      telefone: novoAluno.telefone,
      faixa: novoAluno.faixa,
      pagou: false,
      valor: novoAluno.valor,
      valorAdicional: novoAluno.valorAdicional,
      descricaoAdicional: novoAluno.descricaoAdicional,
      dataVencimento,
      dataCadastro: hoje.toLocaleDateString("pt-BR"),
      dataPagamento: novoAluno.dataPagamento || "",
    };

    setAlunos([...alunos, aluno]);
    setNovoAluno({
      nome: "",
      email: "",
      telefone: "",
      faixa: "Branca",
      valor: 150,
      valorAdicional: 0,
      descricaoAdicional: "",
      dataPagamento: "",
    });
  }

  function togglePagamento(id: string) {
    setAlunos(
      alunos.map((aluno) => {
        if (aluno.id === id) {
          const pagou = !aluno.pagou;
          return {
            ...aluno,
            pagou,
            dataPagamento: pagou ? new Date().toISOString().split("T")[0] : "",
          };
        }
        return aluno;
      })
    );
  }

  function removerAluno(id: string) {
    if (window.confirm("Tem certeza que deseja remover este aluno?")) {
      setAlunos(alunos.filter((aluno) => aluno.id !== id));
    }
  }

  // Filtro por mês
  function filtrarPorMes(alunos: AlunoMensalidade[], mes: string) {
    if (!mes) return alunos;
    return alunos.filter((aluno) => {
      // Considera data de pagamento se pago, senão data de vencimento
      const data =
        aluno.pagou && aluno.dataPagamento
          ? aluno.dataPagamento
          : aluno.dataVencimento;
      return data && data.startsWith(mes);
    });
  }

  // Filtro de busca + mês
  const alunosFiltrados = filtrarPorMes(
    alunos.filter(
      (aluno) =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        aluno.faixa.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    mesFiltro
  );

  // Totais considerando filtro de mês
  const totalAlunos = alunosFiltrados.length;
  const alunosPagaram = alunosFiltrados.filter((aluno) => aluno.pagou).length;
  const alunosPendentes = totalAlunos - alunosPagaram;
  const valorTotal = alunosFiltrados.reduce(
    (total, aluno) => total + aluno.valor + (aluno.valorAdicional || 0),
    0
  );
  const valorRecebido = alunosFiltrados
    .filter((aluno) => aluno.pagou)
    .reduce(
      (total, aluno) => total + aluno.valor + (aluno.valorAdicional || 0),
      0
    );

  // Meses disponíveis para filtro
  const mesesDisponiveis = Array.from(
    new Set(
      alunos.flatMap((aluno) => {
        const datas = [];
        if (aluno.dataVencimento) datas.push(aluno.dataVencimento.slice(0, 7));
        if (aluno.dataPagamento) datas.push(aluno.dataPagamento.slice(0, 7));
        return datas;
      })
    )
  )
    .sort()
    .reverse();

  return (
    <div className="mensalidades-container">
      <div className="mensalidades-content">
        {/* Header */}
        <div className="mensalidades-header">
          <div className="flex gap-2 mb-2">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <ArrowLeft size={24} />
            </Link>
          </div>
          <h1>Controle de Mensalidades</h1>
          <p>
            Gerencie os pagamentos dos seus alunos de forma simples e eficiente
          </p>
        </div>

        {/* Filtro por mês */}
        <div
          style={{
            margin: "20px 0",
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <label htmlFor="mesFiltro" style={{ color: "#a0aec0" }}>
            Filtrar por mês:
          </label>
          <select
            id="mesFiltro"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(e.target.value)}
            style={{ padding: "6px 12px", borderRadius: "6px" }}
          >
            <option value="">Todos</option>
            {mesesDisponiveis.map((mes) => (
              <option key={mes} value={mes}>
                {mes.split("-").reverse().join("/")}
              </option>
            ))}
          </select>
        </div>

        {/* Estatísticas */}
        <div className="mensalidades-stats">
          <div className="stat-card">
            <div className="stat-number">{totalAlunos}</div>
            <div className="stat-label">Total de Alunos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#28a745" }}>
              {alunosPagaram}
            </div>
            <div className="stat-label">Pagamentos Confirmados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#ffc107" }}>
              {alunosPendentes}
            </div>
            <div className="stat-label">Pagamentos Pendentes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#17a2b8" }}>
              R$ {valorRecebido.toFixed(2)}
            </div>
            <div className="stat-label">Valor Total Recebido</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: "#6c757d" }}>
              R$ {valorTotal.toFixed(2)}
            </div>
            <div className="stat-label">Valor Total Mensalidades</div>
          </div>
        </div>

        {/* Formulário de Adição */}
        <div className="mensalidades-form">
          <h3 style={{ marginBottom: "20px", color: "#333" }}>
            <Plus
              size={24}
              style={{ marginRight: "10px", verticalAlign: "middle" }}
            />
            Adicionar Novo Aluno
          </h3>

          <form onSubmit={adicionarAluno}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Nome do Aluno *</label>
                <input
                  type="text"
                  className="form-input"
                  value={novoAluno.nome}
                  onChange={(e) =>
                    setNovoAluno({ ...novoAluno, nome: e.target.value })
                  }
                  required
                  placeholder="Digite o nome completo"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  className="form-input"
                  value={novoAluno.email}
                  onChange={(e) =>
                    setNovoAluno({ ...novoAluno, email: e.target.value })
                  }
                  placeholder="exemplo@email.com"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                <User size={20} />
                Adicionar
              </button>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Telefone</label>
                <input
                  type="tel"
                  className="form-input"
                  value={novoAluno.telefone}
                  onChange={(e) =>
                    setNovoAluno({ ...novoAluno, telefone: e.target.value })
                  }
                  placeholder="(11) 99999-9999"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Faixa</label>
                <select
                  className="form-select"
                  value={novoAluno.faixa}
                  onChange={(e) =>
                    setNovoAluno({ ...novoAluno, faixa: e.target.value })
                  }
                >
                  {faixasDisponiveis.map((faixa) => (
                    <option key={faixa} value={faixa}>
                      {faixa}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Valor da Mensalidade</label>
                <input
                  type="number"
                  className="form-input"
                  value={novoAluno.valor}
                  onChange={(e) =>
                    setNovoAluno({
                      ...novoAluno,
                      valor: Number(e.target.value),
                    })
                  }
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Data de Pagamento</label>
                <input
                  type="date"
                  className="form-input"
                  value={novoAluno.dataPagamento}
                  onChange={(e) =>
                    setNovoAluno({
                      ...novoAluno,
                      dataPagamento: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Valor Adicional</label>
                <input
                  type="number"
                  className="form-input"
                  value={novoAluno.valorAdicional}
                  onChange={(e) =>
                    setNovoAluno({
                      ...novoAluno,
                      valorAdicional: Number(e.target.value),
                    })
                  }
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Descrição do Valor Adicional
                </label>
                <input
                  type="text"
                  className="form-input"
                  value={novoAluno.descricaoAdicional}
                  onChange={(e) =>
                    setNovoAluno({
                      ...novoAluno,
                      descricaoAdicional: e.target.value,
                    })
                  }
                  placeholder="Ex: Kimono, Faixa, Equipamento..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Busca */}
        <div className="search-section">
          <div className="flex gap-2">
            <MagnifyingGlass size={20} color="#666" />
            <input
              type="text"
              className="search-input"
              placeholder="Buscar por nome, email ou faixa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabela de Alunos */}
        <div className="mensalidades-table">
          <div className="table-header">
            <div className="flex flex-between">
              <span>Lista de Alunos ({alunosFiltrados.length})</span>
              <Link
                to="/cadastro-alunos"
                className="btn btn-success"
                style={{ fontSize: "14px", padding: "8px 16px" }}
              >
                <Users size={16} />
                Ver Todos os Alunos
              </Link>
            </div>
          </div>

          <div className="table-content">
            {alunosFiltrados.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <CurrencyCircleDollar size={64} />
                </div>
                <h3>Nenhum aluno encontrado</h3>
                <p>
                  {searchTerm
                    ? "Tente ajustar os termos de busca"
                    : "Comece adicionando seu primeiro aluno para controle de mensalidades"}
                </p>
                {!searchTerm && (
                  <button
                    onClick={() =>
                      (
                        document.querySelector(
                          'input[type="text"]'
                        ) as HTMLInputElement
                      )?.focus()
                    }
                    className="btn btn-primary"
                  >
                    <Plus size={20} />
                    Adicionar Primeiro Aluno
                  </button>
                )}
              </div>
            ) : (
              alunosFiltrados.map((aluno) => (
                <div key={aluno.id} className="aluno-row">
                  <div className="aluno-info">
                    <div className="aluno-avatar">
                      {aluno.nome.charAt(0).toUpperCase()}
                    </div>
                    <div className="aluno-details">
                      <h4>{aluno.nome}</h4>
                      <p>{aluno.email}</p>
                      {aluno.telefone && <p>{aluno.telefone}</p>}
                    </div>
                  </div>
                  <div>
                    <span
                      className="status-badge"
                      style={{
                        backgroundColor: "#e3f2fd",
                        color: "#1976d2",
                      }}
                    >
                      {aluno.faixa}
                    </span>
                  </div>
                  <div>
                    <div className="flex gap-1">
                      <CurrencyCircleDollar size={16} color="#666" />
                      <span>R$ {aluno.valor.toFixed(2)}</span>
                    </div>
                    {aluno.valorAdicional && aluno.valorAdicional > 0 && (
                      <div
                        className="flex gap-1"
                        style={{ fontSize: "0.85em", color: "#666" }}
                      >
                        <span>+ R$ {aluno.valorAdicional.toFixed(2)}</span>
                        {aluno.descricaoAdicional && (
                          <span>({aluno.descricaoAdicional})</span>
                        )}
                      </div>
                    )}
                    <div
                      style={{
                        fontSize: "0.9em",
                        color: "#28a745",
                        fontWeight: "bold",
                      }}
                    >
                      Total: R${" "}
                      {(aluno.valor + (aluno.valorAdicional || 0)).toFixed(2)}
                    </div>
                    <small style={{ color: "#666" }}>
                      Venc:{" "}
                      {new Date(aluno.dataVencimento).toLocaleDateString(
                        "pt-BR"
                      )}
                    </small>
                    {aluno.pagou && aluno.dataPagamento && (
                      <div style={{ color: "#28a745", fontSize: "0.85em" }}>
                        Pgto:{" "}
                        {new Date(aluno.dataPagamento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </div>
                    )}
                  </div>
                  <div className="pagamento-status">
                    <span
                      className={`status-indicator ${
                        aluno.pagou ? "status-pago" : "status-pendente"
                      }`}
                    ></span>
                    <span
                      className={`status-badge ${
                        aluno.pagou ? "pago" : "pendente"
                      }`}
                    >
                      {aluno.pagou ? "Pago" : "Pendente"}
                    </span>
                    {aluno.pagou && aluno.dataPagamento && (
                      <small style={{ color: "#666" }}>
                        {new Date(aluno.dataPagamento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </small>
                    )}
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => togglePagamento(aluno.id)}
                      className={`btn-toggle ${
                        aluno.pagou ? "pago" : "pendente"
                      }`}
                    >
                      {aluno.pagou ? (
                        <CheckCircle size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {aluno.pagou ? "Marcar Pendente" : "Marcar Pago"}
                    </button>
                    <button
                      onClick={() => removerAluno(aluno.id)}
                      className="btn btn-danger"
                      style={{ padding: "8px 12px", fontSize: "14px" }}
                    >
                      <Trash size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
