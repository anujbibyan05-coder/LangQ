let warnings = 0;

window.addEventListener('blur', () => {

  warnings++;

  if (warnings >= 3) {

    alert('Too many tab switches. Test auto-submitted.');

    location.reload();
  }
});

document.addEventListener('contextmenu', e => {
  e.preventDefault();
});

document.addEventListener('copy', e => {
  e.preventDefault();
});
