import formatMarkdown from 'ghost-admin/utils/format-markdown';

export default {
    name: 'markdown',
    type: 'dom',
    render: function (opts) {
        let payload = opts.payload;
        let version = opts.options && opts.options.version || 2;
        // convert markdown to HTML ready for insertion into dom
        let html = formatMarkdown(payload.markdown || '');

        /**
         * @deprecated Ghost 1.0's markdown-only renderer wrapped cards. Remove in Ghost 3.0
         */
        if (version === 1) {
            html = `<div class="kg-card-markdown">${html}</div>`;
        }

        // use the SimpleDOM document to create a raw HTML section.
        // avoids parsing/rendering of potentially broken or unsupported HTML
        return opts.env.dom.createRawHTMLSection(html);
    }
};
