(function () {
  const iframeScript = document.createElement('script');
  iframeScript.type = 'module';
  iframeScript.src = 'https://YOUR-DEPLOYED-URL/embed.js';
  document.body.appendChild(iframeScript);
})();
