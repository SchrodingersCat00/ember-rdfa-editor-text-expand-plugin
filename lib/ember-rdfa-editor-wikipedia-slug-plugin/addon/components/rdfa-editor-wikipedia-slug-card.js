import Component from '@glimmer/component';
import { action } from '@ember/object';

/**
* Card that prompts the user to insert a wikipedia link
*
* @module editor-wikipedia-slug-plugin
* @class RelatedUrlCard
* @extends Glimmer.Component
*/
export default class RdfaEditorWikipediaSlugCardComponent extends Component {

    constructor(){
        super(...arguments);
        this.insertkeyEventListener = this.insertkeyEventListener.bind(this);
    }

    @action
    onRender(){
        document.addEventListener('keyup', this.insertkeyEventListener);
    }

    @action
    onWillDestroy(){
        document.removeEventListener('keyup', this.insertkeyEventListener);
    }

    insertkeyEventListener(event){
        if (event.keyCode === 9){
            this.insert();
        }
    }

    @action
    insert(){
        const info = this.args.info;
        info.hintsRegistry.removeHintsAtLocation(info.location, info.hrId, "wikipedia-slug-scope");
        const mappedLocation = info.hintsRegistry.updateLocationToCurrentIndex(info.hrId, info.location);
        let selection = info.editor.selectHighlight(mappedLocation);
        info.editor.update( selection, {
            set: { innerHTML: info.text }
        });
    }
}
