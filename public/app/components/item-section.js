/**
 * Created by cedric on 08/01/17.
 */
Vue.component('item-section', {
    props: ['item', 'part'],
    data: function () {
        return {
            sections: this.item.sections
        };
    },
    computed: {
        section () {
            if (this.item.sections && this.item.sections.length != 0) {
                return this.item.sections[this.part];
            }
            else {
                return this.item;
            }
        },
        contentText(){
            if (Array.isArray(this.section.content)) {
                var lines = this.section.content.map(line => markdown.toHTML(line));
                return lines.join(" ");
            }
            else
                return markdown.toHTML(this.section.content);
        }
    },
    template: `
        <section class="item-section">        
            <header v-if="section.title" class="section-header">{{ section.title }}</header>
            <article v-if="section.content" class="section-content" v-html="contentText"></article>
            <footer class="section-footer"></footer>        
        </section>`
})

