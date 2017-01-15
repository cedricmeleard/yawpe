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
                content: '',
                sections: []
            };
            this.sections.push(section);
        },
        remove(section) {
            var index = this.sections.indexOf(section);
            this.sections.splice(index, 1);
        },
        copy(event) {
            event.clipboardData.setData('application/json', jsondatas);
        },
        save() {
            localStorage.setItem('temp-save-datas', this.jsondatas);
        }
    }
});

Vue.component('section-edit', {
    props: ['section', 'index'],
    methods: {
        addPart() {
            var part = {
                id: guid(),
                title: '',
                content: ''
            };
            this.section.sections.push(part);
        },
        remove() {
            this.$emit('remove', this.section);
        },
        removePart(section){
            var index = this.section.sections.indexOf(section);
            this.section.sections.splice(index, 1);
        }
    },
    template: `
     <transition name="fade">
        <div class="section section-edit">
            <div class="section-title">
                <label class="title-text">{{index + 1}}</label> 
                <button class="icon" @click="remove">Suppr.</button></div>
            <hr>
            <button class="plain" @click="addPart">Ajouter une sous-section</button>
            <transition name="fade">
                <div v-if="section.sections.length == 0">
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
                <div v-else>
                    <ul>
                        <li v-for="(part, index) in section.sections">
                            <part-section :section="part" :index="index" v-on:remove="removePart"></part-section>
                        </li>
                    </ul>    
                </div>
            </transition>
        </div>
    </transition>`
});

Vue.component('part-section', {
    props: ['section', 'index'],
    methods: {
        remove(){
            this.$emit('remove', this.section);
        }
    },
    template: `
    <div class="sub-section">
       <div class="section-title">
            <label class="title-text">{{index + 1}}</label>
            <button class="icon" @click="remove">Suppr.</button></div>
       <hr/>
       <div class="form-group">
            <label>Titre</label>
            <input v-model="section.title" placeholder="Enter un titre">
       </div>
       <div class="form-group">
            <label>Contenu</label>
            <textarea v-model="section.content" rows="5"
                      placeholder="Entrer le contenu"></textarea>
       </div>
    </div>
`
});

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

var locals = localStorage.getItem('temp-save-datas');
if (locals) {
    var savedDatas = JSON.parse(locals);
    app.title = savedDatas.title;
    app.author = savedDatas.author;
    app.sections = savedDatas.sections;

    localStorage.removeItem('temp-save-datas');
}