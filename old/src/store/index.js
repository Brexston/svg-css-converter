import { createStore } from "vuex";
import translate from "./modules/translate";

const store = createStore({
    modules: {
        translate
    }
});

export default store;