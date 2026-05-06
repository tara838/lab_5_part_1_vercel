// 1. LocalStorage: Дані про систему
const browserData = {
    platform: navigator.platform,
    agent: navigator.userAgent,
    lang: navigator.language
};
localStorage.setItem('userSystemInfo', JSON.stringify(browserData));
const savedInfo = JSON.parse(localStorage.getItem('userSystemInfo'));
document.getElementById('my-footer').innerHTML += `<p>User Agent: ${savedInfo.agent}</p> 
                <p>ОС: ${savedInfo.platform}</p> 
                <p>Мова: ${savedInfo.lang}</p>`;

// 2. Fetch API: Коментарі
async function loadComments() {
    const myVariant = 24;
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${myVariant}/comments`);
        const comments = await response.json();
        const container = document.getElementById('comments-container');
        container.innerHTML = '';

        comments.forEach(c => {
            container.innerHTML += `
                <div class="comment-card">
                    <strong>${c.name}</strong> (${c.email})
                    <p>${c.body}</p>
                </div>`;
        });
    } catch (e) { console.error("Помилка:", e); }
}
loadComments();

// 3. Модальне вікно через 60 сек
setTimeout(() => {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
}, 60000);

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

// 4. Теми
function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

function autoTheme() {
    const hours = new Date().getHours();
    if (hours < 7 || hours >= 21) {
        document.body.classList.add('dark-theme');
    }
}
autoTheme();