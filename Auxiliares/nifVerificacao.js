function verificarNIF() {
    const inputNIF = document.getElementById('nif-input');
    const botaoCatalogo = document.getElementById('link-catalogo');
    const valor = inputNIF.value;

    
    // 2. Caso VERDE: Número válido (9 dígitos e no intervalo correto)
    if (valor.length === 8 && valor === "31072009") {
        inputNIF.style.color = "#28a745"; // Verde
        botaoCatalogo.classList.add('btn-ativo'); // DESBLOQUEIA o botão
    } 
    
    // 3. Caso VERMELHO: Se forem números inválidos (ex: 000000000 ou menos de 9 dígitos)
    else if (valor !== "") {
        inputNIF.style.color = "#ff0000"; // Vermelho
        botaoCatalogo.classList.remove('btn-ativo'); // Bloqueia o botão
    }
    
    // Se estiver vazio, volta à cor padrão
    else {
        inputNIF.style.color = "black";
        botaoCatalogo.classList.remove('btn-ativo');
    }
}

// Adiciona listener para verificar automaticamente enquanto digita
document.addEventListener('DOMContentLoaded', function() {
    const inputNIF = document.getElementById('nif-input');
    if (inputNIF) {
        // Chama a verificação a cada caractere digitado
        inputNIF.addEventListener('input', verificarNIF);
    }
});