export function logAllEvents(target: any, prefix: string) {
  getAllProps(target)
    .filter(x => x.startsWith('on'))
    .map(
      x => (target[x] = (e: any) => console.debug(`${prefix} event "${x}"`, e)),
    );
}

function getAllProps(value: any) {
  let result = [];
  let target = value;

  while (target) {
    result.push(...Object.keys(target));
    target = Object.getPrototypeOf(target);
  }

  return uniq(result);
}

function uniq<T>(list: T[]) {
  return Array.from(new Set(list));
}

// function cloneEvent(obj: any) {
//   return {
//     ...clone(obj),
//     target: obj.target && clone(obj.target),
//   };
// }

// function clone(obj: any) {
//   return (
//     getAllProps(obj)
//       .filter(x => typeof obj[x] !== 'function')
//       // @ts-ignore
//       .reduce((r, x) => ((r[x] = obj[x]), r), {})
//   );
// }
