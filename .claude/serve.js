// Local preview of site/: the same range-aware server the tests use
// (tests/serve.mjs), so videos play in Safari as they will on GitHub Pages
import('../tests/serve.mjs').then(({ handler }) =>
  require('http').createServer(handler).listen(+process.env.PORT || 5178, function () { console.log('serving jatin-site on port ' + this.address().port); }));
