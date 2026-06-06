/* 
    Projeto: Inventário Arcano de Valdrik
    Aluno: Nícolas César Rodrigues Mendes
*/

/* Classe que representa um item do inventário. */
class Item {
    constructor(id, nome, preco, categoria, quantidade, imagem) {

        /* Atribuição dos dados recebidos ao objeto. */
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.quantidade = quantidade;
        this.imagem = imagem;
    }

    /* Método que calcula o valor total do item em ouro considerando a quantidade e preço. */
    calcularSubtotal() {
        return this.preco * this.quantidade;
    }
}

/* Lista inicial de itens disponíveis no inventário. */
const inventarioOriginal = [
    new Item(1, "Espada de Aço Valiriano", 500, "Armas", 1, "img/espada-valiriana.png"),

    new Item(2, "Escudo de Carvalho", 180, "Equipamentos", 4, "img/escudo-carvalho.jpg"),

    new Item(3, "Poção de Cura Maior", 50, "Poções", 10, "img/pocao-cura.png"),

    new Item(4, "Elixir de Mana Azul", 75, "Poções", 2, "img/pocao-mana.png")
];

/* Cópia do inventário utilizada para exibição e manipulação. */
let mochilaExibicao = [...inventarioOriginal];

/* Referências aos elementos principais da página. */
const inventario = document.getElementById("inventario");
const resultado = document.getElementById("resultado");

/* Função que desenha todos os itens recebidos na área do inventário. */
function desenharMochilaNaTela(itens) {

    /* Limpa os itens exibidos anteriormente. */
    inventario.innerHTML = "";

    itens.forEach(item => {

        /* Cria um novo cartão para o item. */
        const card = document.createElement("div");

        /* Aplica destaque visual para itens com estoque baixo. */
        if (item.quantidade < 3) {
            card.classList.add("critico");
        }

        card.classList.add("card");

        /* Cria uma mensagem de alerta para itens próximos de acabar. */
        const alerta = item.quantidade < 3 ? '<span class="alerta">ACABANDO!</span>' : '';

        /* Monta o conteúdo HTML do cartão. */
        card.innerHTML = `
            <img src="${item.imagem}">
            <h3>${item.nome}</h3>
            <p>Categoria: ${item.categoria}</p>
            <p>Preço: ${item.preco}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Subtotal: ${item.calcularSubtotal()}</p>
            ${alerta}
        `;

        /* Adiciona o cartão ao inventário. */
        inventario.appendChild(card);
    });
}

/* Exibe os itens iniciais ao carregar a página. */
desenharMochilaNaTela(mochilaExibicao);

/* Obtém o formulário de cadastro de itens. */
const formItem = document.getElementById("formItem");

/* Evento responsável por cadastrar os novos itens. */
formItem.addEventListener("submit", function (event) {

    /* Impede o recarregamento da página. */
    event.preventDefault();

    /* Obtém os valores digitados pelo usuário. */
    const nome = document.getElementById("nome").value;

    const preco = Number(document.getElementById("preco").value);

    const quantidade = Number(document.getElementById("quantidade").value);

    const categoria = document.getElementById("categoria").value;

    /* Obtém a imagem selecionada pelo usuário. */
    const arquivoImagem = document.getElementById("imagem").files[0];

    /* Define uma imagem padrão caso nenhuma seja enviada. */
    let imagem = "img/item-padrao.png";

    /* Cria uma URL temporária para a imagem enviada. */
    if (arquivoImagem) {
        imagem = URL.createObjectURL(arquivoImagem);
    }

    /* Cria o novo item utilizando os dados informados. */
    const novoItem = new Item(Date.now(), nome, preco, categoria, quantidade, imagem);

    /* Adiciona o item ao inventário exibido. */
    mochilaExibicao.push(novoItem);

    /* Atualiza a exibição dos itens. */
    desenharMochilaNaTela(mochilaExibicao);

    /* Limpa os campos do formulário. */
    formItem.reset();
});

/* Obtém o painel responsável por mostrar o tamanho da janela. */
const painelJanela = document.getElementById("painelJanela");

/* Função que atualiza as informações de largura e altura da janela. */
function atualizarJanela() {
    painelJanela.textContent = `Largura: ${window.innerWidth}px | Altura: ${window.innerHeight}px`;
}

/* Executa a atualização ao redimensionar a janela. */
window.onresize = atualizarJanela;

/* Exibe as dimensões iniciais da janela. */
atualizarJanela();

/* Evento responsável por aplicar desconto em todos os itens. */
document.getElementById("btnDesconto").addEventListener("click", () => {

    /* Cria uma nova lista com os preços reduzidos em 10%. */
    mochilaExibicao = mochilaExibicao.map(item => {

        return new Item(
            item.id,
            item.nome,
            item.preco * 0.9,
            item.categoria,
            item.quantidade,
            item.imagem
        );
    });

    /* Atualiza a exibição dos itens. */
    desenharMochilaNaTela(mochilaExibicao);
});

/* Evento responsável por exibir apenas as poções. */
document.getElementById("btnFiltro").addEventListener("click", () => {

    /* Filtra somente itens da categoria Poções. */
    const pocoes = mochilaExibicao.filter(item => item.categoria === "Poções");

    /* Exibe apenas os itens filtrados. */
    desenharMochilaNaTela(pocoes);
});

/* Evento responsável por calcular o total de ouro do inventário. */
document.getElementById("btnOuro").addEventListener("click", () => {

    /* Verifica se existem itens e se a tela possui largura suficiente. */
    if (mochilaExibicao.length > 0 && window.innerWidth > 480) {

        let total = 0;

        /* Soma os subtotais de todos os itens. */
        for (let i = 0; i < mochilaExibicao.length; i++) {
            total += mochilaExibicao[i].calcularSubtotal();
        }

        /* Exibe o resultado da soma. */
        resultado.style.color = "var(--dourado-suave)";
        resultado.textContent = `Total de Ouro: ${total}`;
    }
    else {
        /* Exibe uma mensagem de erro caso a condição não seja atendida. */
        resultado.style.color = "red";
        resultado.textContent = "Erro: Tela muito pequena para abrir o baú!";
    }
});