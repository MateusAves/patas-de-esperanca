// ==========================================
// PROJETOS - PATAS DE ESPERANÇA
// ==========================================

const projetos = [
    {
        categoria: "Adoção",
        classe: "badge-adocao",
        titulo: "Adoção responsável",
        descricao:
            "Promovemos a adoção responsável de animais resgatados, buscando famílias preparadas para oferecer cuidado, segurança e carinho.",
        acao: "Quero ajudar →"
    },

    {
        categoria: "Voluntariado",
        classe: "badge-voluntario",
        titulo: "Rede de voluntários",
        descricao:
            "Voluntários podem participar de ações de cuidado, divulgação, eventos e apoio às atividades da organização.",
        acao: "Participar →"
    },

    {
        categoria: "Doação",
        classe: "badge-doacao",
        titulo: "Campanhas de doação",
        descricao:
            "As doações ajudam na aquisição de alimentos, medicamentos, materiais de higiene e outros recursos.",
        acao: "Contribuir →"
    }
];


function renderizarProjetos() {

    const lista =
        document.querySelector("#lista-projetos");

    if (!lista) return;

    lista.innerHTML = projetos.map(projeto => `

        <article class="project-card grid-span-4">

            <div class="badges">

                <span class="badge ${projeto.classe}">
                    ${projeto.categoria}
                </span>

            </div>

            <h2>
                ${projeto.titulo}
            </h2>

            <p>
                ${projeto.descricao}
            </p>

            <a class="text-link" href="cadastro.html">
                ${projeto.acao}
            </a>

        </article>

    `).join("");
}
export { renderizarProjetos };