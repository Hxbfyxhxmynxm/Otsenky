const loginForm = document.getElementById('login-form');
const loginCard = document.getElementById('login-card');
const dashboard = document.getElementById('dashboard');
const gradesContainer = document.getElementById('grades-container');
const logoutBtn = document.getElementById('logout-btn');
const errorMsg = document.getElementById('error-msg');
const submitBtn = document.getElementById('submit-btn');

document.addEventListener('DOMContentLoaded', () => {
    const savedLogin = localStorage.getItem('sn_user_login');
    const savedPass = localStorage.getItem('sn_user_pass');

    if (savedLogin && savedPass) {
        showDashboard();
        fetchGrades(savedLogin, savedPass);
    }
});

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.innerText = '';
    
    const login = document.getElementById('login').value.trim();
    const pass = document.getElementById('password').value.trim();

    submitBtn.innerText = 'Вход...';
    submitBtn.disabled = true;

    try {
        // Проверяем и сохраняем данные
        localStorage.setItem('sn_user_login', login);
        localStorage.setItem('sn_user_pass', pass);
        
        showDashboard();
        await fetchGrades(login, pass);
    } catch (err) {
        errorMsg.innerText = 'Ошибка авторизации';
    } finally {
        submitBtn.innerText = 'Войти';
        submitBtn.disabled = false;
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('sn_user_login');
    localStorage.removeItem('sn_user_pass');
    location.reload();
});

function showDashboard() {
    loginCard.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

async function fetchGrades(login, password) {
    gradesContainer.innerHTML = '<div class="loader">Загрузка оценок...</div>';

    // Здесь будет происходить запрос к Smart Nation через твой прокси-сервер
    // Позже укажем точный адрес запроса, а пока выведем шаблон:
    setTimeout(() => {
        gradesContainer.innerHTML = `
            <div class="subject-item">
                <span class="subject-name">Математика</span>
                <span class="grade-badge">5, 4, 5</span>
            </div>
            <div class="subject-item">
                <span class="subject-name">Физика</span>
                <span class="grade-badge">5, 5</span>
            </div>
        `;
    }, 1000);
}
