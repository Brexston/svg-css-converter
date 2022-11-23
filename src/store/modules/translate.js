export default {
    state: {
        languages: {},
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
        }
    },
    getters: {
        getLanguages(state) {
            return state.languages
        },
        getTranslation(state) {
            return (lang,code) => {
                return state.languages[lang][code]
            }
        },
        getLoadedStatus(state) {
            return state.isLoaded
        }
    }
}