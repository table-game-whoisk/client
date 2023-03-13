export function debounce(fn: (...args: any) => void, wait = 300) {
  let timer: NodeJS.Timeout | null = null;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn(...args);
    }, wait);
  };
}
