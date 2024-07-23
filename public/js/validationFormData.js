// Função para validar CNPJ
function validarCnpj(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');

    if (cnpj === '' || cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) 
        return false;

    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;

    for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
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
        if (pos < 2) pos = 9;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado === parseInt(digitos.charAt(1));
}

// Função para validar CPF
function validarCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf === '' || cpf.length !== 11 || /^(\d)\1+$/.test(cpf))
        return false;

    let tamanho = cpf.length - 2;
    let numeros = cpf.substring(0, tamanho);
    let digitos = cpf.substring(tamanho);
    let soma = 0;

    for (let i = 10; i > 1; i--) {
        soma += numeros.charAt(10 - i) * i;
    }

    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado !== parseInt(digitos.charAt(0))) 
        return false;

    tamanho = tamanho + 1;
    numeros = cpf.substring(0, tamanho);
    soma = 0;

    for (let i = 11; i > 1; i--) {
        soma += numeros.charAt(11 - i) * i;
    }

    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    return resultado === parseInt(digitos.charAt(1));
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

    // Função para exibir/ocultar o campo Senha Simples Nacional
    document.getElementById('simples_nacional').addEventListener('change', function() {
        var senhaSimplesContainer = document.getElementById('senhaSimplesContainer');
        if (this.checked) {
            senhaSimplesContainer.classList.remove('hidden');
            document.getElementById('senhaSimples').required = true;
        } else {
            senhaSimplesContainer.classList.add('hidden');
            document.getElementById('senhaSimples').required = false;
        }
    });
});

// Validação dos campos obrigatórios
const camposComRequired = document.querySelectorAll("[required]");

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

document.addEventListener('DOMContentLoaded', function() {
    const statusCivilSelect = document.getElementById('statusCivil');
    const regimeCasamentoLabel = document.getElementById('regimeCasamentoLabel');
    const regimeCasamentoSelect = document.getElementById('regimeCasamento');

    function toggleRegimeCasamento() {
        if (statusCivilSelect.value === 'casado') {
            regimeCasamentoLabel.classList.remove('hidden');
            regimeCasamentoSelect.classList.remove('hidden');
        } else {
            regimeCasamentoLabel.classList.add('hidden');
            regimeCasamentoSelect.classList.add('hidden');
        }
    }

    // Inicializa o estado ao carregar a página
    toggleRegimeCasamento();

    // Adiciona evento de mudança no campo "Status Civil"
    statusCivilSelect.addEventListener('change', toggleRegimeCasamento);
});

document.addEventListener('DOMContentLoaded', function() {
    const addSocioButton = document.getElementById('addSocio');
    const socioContainer = document.querySelector('.socio-container');
    let socioIndex = document.querySelectorAll('.socio-info').length + 1;

    function createSocioFields(index) {
        return `
        <div class="socio-info">
            <h3>Informações do Sócio ${index}</h3>
            <label for="nomeTitular${index}">Nome titular:</label>
            <input type="text" id="nomeTitular${index}" required minlength="3">

            <label for="CPF${index}">CPF:</label>
            <input type="text" id="CPF${index}" required>
            <span id="cpfError${index}" style="color:red"></span>

            <label for="RG${index}">RG:</label>
            <input type="text" id="RG${index}" required>

            <label for="dataEmissaoRg${index}">Data de emissão:</label>
            <input type="date" id="dataEmissaoRg${index}" required>

            <label for="logradouro${index}">Logradouro:</label>
            <input type="text" id="logradouro${index}" required> 

            <label for="numero${index}">Número:</label>
            <input type="number" id="numero${index}" required>

            <label for="complemento${index}">Complemento:</label>
            <input type="text" id="complemento${index}">

            <label for="bairro${index}">Bairro/Distrito:</label>
            <input type="text" id="bairro${index}" required>

            <label for="municipio${index}">Município:</label>
            <input type="text" id="municipio${index}" required>

            <label for="CEP${index}">CEP:</label>
            <input type="number" id="CEP${index}" required>

            <label for="dataNascimento${index}">Data de nascimento:</label>
            <input type="date" id="dataNascimento${index}" required>

            <label for="statusCivil${index}">Status Civil:</label>
            <select id="statusCivil${index}" required>
                <option value="solteiro">Solteiro</option>
                <option value="casado">Casado</option>
                <option value="divorciado">Divorciado</option>
                <option value="viuvo">Viúvo</option>
            </select>

            <label id="regimeCasamentoLabel${index}" for="regimeCasamento${index}" class="hidden">Regime Casamento:</label>
            <select id="regimeCasamento${index}" class="hidden" required>
                <option value="parcial">Comunhão Parcial de Bens</option>
                <option value="universal">Comunhão Universal de Bens</option>
                <option value="convencional">Separação Convencional de Bens</option>
                <option value="obrigatoria">Separação Obrigatória de Bens</option>
            </select>

            <label for="sexo${index}">Sexo:</label>
            <select id="sexo${index}" required>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
            </select>

            <label class="quadroSocietário" for="tipoResponsavel${index}">Tipo de responsável:</label>
            <select id="tipoResponsavel${index}" required>
                <option value="socioAdministrador">Sócio - Administrador</option>
                <option value="socio">Sócio</option>
                <option value="titular">Titular</option>
                <option value="presidente">Presidente</option>
                <option value="outroCargo">Outro</option>
            </select>
        </div>
        `;
    }

    addSocioButton.addEventListener('click', function() {
        socioContainer.innerHTML += createSocioFields(socioIndex);
        socioIndex++;
    });
});
