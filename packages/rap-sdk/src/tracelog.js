
const logger = {
  // 之前是用 retcode 记录的
  // 由于历史原因，rox-page 中会调用该函数，导致会有 bug
  // 在此磨平差异
  setConfig: () => {
  },
};

export default logger;
