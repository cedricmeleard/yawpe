/**
 * Created by CMeleard on 10/01/2017.
 */
Vue.component('nav-buttons', {
    methods: {
        move(code) {
            app.$emit('move', code);
        }
    },
    template: `
        <div class="nav-buttons">
            <button class="simple-button" v-on:click="move(37)">Left</button>
            <button class="simple-button" v-on:click="move(38)">Up</button>
            <button class="simple-button" v-on:click="move(40)">Down</button>
            <button class="simple-button" v-on:click="move(39)">Right</button>
        </div>`
});