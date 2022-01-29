import Reveal from 'reveal.js';
import RevealHighlight from 'reveal.js/plugin/highlight/highlight.js'
import '../node_modules/reveal.js/dist/reveal.css';
import '../node_modules/reveal.js/dist/theme/sky.css';
import '../node_modules/reveal.js/plugin/highlight/monokai.css'

new Reveal().initialize({
  plugins: [ RevealHighlight ]
});