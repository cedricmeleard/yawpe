/**
 * Created by cedric on 08/01/17.
 */
Vue.component('item-section', {
    props : ['item', 'part'],
    data : function() {
        return {
            sections : this.item.sections
        };
    },
    computed : {
        section () {
            if (this.item.sections) {
                return this.item.sections[this.part];
            }
            else {
                return this.item;
            }
        }
    },
    template: `
        <section class="item-section">        
            <header v-if="section.title" class="section-header">{{ section.title }}</header>
            <article v-if="section.content" class="section-content">{{ section.content }}</article>
            <footer class="section-footer"></footer>        
        </section>`
});