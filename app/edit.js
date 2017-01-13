/**
 * Created by cedric on 13/01/17.
 */
var app = new Vue({
    el: '#myApp',
    data: {
        version: '1.0.0',
        title: '',
        author: '',
        sections: []
    },
    computed: {
        jsondatas() {
            var datas = {
                title: this.title,
                author: this.author,
                sections: this.sections
            };

            return JSON.stringify(datas);
        }
    },
    methods: {
        addSection() {
            var section = {
                id: guid(),
                title: '',
                content: ''
            };
            this.sections.push(section);
        },
        copy(event) {
            event.clipboardData.setData('application/json', jsondatas);
        }
    }
});

Vue.component('section-edit', {
    props: ['section', 'index'],
    template: `
     <transition name="fade">
        <div class="section">
            {{ index + 1 }}
            <hr>
            <div class="form-group">
                <label>Titre</label>
                <input v-model="section.title" placeholder="Enter un titre">
            </div>
            <div class="form-group">
                <label>Contenu</label>
                <textarea v-model="section.content" rows="5"
                          placeholder="Entrer le contenu de section"></textarea>
            </div>
        </div>
    </transition>`
})

//add clipboard copy lib event on COPIER button
new Clipboard('.js-copy');

// create a simple guid
// from http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}