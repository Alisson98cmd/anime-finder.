async function searchAnime() {
    const query = document.getElementById("search").value;
    const genre = document.getElementById("genre").value;
    const sort = document.getElementById("sort").value;
    let url = `https://api.jikan.moe/v4/anime?q=${query}&limit=6`;
    
    if (genre) {
        url += `&genre=${genre}`;
    }
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        let animes = data.data;
        
        if (sort === "popularity") {
            animes.sort((a, b) => a.popularity - b.popularity);
        } else if (sort === "airing_start") {
            animes.sort((a, b) => new Date(b.aired.from) - new Date(a.aired.from));
        }
        
        displayAnimes(animes);
    } catch (error) {
        console.error("Erro ao buscar os animes", error);
    }
}

async function loadFeaturedAnimes() {
    const url = "https://api.jikan.moe/v4/top/anime?limit=6";
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayFeaturedAnimes(data.data);
    } catch (error) {
        console.error("Erro ao carregar animes em destaque", error);
    }
}

function displayAnimes(animes) {
    const container = document.getElementById("anime-container");
    container.innerHTML = "";
    
    animes.forEach(anime => {
        const animeCard = document.createElement("div");
        animeCard.classList.add("anime-card");
        animeCard.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : "Sem descrição"}</p>
            <p><strong>Popularidade:</strong> ${anime.popularity}</p>
            <p><strong>Estreia:</strong> ${anime.aired.from ? new Date(anime.aired.from).toLocaleDateString() : "Desconhecido"}</p>
        `;
        animeCard.style.opacity = "0";
        animeCard.style.transform = "translateY(20px)";
        container.appendChild(animeCard);
        
        setTimeout(() => {
            animeCard.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            animeCard.style.opacity = "1";
            animeCard.style.transform = "translateY(0)";
        }, 100);
    });
}

function displayFeaturedAnimes(animes) {
    const container = document.getElementById("featured-container");
    container.innerHTML = "";
    
    animes.forEach((anime, index) => {
        const animeCard = document.createElement("div");
        animeCard.classList.add("anime-card");
        animeCard.innerHTML = `
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
            <h3>${anime.title}</h3>
            <p>${anime.synopsis ? anime.synopsis.substring(0, 100) + '...' : "Sem descrição"}</p>
        `;
        animeCard.style.opacity = "0";
        animeCard.style.transform = "scale(0.9)";
        container.appendChild(animeCard);
        
        setTimeout(() => {
            animeCard.style.transition = "opacity 0.5s ease-out, transform 0.5s ease-out";
            animeCard.style.opacity = "1";
            animeCard.style.transform = "scale(1)";
        }, index * 150);
    });
}

document.addEventListener("DOMContentLoaded", loadFeaturedAnimes);
