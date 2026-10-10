let series = [];

const listaSeries = document.getElementById("listaSeries");
const status = document.getElementById("status");
const estatisticas = document.getElementById("estatisticas");
const btnCarregar = document.getElementById("btnCarregar");
const btnOrdenar = document.getElementById("btnOrdenar");
const btnFiltrarAno = document.getElementById("btnFiltrarAno");
const inputAno = document.getElementById("inputAno");
const botoesGenero = document.querySelectorAll(".btn-genero");

async function carregarSeries() {

    try {

        status.textContent = "Carregando séries...";
        const resposta = await fetch("series.json");

        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o JSON.");
        }

        const dados = await resposta.json();
        series = dados.series;

        status.textContent = `${series.length} séries carregadas.`;

        mostrarSeries(series);
        mostrarEstatisticas();

    } catch (erro) {

        status.textContent = `Erro: ${erro.message}`;
    }
}

function mostrarSeries(lista) {

    listaSeries.innerHTML = "";

    if (lista.length === 0) {
        listaSeries.innerHTML = "<p>Nenhuma série encontrada.</p>";
        return;
    }

    lista.forEach((serie) => {

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `
            <img src="${serie.imagem}" alt="${serie.titulo}">
            <h2>${serie.titulo}</h2>
            <p><strong>Ano:</strong> ${serie.ano}</p>
            <p><strong>Gênero:</strong> ${serie.genero}</p>
            <p><strong>Temporadas:</strong> ${serie.temporadas}</p>
        `;

        listaSeries.appendChild(card);
    });
}

function filtrarGenero(genero) {

    if (series.length === 0) {
        status.textContent = "Clique em Carregar Séries primeiro.";
        return;
    }

    if (genero === "Todos") {
        mostrarSeries(series);
        status.textContent = `${series.length} séries encontradas.`;
        return;
    }

    const filtradas = series.filter((serie) => serie.genero === genero);

    mostrarSeries(filtradas);
    status.textContent = `${filtradas.length} séries de ${genero}.`;
}

function filtrarAno() {

    if (series.length === 0) {
        status.textContent = "Clique em Carregar Séries primeiro.";
        return;
    }

    const ano = Number(inputAno.value);

    const filtradas = series.filter((serie) => serie.ano === ano);

    mostrarSeries(filtradas);
    status.textContent = `${filtradas.length} séries de ${ano}.`;
}

function ordenarPorAno() {

    if (series.length === 0) {
        status.textContent = "Clique em Carregar Séries primeiro.";
        return;
    }

    const ordenadas = [...series].sort((a, b) => a.ano - b.ano);

    mostrarSeries(ordenadas);
    status.textContent = "Séries ordenadas por ano.";
}

function mostrarEstatisticas() {

    const ordenadas = [...series].sort((a, b) => a.ano - b.ano);
    const maisAntiga = ordenadas[0];
    const maisRecente = ordenadas[ordenadas.length - 1];

    estatisticas.innerHTML = `
        <h2>Estatísticas</h2>
        <p><strong>Total de séries:</strong> ${series.length}</p>
        <p><strong>Série mais antiga:</strong> ${maisAntiga.titulo} (${maisAntiga.ano})</p>
        <p><strong>Série mais recente:</strong> ${maisRecente.titulo} (${maisRecente.ano})</p>
    `;
}

btnCarregar.addEventListener("click", carregarSeries);
btnOrdenar.addEventListener("click", ordenarPorAno);
btnFiltrarAno.addEventListener("click", filtrarAno);

botoesGenero.forEach((botao) => {
    botao.addEventListener("click", () => {
        filtrarGenero(botao.dataset.genero);
    });
});
