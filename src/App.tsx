import logo from "./assets/bjjlink-logo.svg";
import logo2 from "./assets/martial-arts-uniform-svgrepo-com.svg"
import professor from "./assets/professor.jpg";

import "./App.css";
import { ClipboardText, CurrencyCircleDollar, InstagramLogo, Person, UserCheck, UserPlus, WhatsappLogo } from "@phosphor-icons/react";
import { GiBlackBelt } from "react-icons/gi";

function App() {
  return (
    <>
      <header>
        <nav>
          <img src={logo2} alt="" />
          <ul>
            <li>
              {" "}
              <a href="">Login</a>
            </li>
            <li>
              {" "}
              <a href="">Cadastre-se</a>
            </li>
          </ul>
        </nav>
      </header>

      <div className="container-h1">
        <h1>
          Toda a gestão da sua academia de Jiu-Jitsu em um só lugar, sem
          <span className="emphasis">complicação</span>.
        </h1>
      </div>

      <div className="container-info">
        <p>
          Desenvolvido por quem entende de Jiu-Jitsu, com a confiança de quem já
          transformou sua gestão com tecnologia.
        </p>

        <button>Cadastre-se agora</button>
      </div>

      <section>
        <h2>Funcionalidades</h2>

        <div className="features">
          <p>
            Aqui você encontrará uma visão reduzida de todas as ferramentas e
            funcionalidades do nossa plataforma de controle de academia de
            lutas. Projetamos cuidadosamente{" "}
            <span className="text-wrapping">
              esses recursos para ajudar você a gerenciar sua academia de forma
              eficiente e otimizada .
            </span>
          </p>

          <ul>
            <li>
              <UserPlus size={32} />
              <strong>Cadastro de Alunos</strong>
              <span>Controle todal de alunos inscritos</span>
            </li>
            <li>
              <Person size={32} />
              <strong>Registro de Dados Biométricos</strong>
              <span>
                Controle de medidas físicas e dados biométricos dos alunos
              </span>
            </li>
            <li>
              <CurrencyCircleDollar size={32} />
              <span>Mensalidades</span>
              <span>
                Os alunos tem a opção de pagar as mensalidades de forma online
              </span>
            </li>
            <li>
              <GiBlackBelt size={34} />
              <strong>Controle de Promoção e Faixa</strong>
               <span>Graduações com upload do certificado da faixa</span>
            </li>

            <li>
              <ClipboardText size={32} />
              <strong>Sistema de Avaliação</strong>
              <span> Análise, Desempenho, Progresso</span>
            </li>

            <li>
              <UserCheck size={32} />
              Check-in Automatizado
              <span>Registro de presença ou acesso</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="teachers">

      <h3>Colaboradores</h3>

      <p>
        Nossos colaboradores são profissionais experientes e apaixonados por
        artes marciais, cada um especializado em uma modalidade específica. Eles
        têm um profundo conhecimento das nuances técnicas, das demandas físicas
        e das melhores práticas relacionadas a cada arte marcial.
        </p>
        <span className="paragraph">Você gerencia uma academia de luta/artes marciais, mas não achou na
        listagem abaixo sua modalidade? Seja um de nossos colaboradores, e tenha
        acesso ilimitado a todos os recursos de nosso sistema. Entre em contado
        pelo e-mail masterfights@masterfights.com , e aguarde nosso contato.</span> 


      <div className="team">
        <div className="card">
          <img src={professor} alt="" />
          <div className="info-teachers">
            <strong>Mestre Cleberson Luiz Faria</strong>
              <span className="category">Jiu Jtisu</span>
              <small>(Equipe Jiu Jtisu)</small>
            <span>Graduado na faixa preta de Jiu-Jitsu e formado em Educação Física.</span>
            </div>
        </div>
        <div className="card">
          <img src={professor} alt="" />
          <div className="info-teachers">
            <strong>Mestre Cleberson Luiz Faria</strong>
              <span className="category">Jiu Jtisu</span>
              <small>(Equipe Jiu Jtisu)</small>
            <span>Graduado na faixa preta de Jiu-Jitsu e formado em Educação Física.</span>
            </div>
        </div>
        <div className="card">
          <img src={professor} alt="" />
          <div className="info-teachers">
            <strong>Mestre Cleberson Luiz Faria</strong>
              <span className="category">Jiu Jtisu</span>
              <small>(Equipe Jiu Jtisu)</small>
            <span>Graduado na faixa preta de Jiu-Jitsu e formado em Educação Física.</span>
            </div>
        </div>
        <div className="card">
          <img src={professor} alt="" />
          <div className="info-teachers">
            <strong>Mestre Cleberson Luiz Faria</strong>
              <span className="category">Jiu Jtisu</span>
              <small>(Equipe Jiu Jtisu)</small>
            <span>Graduado na faixa preta de Jiu-Jitsu e formado em Educação Física.</span>
            </div>
        </div>
      </div>

      </section>

      <div className="form">
        <p>Para mais informações entre em contato conosco</p>

    <div> </div>
        <div>
          <form>
            <label>Nome: </label>
            <input type="text" />
            <label>Email: </label>
            <input type="email" placeholder="seuemail@mail.com" />
            <label>Assunto: </label>
            <input type="text" />
            <label>Mensagem:</label>
            <textarea name="" id=""></textarea>

            <button>enviar</button>
          </form>
        </div>
      </div>

      <footer>
        <span>Master Fight</span>
        <div>
          <a href=""> <InstagramLogo size={32} weight="fill"/></a>
          <a href=""><WhatsappLogo size={32} weight="fill"/></a>
        </div>
        <p>&#169; 2025 copyright all right reserved</p>
      </footer>
    </>
  );
}

export default App;
