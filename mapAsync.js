export default async function mapAsync(iterable, callbackFn) {
  return Promise.all(iterable.map((item) => callbackFn(item)));
}
