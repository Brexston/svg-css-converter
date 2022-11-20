export default {
    state: {
        languages: {},
    },
    
    actions: {
        async loadTranslate({commit}) {
            const languages = require('../../translate/translate.json')

            commit('updateLanguage', languages)
        }
    },
    mutations: {
        updateLanguage(state,languages) {
            state.languages = languages
        },        
    },
    getters: {
        getLanguages(state) {
            return state.languages
        },
        getTranslation(state) {
            return (lang,code) => {
                return state.languages[lang][code]
            }
        }
    }
}