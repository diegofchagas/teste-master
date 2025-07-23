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
  Money
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
  dataVencimento: string;
  dataCadastro: string;
}

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
  const [novoAluno, setNovoAluno] = React.useState({
    nome: "",
    email: "",
    telefone: "",
    faixa: "Branca",
    valor: 100
  });

  React.useEffect(() => {
    saveAlunos(alunos);
  }, [alunos]);

  function adicionarAluno(e: React.FormEvent) {
    e.preventDefault();
    if (!novoAluno.nome || !novoAluno.email) return;

    const aluno: AlunoMensalidade = {
      id: Date.now().toString(),
      nome: novoAluno.nome,
      email: novoAluno.email,
      telefone: novoAluno.telefone,
      faixa: novoAluno.faixa,
      pagou: false,
      valor: novoAluno.valor,
      dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    };

    setAlunos([...alunos, aluno]);
    setNovoAluno({ nome: "", email: "", telefone: "", faixa: "Branca", valor: 100 });
  }

  function togglePagamento(id: string) {
    setAlunos(alunos.map(aluno => {
      if (aluno.id === id) {
        return {
          ...aluno,
          pagou: !aluno.pagou,
          dataPagamento: !aluno.pagou ? new Date().toLocaleDateString('pt-BR') : undefined
        };
      }
      return aluno;
    }));
  }

  function removerAluno(id: string) {
    if (window.confirm("Tem certeza que deseja remover este aluno?")) {
      setAlunos(alunos.filter(aluno => aluno.id !== id));
    }
  }

  const filteredAlunos = alunos.filter(aluno =>
    aluno.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    aluno.faixa.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalAlunos = alunos.length;
  const alunosPagaram = alunos.filter(aluno => aluno.pagou).length;
  const alunosPendentes = totalAlunos - alunosPagaram;
  const valorTotal = alunos.reduce((total, aluno) => total + aluno.valor, 0);
  const valorRecebido = alunos.filter(aluno => aluno.pagou).reduce((total, aluno) => total + aluno.valor, 0);

  return (
    <div className="mensalidades-container">
      <div className="mensalidades-content">
        {/* Header */}
        <div className="mensalidades-header">
          <div className="flex gap-2 mb-2">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              <ArrowLeft size={24} />
            </Link>
          </div>
          <h1>Controle de Mensalidades</h1>
          <p>Gerencie os pagamentos dos seus alunos de forma simples e eficiente</p>
        </div>

        {/* Estatísticas */}
        <div className="mensalidades-stats">
          <div className="stat-card">
            <div className="stat-number">{totalAlunos}</div>
            <div className="stat-label">Total de Alunos</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#28a745' }}>{alunosPagaram}</div>
            <div className="stat-label">Pagamentos Confirmados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#ffc107' }}>{alunosPendentes}</div>
            <div className="stat-label">Pagamentos Pendentes</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#17a2b8' }}>
              R$ {valorRecebido.toFixed(2)}
            </div>
            <div className="stat-label">Valor Total Recebido</div>
          </div>
          <div className="stat-card">
            <div className="stat-number" style={{ color: '#6c757d' }}>
              R$ {valorTotal.toFixed(2)}
            </div>
            <div className="stat-label">Valor Total Mensalidades</div>
          </div>
        </div>

        {/* Formulário de Adição */}
        <div className="mensalidades-form">
          <h3 style={{ marginBottom: '20px', color: '#333' }}>
            <Plus size={24} style={{ marginRight: '10px', verticalAlign: 'middle' }} />
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
                  onChange={e => setNovoAluno({...novoAluno, nome: e.target.value})}
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
                  onChange={e => setNovoAluno({...novoAluno, email: e.target.value})}
                  required
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
                  onChange={e => setNovoAluno({...novoAluno, telefone: e.target.value})}
                  placeholder="(11) 99999-9999"
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Faixa</label>
                <select
                  className="form-select"
                  value={novoAluno.faixa}
                  onChange={e => setNovoAluno({...novoAluno, faixa: e.target.value})}
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
              
              <div className="form-group">
                <label className="form-label">Valor da Mensalidade</label>
                <input
                  type="number"
                  className="form-input"
                  value={novoAluno.valor}
                  onChange={e => setNovoAluno({...novoAluno, valor: Number(e.target.value)})}
                  min="0"
                  step="0.01"
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
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Tabela de Alunos */}
        <div className="mensalidades-table">
          <div className="table-header">
            <div className="flex flex-between">
              <span>Lista de Alunos ({filteredAlunos.length})</span>
              <Link to="/cadastro-alunos" className="btn btn-success" style={{ fontSize: '14px', padding: '8px 16px' }}>
                <Users size={16} />
                Ver Todos os Alunos
              </Link>
            </div>
          </div>
          
          <div className="table-content">
            {filteredAlunos.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">
                  <CurrencyCircleDollar size={64} />
                </div>
                <h3>Nenhum aluno encontrado</h3>
                <p>
                  {searchTerm 
                    ? "Tente ajustar os termos de busca" 
                    : "Comece adicionando seu primeiro aluno para controle de mensalidades"
                  }
                </p>
                {!searchTerm && (
                  <button 
                    onClick={() => (document.querySelector('input[type="text"]') as HTMLInputElement)?.focus()}
                    className="btn btn-primary"
                  >
                    <Plus size={20} />
                    Adicionar Primeiro Aluno
                  </button>
                )}
              </div>
            ) : (
              filteredAlunos.map(aluno => (
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
                    <span className="status-badge" style={{ 
                      backgroundColor: '#e3f2fd', 
                      color: '#1976d2' 
                    }}>
                      {aluno.faixa}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex gap-1">
                      <Money size={16} color="#666" />
                      <span>R$ {aluno.valor.toFixed(2)}</span>
                    </div>
                    <small style={{ color: '#666' }}>
                      Venc: {new Date(aluno.dataVencimento).toLocaleDateString('pt-BR')}
                    </small>
                  </div>
                  
                  <div className="pagamento-status">
                    <span className={`status-indicator ${aluno.pagou ? 'status-pago' : 'status-pendente'}`}></span>
                    <span className={`status-badge ${aluno.pagou ? 'pago' : 'pendente'}`}>
                      {aluno.pagou ? 'Pago' : 'Pendente'}
                    </span>
                    {aluno.pagou && aluno.dataPagamento && (
                      <small style={{ color: '#666' }}>
                        {aluno.dataPagamento}
                      </small>
                    )}
                  </div>
                  
                  <div className="action-buttons">
                    <button
                      onClick={() => togglePagamento(aluno.id)}
                      className={`btn-toggle ${aluno.pagou ? 'pago' : 'pendente'}`}
                    >
                      {aluno.pagou ? <CheckCircle size={16} /> : <XCircle size={16} />}
                      {aluno.pagou ? 'Marcar Pendente' : 'Marcar Pago'}
                    </button>
                    
                    <button
                      onClick={() => removerAluno(aluno.id)}
                      className="btn btn-danger"
                      style={{ padding: '8px 12px', fontSize: '14px' }}
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