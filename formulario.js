// ==========================================
// FORMULÁRIO - PATAS DE ESPERANÇA
// ==========================================

const APP_KEY = "patasDeEsperancaVoluntario";


// ==========================================
// TOAST
// ==========================================

function mostrarToast(titulo, mensagem) {

    const toast =
        document.createElement("div");

    toast.className = "toast";

    toast.setAttribute(
        "role",
        "status"
    );

    toast.setAttribute(
        "aria-live",
        "polite"
    );

    toast.innerHTML = `
        <strong>${titulo}</strong>
        <span>${mensagem}</span>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 4000);
}


// ==========================================
// ALERTA DE SUCESSO
// ==========================================

function mostrarAlertaSucesso() {

    const alerta =
        document.createElement("div");

    alerta.className =
        "alerta alerta-sucesso";

    alerta.setAttribute(
        "role",
        "alert"
    );

    alerta.innerHTML = `
        <strong>Sucesso!</strong>
        <span>Cadastro realizado com sucesso.</span>
    `;

    const main =
        document.querySelector("main");

    if (main) {
        main.prepend(alerta);
    }
}


// ==========================================
// MODAL
// ==========================================

function mostrarModal() {

    const modal =
        document.createElement("dialog");

    modal.className =
        "modal-demo";

    modal.innerHTML = `
        <h2>Cadastro realizado</h2>

        <p>
            Seu interesse em participar da
            Patas de Esperança foi registrado
            com sucesso.
        </p>

        <button
            class="button button-primary"
            type="button"
            id="fechar-modal">
            Fechar
        </button>
    `;

    document.body.appendChild(modal);

    modal.showModal();

    const botaoFechar =
        modal.querySelector("#fechar-modal");

    botaoFechar.addEventListener(
        "click",
        () => {

            modal.close();

            modal.remove();

        }
    );
}


// ==========================================
// LOCAL STORAGE
// ==========================================

function salvarDadosFormulario(formulario) {

    const dados = {};

    const campos =
        formulario.querySelectorAll("input");

    campos.forEach(campo => {

        if (campo.name) {

            dados[campo.name] =
                campo.value;

        }

    });

    localStorage.setItem(
        APP_KEY,
        JSON.stringify(dados)
    );
}


function restaurarDadosFormulario(formulario) {

    const dadosSalvos =
        localStorage.getItem(APP_KEY);

    if (!dadosSalvos) return;

    try {

        const dados =
            JSON.parse(dadosSalvos);

        Object.keys(dados).forEach(
            nomeCampo => {

                const campo =
                    formulario.elements[nomeCampo];

                if (campo) {

                    campo.value =
                        dados[nomeCampo];

                }

            }
        );

    } catch (erro) {

        console.error(
            "Erro ao recuperar dados:",
            erro
        );

    }
}


// ==========================================
// CONFIGURAÇÃO DO FORMULÁRIO
// ==========================================

function configurarFormulario() {

    const formulario =
        document.querySelector("form");

    if (!formulario) return;

    restaurarDadosFormulario(
        formulario
    );


    formulario.addEventListener(
        "input",
        () => {

            salvarDadosFormulario(
                formulario
            );

        }
    );


    formulario.addEventListener(
        "submit",
        evento => {

            evento.preventDefault();


            if (!formulario.checkValidity()) {

                mostrarToast(
                    "Atenção",
                    "Verifique os campos obrigatórios."
                );

                formulario.reportValidity();

                return;
            }


            salvarDadosFormulario(
                formulario
            );


            mostrarAlertaSucesso();


            mostrarToast(
                "Cadastro concluído",
                "Seus dados foram salvos com sucesso."
            );


            mostrarModal();

        }
    );
}


// ==========================================
// EXPORTAÇÃO
// ==========================================

export { configurarFormulario };