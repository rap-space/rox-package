function requireModule(moduleName) {
  let weexModule = null;

  // 直接引用，因为引用时可能会带前缀，也可能不会带前缀
  // 虽然可以使用 .replace('@weex-module/', '') 统一去除前缀，再引用
  // 但这样，以后就引用不了不带前缀的，所以，这里兼容处理一下
  try {
    if (window.require) {
      weexModule = window.require(moduleName);
    }
  } catch (err) {}

  // 添加前缀引用
  try {
    if (window.require) {
      weexModule = window.require('@weex-module/' + moduleName);
    }
  } catch (err) {}

  if (weexModule) {
    return weexModule;
  }

  console.log(`require ${moduleName} error, NOT FOUND.`);
  return {};
}

export default { requireModule };
