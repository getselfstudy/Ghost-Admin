// this card is just an alias of the `markdown` card which is necessary because
// our markdown-only editor was using the `card-markdown` card name
import markdownCard from './markdown';

const markdown = Object.assign({}, markdownCard, {name: 'card-markdown'});

export default markdown;
