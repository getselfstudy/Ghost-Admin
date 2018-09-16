import Component from '@ember/component';
import layout from '../templates/components/selfstudy-card-section';
import {BLANK_DOC} from './koenig-editor';
// import {isBlank} from '@ember/utils';
// import {run} from '@ember/runloop';
import {set} from '@ember/object';

export default Component.extend({
    layout,
    tagName: '',
    isSelected: false,
    isEditing: false,
    payload: null,

    // closure actions
    selectCard() {},
    deselectCard() {},
    originalSelectCard() {},
    editCard() {},
    saveCard() {},
    registerComponent() {},
    moveCursorToNextSection() {},
    moveCursorToPrevSection() {},
    addParagraphAfterCard() {},

    init() {
        this._super(...arguments);
        let payload = this.payload || {};
        if (!payload.mobiledoc) {
            this._updatePayloadAttr('mobiledoc', BLANK_DOC);
        }
        this.registerComponent(this);
    },

    actions: {
        onSubmit(/* event */) {
            return false;
        },
        
        setPublishedAtBlogDate(date) {
            this._updatePayloadAttr('date', date);
        },

        setPublishedAtBlogTime(time) {
            this._updatePayloadAttr('time', time);
        },

        updateText(event) {
            const text = event.target.value;
            this._updatePayloadAttr('text', text);
        },

        updateTextKeydown(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                // this.convertUrl.perform(this.payload.url);
                this.saveCard(this.payload, false);
                this.deselectCard();
            }

            if (event.key === 'Escape') {
                event.target.blur();
                this.deleteCard();
            }
        },

        focusItem(event) {
            event.target.select();
            event.stopPropagation();
        },

        leaveEditMode() {
            // if (isBlank(this.payload.html)) {
            //     // afterRender is required to avoid double modification of `isSelected`
            //     // TODO: see if there's a way to avoid afterRender
            //     run.scheduleOnce('afterRender', this, function () {
            //         this.deleteCard();
            //     });
            // }
        },

        onBodyChange(doc) {
            this._updatePayloadAttr('mobiledoc', doc);
        },

        onEditorCreated(/* editor */) {

        },

        focusTitle() {

        },

        onWordCountChange(/* count */) {

        }
    },

    _updatePayloadAttr(attr, value) {
        let payload = this.payload;
        let save = this.saveCard;

        set(payload, attr, value);

        // update the mobiledoc and stay in edit mode
        save(payload, false);
    }
});
