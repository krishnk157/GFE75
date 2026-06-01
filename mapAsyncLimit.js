export default async function mapAsyncLimit(iterable, callbackFn, size) {
  size = size || iterable.length;
  const res = [];
  for (let i = 0; i < iterable.length; i += size) {
    const chunk = iterable.slice(i, i + size);
    const chunkRes = await Promise.all(chunk.map(callbackFn));
    res.push(...chunkRes);
  }
  return res;
}
