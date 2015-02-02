document.write(require("./content.js"));
require("./style.css");

if (__DEV__) {
  console.warn('Extra logging');
}
// ...
if (__PRERELEASE__) {
  console.warn('Some dogfooding feature');
}

var showLoadingState = function() {
  document.write("Loading...");
};

var hideLoadingState = function() {
  document.write("Loaded");
};

if (window.location.pathname === '/feed') {
  showLoadingState();
  require.ensure([], function() { // this syntax is weird but it works
    hideLoadingState();
    require('./feed').show(); // when this function is called, the module is guaranteed to be synchronously available.
  });
} else if (window.location.pathname === '/profile') {
  showLoadingState();
  require.ensure([], function() {
    hideLoadingState();
    require('./profile').show();
  });
} else {
  showLoadingState();
  require.ensure([], function() {
    hideLoadingState();
    require('./profile').show();
  });
}