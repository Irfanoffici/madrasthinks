window.onerror = function(message, source, lineno, colno, error) {
  fetch('/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, source, lineno, colno, stack: error ? error.stack : '' })
  }).catch(e => console.log('Could not log error'));
};
window.addEventListener('unhandledrejection', function(event) {
  fetch('/log-error', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: event.reason ? event.reason.message : 'Promise rejected', stack: event.reason ? event.reason.stack : '' })
  }).catch(e => console.log('Could not log error'));
});
