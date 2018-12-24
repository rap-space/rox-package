function requireModule(moduleName) {
  try {
    let weexModule;
    if (window.require) {
      weexModule = window.require('@weex-module/' + moduleName);
    }
    return weexModule;
  } catch (err) {
    console.log(err);
    console.log(`require ${moduleName} error`);
    return {};
  }
}

export default { requireModule };
