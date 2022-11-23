import { CalendarCheck, ChalkboardTeacher } from "phosphor-react";

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: "pages",
  type: "group",
  children: [
    {
      id: "painel-evento",
      title: "Meu evento",
      type: "item",
      url: "organizador/painel-evento",
      icon: CalendarCheck,
      breadcrumbs: false,
    },
    {
      id: "atividades",
      title: "Sessões/Atividades",
      type: "collapse",
      url: "organizador/painel-evento/atividades",
      icon: ChalkboardTeacher,
      breadcrumbs: false,
      children: [
        {
          id: "cursos",
          title: "Cursos",
          type: "item",
          url: "organizador/painel-evento/atividades/cursos",
          breadcrumbs: false,
        },
        {
          id: "palestras",
          title: "Palestras",
          type: "item",
          url: "organizador/painel-evento/atividades/palestras",
          breadcrumbs: false,
        },
        {
          id: "certificados",
          title: "Certificados",
          type: "item",
          url: "organizador/painel-evento/atividades/certificados",
          breadcrumbs: false,
        },
      ],
    },
  ],
};

export default pages;
