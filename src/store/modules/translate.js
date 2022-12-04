export default {
    state: {
        languages: {},
        currentLanguage: 'ru',
        isLoaded: false
    },
    
    actions: {
        async loadTranslate({commit}) {
            const languages = require('../../translate/translate.json')
            commit('updateLanguage', languages)
            commit('updateStatusLoading')
        }
    },
    mutations: {
        updateLanguage(state,languages) {
            state.languages = languages
        },
        updateStatusLoading(state) {
            state.isLoaded = true
        },
        updateCurrentLanguage(state,lang) {
            state.currentLanguage = lang
        }
    },
    getters: {
        getLanguages: state => state.languages,
        getLoadedStatus: state => state.isLoaded,
        getCurrentLanguage: state => state.currentLanguage,
        getTranslation(state) {
            return (code,defaultText) => {
                console.log(state.languages)
                return state.languages[state.currentLanguage][code] ? state.languages[state.currentLanguage][code] : defaultText
            }
        },
        
    }
}