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
        getLanguages(state) {
            return state.languages
        },
        getTranslation(state) {
            return (code,defaultText) => {
                return state.languages[state.currentLanguage][code] ? state.languages[state.currentLanguage][code] : defaultText
            }
        },
        getLoadedStatus(state) {
            return state.isLoaded
        }
    }
}