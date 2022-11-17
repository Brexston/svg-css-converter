export default {
    state: {
        languages: {}
    },
    
    actions: {
        async loadTranslate({commit}) {
            const response = await fetch('../translate/translate.json')
            const languages = await response.json()

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
        }
    }
}