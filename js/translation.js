export function useTranslate(translations){
    // let languageValue = "Русский";
    // switch(localStorage.getItem('current-language-key')){
    //     case "Ru":
    //         languageValue = "Русский";
    //         break;
    //     case "En":
    //         languageValue = "English";
    //         break;
    //     case "Uz":
    //         languageValue = "O'zbekcha";
    //         break;
    //     case "UzRu":
    //         languageValue = "Узбекча";
    //         break;
    //     case "Kaa":
    //         languageValue = "Qoraqalpoqcha";
    //         break;
    //     default:
    //         console.error('Language not recognized.');
    //         break;
    // }
    
    // const currentLanguage = document.getElementById('current-language');
    // currentLanguage.textContent = 'English';

    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = key.split('.').reduce((obj, i) => obj && obj[i], translations);
        if (value) {
            element.textContent = value;
        }
    });

    const messageTextarea = document.querySelector('#message');
    messageTextarea.placeholder = translations['contact_form']['message_placeholder'];

    const submitButton = document.querySelector('#submitButton');
    submitButton.value = translations['contact_form']['submit'];
}

export function getCurrentLanguage(){
    return localStorage.getItem('current-language-key') || 'Ru';
}