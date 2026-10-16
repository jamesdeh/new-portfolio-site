// load in <head> without defer so it runs before first paint
// sets the js flag for motion styles and restores paper mode
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  try {
    if (localStorage.getItem('jdh-mode') === 'paper') root.setAttribute('data-mode', 'paper');
  } catch (e) {
    // storage blocked, stay in noir
  }
})();
