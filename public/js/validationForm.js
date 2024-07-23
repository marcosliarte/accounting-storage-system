const camposComRequired = document.querySelectorAll("[required]");


// Função para validar CNPJ
function validarCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '') return false;

    if (cnpj.length !== 14)
        return false;

    // Elimina CNPJs inválidos conhecidos
    if (/^(\d)\1+$/.test(cnpj)) 
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0)))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1)))
        return false;

    return true;
}

// Função para validar CPF
function validarCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '') return false;

    if (cpf.length !== 11)
        return false;

    if (/^(\d)\1+$/.test(cpf))
        return false;

    // Valida DVs
    let tamanho = cpf.length - 2;
    let numeros = cpf.substring(0, tamanho);
    let digitos = cpf.substring(tamanho);
    let soma = 0;

    // Calcula o primeiro dígito verificador
    for (let i = 10; i > 1; i--) {
        soma += numeros.charAt(10 - i) * i;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) 
        return false;

    // Calcula o segundo dígito verificador
    tamanho = tamanho + 1;
    numeros = cpf.substring(0, tamanho);
    soma = 0;
    for (let i = 11; i > 1; i--) {
        soma += numeros.charAt(11 - i) * i;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(1)))
        return false;

    return true;
}

// Adiciona a máscara e evento de validação para CNPJ e CPF
$(document).ready(function(){
    $('#CNPJ').mask('00.000.000/0000-00');
    $('#CPF').mask('000.000.000-00');

    $('#CNPJ').on('blur', function() {
        const cnpj = this.value;
        const isValid = validarCnpj(cnpj);
        const cnpjError = document.getElementById('cnpjError');
        if (!isValid) {
            cnpjError.textContent = 'CNPJ inválido.';
            this.style.borderColor = 'red';
        } else {
            cnpjError.textContent = '';
            this.style.borderColor = '';
        }
    });

    $('#CPF').on('blur', function() {
        const cpf = this.value;
        const isValid = validarCpf(cpf);
        const cpfError = document.getElementById('cpfError');
        if (!isValid) {
            cpfError.textContent = 'CPF inválido.';
            this.style.borderColor = 'red';
        } else {
            cpfError.textContent = '';
            this.style.borderColor = '';
        }
    });
});

camposComRequired.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampo(campo));
});

function verificaCampo(campo) {
    if (campo.validity.valueMissing) {
        campo.setCustomValidity('Este campo é obrigatório.');
        campo.reportValidity();
    } else {
        campo.setCustomValidity('');
    }
}

