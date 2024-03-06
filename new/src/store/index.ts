import { defineStore } from 'pinia';


const useBaseStore = defineStore('translate', {
	state: () => ({
		isLoggedIn: false,
	}),

})

export default useBaseStore;