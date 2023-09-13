const emailInput = document.querySelector("input[name=email]");
const senhaInput = document.querySelector("input[name=senha]");

const errorHTMLs = {
    email: {
        required: document.querySelector(".email-required-small"),
    },
    senha: {
        required: document.querySelector(".senha-required-small"),
    },
};

function limparErrors() {
    emailInput.classList.remove('input-invalid');
    senhaInput.classList.remove('input-invalid');
    Object.values(errorHTMLs).forEach(v => {
        Object.values(v).forEach(v2 => {
            v2.classList.add('error-msg-inactive');
        })
    })
}
limparErrors();

function isEmailRequiredValid() {
    const email = emailInput.value;
    return !!email;
}

function isSenhaRequiredValid() {
    const senha = senhaInput.value;
    return !!senha;
}

function mostrarErros() {
    limparErrors();
    let errors;
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
    return errors;
}

async function login(evt) {
    evt.preventDefault();
    const { email, senha } = createUser();
    if (mostrarErros()) return;
    return await fetch("http://localhost:3000/login", { headers: { "Content-Type": "application/json" }, method: "POST", body: JSON.stringify({
        email,
        senha,
    })})
        .then(res => res.json())
        .then(res => {
            sessionStorage.setItem("authToken", res.token);
            alert("token de autenticação:\n"+res.token);
        });
}

function isLogged() {
    return !!sessionStorage.getItem("authToken");
}

function logout() {
    sessionStorage.clear();
}

function createUser() {
    
    const email = emailInput.value;
    const senha = senhaInput.value;

    return { email, senha };
}

document.querySelector("#cadastro-container").addEventListener("submit", (e) => {
    login(e);
})
