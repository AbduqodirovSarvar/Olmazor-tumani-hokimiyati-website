function useTranslate(){
    let languageValue = "Русский";
    switch(localStorage.getItem('current-language-key')){
        case "Ru":
            languageValue = "Русский";
            break;
        case "En":
            languageValue = "English";
            break;
        case "Uz":
            languageValue = "O'zbekcha";
            break;
        case "UzRu":
            languageValue = "Узбекча";
            break;
        case "Kaa":
            languageValue = "Qoraqalpoqcha";
            break;
        default:
            console.error('Language not recognized.');
            break;
    }
    
    const navLink = document.getElementById('current-language');
    navLink.textContent = languageValue;
}

export function getCurrentLanguage(){
    return localStorage.getItem('current-language-key') || 'Ru';
}

function setLanguage(languageCode) {
    localStorage.setItem('current-language-key', languageCode);
    location.reload();
}



document.querySelectorAll('.tr-link').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const language = event.target.textContent.trim();
        const navLink = document.getElementById('current-language');
        navLink.textContent = language;
        console.log(language);
        switch (language) {
            case "O'zbekcha":
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
            case "Qoraqalpoqcha":
                setLanguage('Kaa');
                break;
            default:
                console.error('Language not recognized.');
                break;
        }
    });
});


useTranslate();