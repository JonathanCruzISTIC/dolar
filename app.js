let eventInstall;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();

    eventInstall = e;
    console.log('APP Lista para se instalada')
    // Lógica para activar el prompt de intalación
    app.btnVisible = true;
});

navigator.serviceWorker.register('sw.js');

const app = new Vue({
    el: '#app',
    data: {
        dolar: '',
        pesos: '',
        valor: 0,
        btnVisible: false
    },
    created(){
        const valor = parseInt( localStorage.getItem('valor') );
        if( !valor ) {
            // fetch a una API
            this.valor = parseInt( prompt('¿Cuanto vale el dolar hoy?') )
            localStorage.setItem('valor', this.valor);
        } else {
            this.valor = valor;
        }


    },
    methods: {
        calcular(){
            this.pesos = this.dolar * this.valor;
        },
        instalar(){
            eventInstall.prompt();
            eventInstall.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('La aplicación fue instalada con éxito');
                app.btnVisible = false
              }
            });
        }
    }
})











