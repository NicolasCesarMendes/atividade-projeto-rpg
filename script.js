class Item {

    constructor(id, nome, preco, categoria, quantidade, imagem) {

        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.categoria = categoria;
        this.quantidade = quantidade;
        this.imagem = imagem;
    }

    calcularSubtotal() {
        return this.preco * this.quantidade;
    }
}

const inventarioOriginal = [

    new Item(
        1,
        "Espada de Aço Valiriano",
        500,
        "Armas",
        1,
        "img/espada-valiriana.png"
    ),

    new Item(
        2,
        "Escudo de Carvalho",
        180,
        "Equipamentos",
        4,
        "img/escudo-carvalho.jpg"
    ),

    new Item(
        3,
        "Poção de Cura Maior",
        50,
        "Poções",
        10,
        "img/pocao-cura.png"
    ),

    new Item(
        4,
        "Elixir de Mana Azul",
        75,
        "Poções",
        2,
        "img/pocao-mana.png"
    )
];

let mochilaExibicao = [...inventarioOriginal];

const inventario = document.getElementById("inventario");
const resultado = document.getElementById("resultado");

function desenharMochilaNaTela(arrayItens) {

    inventario.innerHTML = "";

    arrayItens.forEach(item => {

        const card = document.createElement("div");

        if (item.quantidade < 3) {
            card.classList.add("critico");
        }

        card.classList.add("card");

        const alerta =
            item.quantidade < 3
            ? '<span class="alerta">ACABANDO!</span>'
            : '';

        card.innerHTML = `
            <img src="${item.imagem}">
            <h3>${item.nome}</h3>
            <p>Categoria: ${item.categoria}</p>
            <p>Preço: ${item.preco}</p>
            <p>Quantidade: ${item.quantidade}</p>
            <p>Subtotal: ${item.calcularSubtotal()}</p>
            ${alerta}
        `;

        inventario.appendChild(card);
    });
}

desenharMochilaNaTela(mochilaExibicao);

const formItem = document.getElementById("formItem");

formItem.addEventListener("submit", function (event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    const preco = Number(
        document.getElementById("preco").value
    );

    const quantidade = Number(
        document.getElementById("quantidade").value
    );

    const categoria =
        document.getElementById("categoria").value;

    const arquivoImagem =
    document.getElementById("imagem").files[0];

let imagem = "img/item-padrao.png";

if (arquivoImagem) {
    imagem = URL.createObjectURL(arquivoImagem);
}

    const novoItem = new Item(
        Date.now(),
        nome,
        preco,
        categoria,
        quantidade,
        imagem
    );

    mochilaExibicao.push(novoItem);

    desenharMochilaNaTela(mochilaExibicao);

    formItem.reset();
});

const painelJanela =
    document.getElementById("painelJanela");

function atualizarJanela() {

    painelJanela.textContent =
        `Largura: ${window.innerWidth}px | Altura: ${window.innerHeight}px`;
}

window.onresize = atualizarJanela;

atualizarJanela();

document
.getElementById("btnDesconto")
.addEventListener("click", () => {

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

    desenharMochilaNaTela(mochilaExibicao);
});

document
.getElementById("btnFiltro")
.addEventListener("click", () => {

    const pocoes = mochilaExibicao.filter(item =>
        item.categoria === "Poções"
    );

    desenharMochilaNaTela(pocoes);
});

document
.getElementById("btnOuro")
.addEventListener("click", () => {

    if (
        mochilaExibicao.length > 0 &&
        window.innerWidth > 480
    ) {

        let total = 0;

        for (
            let i = 0;
            i < mochilaExibicao.length;
            i++
        ) {

            total +=
                mochilaExibicao[i]
                .calcularSubtotal();
        }

        resultado.textContent =
            `Total de Ouro: ${total}`;
    }
    else {

        resultado.style.color = "red";

        resultado.textContent =
            "Erro: Tela muito pequena para abrir o baú!";
    }
});