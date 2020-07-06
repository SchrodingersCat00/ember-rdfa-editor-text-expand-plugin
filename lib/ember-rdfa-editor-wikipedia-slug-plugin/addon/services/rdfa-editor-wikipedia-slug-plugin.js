import Service from '@ember/service';
import normalizeLocation from '../utils/normalize-location';

const COMPONENT_ID = 'rdfa-editor-wikipedia-slug-card';

/**
 * Service responsible for correct annotation of dates
 *
 * @module editor-wikipedia-slug-plugin
 * @class RdfaEditorRelatedUrlPlugin
 * @constructor
 * @extends EmberService
 */

export default class RdfaEditorWikipediaSlugPluginService extends Service {

    /**
     * task to handle the incoming events from the editor dispatcher
     *
     * @method execute
     *
     * @param {string} hrId Unique identifier of the event in the hintsRegistry
     * @param {Array} contexts RDFa contexts of the text snippets the event applies on
     * @param {Object} hints Registry Registry of hints in the editor
     * @param {Object} editor The RDFa editor instance
     *
     * @public
     */
    execute(hrId, rdfaBlocks, hintsRegistry, editor) {
        hintsRegistry.removeHintsInRdfaBlocks(rdfaBlocks, hrId, COMPONENT_ID);

        for (const rdfaBlock of rdfaBlocks) {
            let idx = rdfaBlock.text.toLowerCase().indexOf('hello');
            if (idx !== -1) {
                // the hintsregistry needs to know the location with respect to the document
                const absoluteLocation = normalizeLocation([idx, idx + 'hello'.length], rdfaBlock.region);
                hintsRegistry.addHint(hrId, COMPONENT_ID, {
                    // info for the hintsRegistry
                    location: absoluteLocation,
                    card: COMPONENT_ID,
                    // any content you need to render the component and handle its actions
                    info: {
                        hrId, hintsRegistry, editor,
                        location: absoluteLocation,
                        term: "obama"
                    }
                });
            }
        }
    }
}