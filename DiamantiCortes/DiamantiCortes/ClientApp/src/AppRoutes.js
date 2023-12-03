import { Home } from "./components/Home";
import Login from "./components/Login.js";
import Atendimentos from "./components/Atendimentos.js";
import NovoAgendamento from "./components/NovoAgendamento.js";
import NovoServico from "./components/NovoServico.js";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = [
    {
        path: "/",
        element: <PrivateRoute />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: '/atendimentos',
                element: <Atendimentos />
            },
            {
                path: '/novo-servico',
                element: <NovoServico />
            }
        ]
    },
    {
        path: '/novo-agendamento',
        element: <NovoAgendamento />
    }
  /*{
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
    path: '/novo-agendamento',
    element: <NovoAgendamento />
  },
  {
    path: '/novo-servico',
    element: <NovoServico />
  }*/
];

export default AppRoutes;
