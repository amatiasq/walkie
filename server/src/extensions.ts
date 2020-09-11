declare interface Function {
  unbind(): Function;
}

Function.prototype.unbind = function () {
  const fn = this;

  return function <T extends readonly unknown[]>(this: any, ...args: T) {
    fn(this, ...args);
  };
};
