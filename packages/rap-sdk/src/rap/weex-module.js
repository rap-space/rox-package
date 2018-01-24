function requireModule(moduleName) {
  let weexModule;
  if (window.require) {
    weexModule = window.require('@weex-module/' + moduleName);
  }
  return weexModule;
}

export default { requireModule };
