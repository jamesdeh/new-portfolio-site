// load in <head> without defer so it runs before first paint
// sets the js flag for motion styles, marks apple devices for the ⌘ shortcut and restores paper mode
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const platform = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || '';
  if (/mac|iphone|ipad|ipod/i.test(platform)) root.setAttribute('data-os', 'mac');
  try {
    if (localStorage.getItem('jdh-mode') === 'paper') root.setAttribute('data-mode', 'paper');
  } catch (e) {
    // storage blocked, stay in noir
  }
})();
