export default function deepClone<T>(obj: T): T {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // 处理数组
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  // 处理普通对象
  const cloned = {} as T;
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      // 处理函数
      if (typeof value === "function") {
        cloned[key] = value.bind(cloned);
      } else {
        cloned[key] = deepClone(value);
      }
    }
  }
  
  return cloned;
}