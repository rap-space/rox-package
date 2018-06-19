module.exports = {
  requireModule: name => {
    if (name === 'rapcaller') {
      return global.rapcaller;
    } else if (name === '@weex-module/user') {
      return {
        getUserInfo: callback => {
          callback(JSON.stringify({
            info: {
              userId: 111,
            }
          }));
        },
      };
    } else {
      console.error(`weex-module ${name} not found.`);
    }
  },
};
