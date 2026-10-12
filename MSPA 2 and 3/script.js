let movies = [];
let selectedMovies = [];

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");
const selected = document.getElementById("selected");
const count = document.getElementById("count");

// Search movies using TVMaze API
searchBtn.addEventListener("click", searchMovies);

searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchMovies();
    }
});

async function searchMovies() {
    const query = searchInput.value.trim();

    if (query === "") {
        results.textContent = "Please enter a movie name.";
        return;
    }

    results.textContent = "Loading...";

    try {
        const response = await fetch(
            `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`
        );

        if (!response.ok) {
            throw new Error("Search failed");
        }

        const data = await response.json();

       
movies = data.map(item => ({
    id: item.show.id,
    title: item.show.name,
    year: item.show.premiered
        ? item.show.premiered.substring(0, 4)
        : "Unknown",
    image: item.show.image
        ? item.show.image.medium
        : null
}));

        displayMovies();
    } catch (error) {
        results.textContent = "Unable to fetch movies. Try again.";
    }
}

// Display results using map()

function displayMovies() {
    if (movies.length === 0) {
        results.textContent = "No movies or shows found.";
        return;
    }

    results.innerHTML = movies.map(movie => `
        <div class="movie">
            <img
                src="${movie.image || 'https://placehold.co/120x160?text=No+Image'}"
                alt="${movie.title}"
                class="poster"
            >

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Release Year: ${movie.year}</p>

                <button onclick="addMovie(${movie.id})">
                    Add to Selected
                </button>
            </div>
        </div>
    `).join("");
}


// Add movie to selected array

function addMovie(id) {
    const movie = movies.find(movie => movie.id === id);

    if (movie && !selectedMovies.some(m => m.id === id)) {
        selectedMovies.push(movie);
        displaySelected();

        alert(movie.title + " selected successfully!");
    } else {
        alert("Movie is already selected!");
    }
}


// Display selected movies and use reduce()

function displaySelected() {
    selected.innerHTML = selectedMovies.map(movie => `
        <div class="movie">
            <img
                src="${movie.image || 'https://placehold.co/120x160?text=No+Image'}"
                alt="${movie.title}"
                class="poster"
            >

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>Release Year: ${movie.year}</p>

                <button onclick="removeMovie(${movie.id})">
                    Remove
                </button>
            </div>
        </div>
    `).join("");

    const total = selectedMovies.reduce(
        (sum, movie) => sum + 1, 0
    );

    count.textContent = total;
}


// Remove movie using filter()
function removeMovie(id) {
    selectedMovies = selectedMovies.filter(
        movie => movie.id !== id
    );

    displaySelected();
}
