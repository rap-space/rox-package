export default function() {
  let deferred = {
    always(...args) {
      this.promise.then(...args);
      this.promise.catch(...args);
      return this;
    }
  };
  deferred.promise = new Promise((resolve, reject) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });
  return deferred;
}
