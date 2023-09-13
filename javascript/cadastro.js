const nomeInput = document.querySelector("input[name=nome]");
const emailInput = document.querySelector("input[name=email]");
const senhaInput = document.querySelector("input[name=senha]");

const errorHTMLs = {
    nome: {
        required: document.querySelector(".nome-required-small"),
    },
    email: {
        required: document.querySelector(".email-required-small"),
    },
    senha: {
        formatting: document.querySelector(".senha-formatting-small"),
        required: document.querySelector(".senha-required-small"),
    },
};

function limparErrors() {
    nomeInput.classList.remove('input-invalid');
    emailInput.classList.remove('input-invalid');
    senhaInput.classList.remove('input-invalid');
    Object.values(errorHTMLs).forEach(v => {
        Object.values(v).forEach(v2 => {
            v2.classList.add('error-msg-inactive');
        })
    })
}
limparErrors();

function isNomeRequiredValid() {
    const nome = nomeInput.value;
    return !!nome;
}

function isEmailRequiredValid() {
    const email = emailInput.value;
    return !!email;
}

function isSenhaRequiredValid() {
    const senha = senhaInput.value;
    return !!senha;
}

function isSenhaFormattingValid() {
    /* Minimum 8 */
    /* Lowercases, Uppercases, Numbers and Especial Chars */
    const regex = /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*&#?]).*$/;
    const senha = senhaInput.value;
    return regex.test(senha);
}

function mostrarErros() {
    limparErrors();
    let errors;
    if (!isNomeRequiredValid()) {
        nomeInput.classList.add('input-invalid');
        errorHTMLs.nome.required.classList.remove('error-msg-inactive');
        errors = true;
    }
    if (!isEmailRequiredValid()) {
        emailInput.classList.add('input-invalid');
        errorHTMLs.email.required.classList.remove('error-msg-inactive');
        errors = true;
    }
    if (!isSenhaRequiredValid()) {
        senhaInput.classList.add('input-invalid');
        errorHTMLs.senha.required.classList.remove('error-msg-inactive');
        errors = true;
    }
    if (!isSenhaFormattingValid()) {
        senhaInput.classList.add('input-invalid');
        errorHTMLs.senha.formatting.classList.remove('error-msg-inactive');
        errors = true;
    }
    return errors;
}

async function cadastrar(evt) {
    evt.preventDefault();
    const { name, email, senha } = createUser();
    console.log({ name, email, senha });
    if (mostrarErros()) return;
    setTimeout(() => {
        window.location.href = '../paginas/Estação%20da%20construção.html';
    }, 500)
    return await fetch("http://localhost:3000/users", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({
        name,
        email,
        senha,
    })})
        .then(res => res.json())
        .then(res => alert("Conta criada com sucesso!\n"+JSON.stringify(res)));
}

function createUser() {

    const name = nomeInput.value;
    const email = emailInput.value;
    const senha = senhaInput.value;

    return { name, email, senha };
}

document.querySelector("#cadastro-container").addEventListener("submit", (e) => {
    cadastrar(e);
})
