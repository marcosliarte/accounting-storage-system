document.getElementById('addSocio').addEventListener('click', function() {
    let originalFieldset = document.querySelector('.dadosTitular');
    let newFieldset = originalFieldset.cloneNode(true);

    // Limpar os valores dos novos campos
    let inputs = newFieldset.querySelectorAll('input');
    inputs.forEach(input => input.value = '');

    // Mudar o texto da legenda
    newFieldset.querySelector('legend').textContent = 'Dados Sócio';

    document.getElementById('cadastroClienteForm').insertBefore(newFieldset, document.getElementById('addSocio'));
});
