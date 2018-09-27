import Component from '@ember/component';
import layout from '../templates/components/selfstudy-card-activity';
// import {isBlank} from '@ember/utils';
// import {run} from '@ember/runloop';
import {computed} from '@ember/object';
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

    answers: computed('payload.answers.[]', function update() {
        const answers = ((this.payload && this.payload.answers) || [])
            .filter(item => item.value)
            .map((item, index) => Object.assign({}, item, {index: index + 1}));

        answers.push({
            value: null,
            index: answers.length + 1
        });
        return answers;
    }),

    init() {
        this._super(...arguments);
        if (!this.payload) {
            this._updatePayloadAttr('stem', null);
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

        updateType(event) {
            const value = event.target.value;
            this._updatePayloadAttr('type', value);
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

        onAnswerChange(index, doc) {
            const answers = this.payload.answers || [];
            const containsAnswer = answers.filter(item => item.index === index);
            if (containsAnswer.length === 0) {
                answers.push({
                    index,
                    value: doc,
                    correct: false,
                    order: null
                });
            } else {
                containsAnswer[0].value = doc;
            }
            this._updatePayloadAttr('answers', answers);
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
        let payload = this.payload || {};
        let save = this.saveCard;

        set(payload, attr, value);

        // update the mobiledoc and stay in edit mode
        save(payload, false);
    }
});
