export default {
    install(Vue){
       Vue.component('terminal-table',require('./App').default);
    }
}