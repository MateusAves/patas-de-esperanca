import { renderizarProjetos } from "./projetos.js";
import { configurarFormulario } from "./formulario.js";

// ==========================================
// PATAS DE ESPERANÇA - JAVASCRIPT
// ==========================================


// ==========================================
// NAVEGAÇÃO SPA
// ==========================================

function carregarPagina(url, adicionarHistorico = true) {

    fetch(url)

        .then(resposta => {

            if (!resposta.ok) {
                throw new Error(
                    "Não foi possível carregar a página."
                );
            }

            return resposta.text();
        })

        .then(html => {

            const documento =
                new DOMParser()
                    .parseFromString(html, "text/html");

            const novoMain =
                documento.querySelector("main");

            const mainAtual =
                document.querySelector("main");

            if (novoMain && mainAtual) {

                mainAtual.innerHTML =
                    novoMain.innerHTML;

                if (adicionarHistorico) {

                    history.pushState(
                        { url },
                        "",
                        url
                    );

                }

                inicializarAplicacao();

                window.scrollTo(0, 0);
            }
        })

        .catch(erro => {

            console.error(
                "Erro na navegação:",
                erro
            );

        });
}


function configurarNavegacao() {

    document.addEventListener("click", evento => {

        const link =
            evento.target.closest("a");

        if (!link) return;

        const href =
            link.getAttribute("href");

        if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("mailto:")
        ) {
            return;
        }

        evento.preventDefault();

        carregarPagina(href);

    });


window.addEventListener("popstate", () => {

    const pagina =
        window.location.pathname
            .split("/")
            .pop();

    carregarPagina(pagina, false);

});
}


// ==========================================
// MENU
// ==========================================

function configurarMenu() {

    const menu =
        document.querySelector("details");

    if (!menu) return;

    menu.addEventListener(
        "toggle",
        () => {

            console.log(
                menu.open
                    ? "Menu aberto"
                    : "Menu fechado"
            );

        }
    );
}


// ==========================================
// INICIALIZAÇÃO
// ==========================================

function inicializarAplicacao() {

    renderizarProjetos();

    configurarFormulario();

    configurarMenu();

}


document.addEventListener(
    "DOMContentLoaded",
    () => {

        configurarNavegacao();

        inicializarAplicacao();

    }
);