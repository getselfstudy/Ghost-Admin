import Component from '@ember/component';
import layout from '../templates/components/selfstudy-atoms-soft-break';

export default Component.extend({
    layout,

    init() {
        this._super(...arguments);
        this.registerComponent(this);
    }
});
