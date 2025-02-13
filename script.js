drawCards()
// Função para carregar o arquivo JSON com as cartas
async function loadCards() {
    try {
        const response = await fetch('cards.json');
        if (!response.ok) {
            throw new Error('Falha ao carregar cards.json');
        }
        const data = await response.json();
        return data.cartas;
    } catch (error) {
        console.error(error);
    }
}

// Função para desenhar as cartas
async function drawCards() {
    const cards = await loadCards();
    
    // Pega as opções selecionadas
    const theme = document.getElementById("theme").value;
    const deck = document.getElementById("deck").value;
    const cardCount = parseInt(document.getElementById("cardCount").value);
    
    // Filtra as cartas de acordo com o tema selecionado
    const filteredCards = cards.map(card => ({
        ...card,
        significado: card.significados[theme] || "Significado não encontrado"
    }));

    // Embaralha as cartas
    const shuffledCards = shuffleArray(filteredCards);

    // Limpa o container de resultados
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = '';

    // Desenha as cartas de acordo com a quantidade selecionada
    for (let i = 0; i < cardCount; i++) {
        const card = shuffledCards[i];
        const cardElement = createCardElement(card, deck, theme);
        resultsContainer.appendChild(cardElement);
    }
}

// Função para criar o HTML das cartas
function createCardElement(card, deck, theme) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");

    const frontFace = document.createElement("div");
    frontFace.classList.add("front");

    const imagePath = `./${deck}/${card.imagem}.jpg`;  // Caminho da imagem da carta
    const img = document.createElement("img");
    img.src = imagePath;
    img.onerror = () => {
        console.error(`Erro ao carregar a imagem: ${imagePath}`);
    };
    frontFace.appendChild(img);

    const cardName = document.createElement("div");
    cardName.classList.add("card-name");
    cardName.textContent = card.nome;  // Adicionando o nome da carta
    
    const cardMeaning = document.createElement("div");
    cardMeaning.classList.add("card-meaning");
    cardMeaning.textContent = card.significado;  // Significado da carta
    
    cardElement.appendChild(frontFace);
    cardElement.appendChild(cardName);
    cardElement.appendChild(cardMeaning);

    return cardElement;
}

// Função para embaralhar o array de cartas
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos
    }
    return arr;
}
