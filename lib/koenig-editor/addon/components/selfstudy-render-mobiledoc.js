import RenderMobiledoc from 'ember-mobiledoc-dom-renderer/components/render-mobiledoc';
import {CARD_COMPONENT_MAP} from '../options/cards';

export default RenderMobiledoc.extend({
    init() {
        this._super(...arguments);
        this.set('cardNames', ['embed', 'image', 'section', 'html', 'markdown', 'code', 'hr', 'gallery']);
        this.set('atomNames', ['soft-return']);
    },

    cardNameToComponentName(mobiledocCardName) {
        return CARD_COMPONENT_MAP[mobiledocCardName];
    },
    atomNameToComponentName(mobiledocAtomName) {
        return 'selfstudy-atoms-' + mobiledocAtomName;
    }
});