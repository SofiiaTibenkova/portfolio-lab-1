const projects = [
    { 
        id: 1, 
        title: "Проєкт 1: Квітковий магазин (Flowershop)", 
        description: "Навчальний проєкт — сайт, який я розробляла для дисципліни <strong>«Цифровий бізнес»</strong>.", 
        link: "Flowershop.html" 
    },
    { 
        id: 2, 
        title: "Проєкт 2: Сайт-портфоліо", 
        description: "Розробка структури цього сайту з використанням семантичних тегів HTML5.", 
        link: "#" 
    }
];

const state = {
    query: "",
    theme: localStorage.getItem("theme") || "light"
};

document.addEventListener("DOMContentLoaded", () => {
    initApp();
});

function initApp() {
    loadSettings();
    bindEvents();
    render();
}

function bindEvents() {
    const themeBtn = document.querySelector("#themeToggle");
    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            state.theme = state.theme === "light" ? "dark" : "light";
            document.body.classList.toggle("dark");
            localStorage.setItem("theme", state.theme);
        });
    }

    const searchInput = document.querySelector("#searchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            state.query = e.target.value.toLowerCase();
            render(); 
        });
    }
}

function loadSettings() {
    if (state.theme === "dark") {
        document.body.classList.add("dark");
    }
}

function render() {
    const container = document.querySelector("#projectsList");
    if (!container) return; 

    const filtered = projects.filter(p => 
        p.title.toLowerCase().includes(state.query)
    );

    container.innerHTML = "";

    if (filtered.length === 0) {
        container.innerHTML = "<p>За вашим запитом нічого не знайдено.</p>";
        return;
    }

    filtered.forEach(p => {
        const card = document.createElement("article");
        card.className = "card";
        card.innerHTML = `
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <a href="${p.link}" target="_blank">Переглянути проєкт</a>
        `;
        container.append(card);
    });
}