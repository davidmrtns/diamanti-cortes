import { Home } from "./components/Home";
import Login from "./components/Login.js";
import Atendimentos from "./components/Atendimentos.js";
import NovoAtendimento from "./components/NovoAtendimento.js";
import NovoServico from "./components/NovoServico.js";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/atendimentos',
    element: <Atendimentos />
  },
  {
    path: '/novo-atendimento',
    element: <NovoAtendimento />
  },
  {
    path: '/novo-servico',
    element: <NovoServico />
  }
];

export default AppRoutes;
