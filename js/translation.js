export function getCurrentLanguage(){
    return localStorage.getItem('current-language-key') || 'Ru';
}

function setLanguage(languageCode) {
    localStorage.setItem('current-language-key', languageCode);
}



document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const language = event.target.textContent.trim();
        switch (language) {
            case "O'zbek":
                setLanguage('Uz');
                break;
            case "English":
                setLanguage('En');
                break;
            case "Русский":
                setLanguage('Ru');
                break;
            case "Узбекча":
                setLanguage('UzRu');
                break;
            default:
                console.error('Language not recognized.');
                break;
        }
    });
});