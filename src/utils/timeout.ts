export async function callWithTimeout<Args extends any[], ReturnType>(
  f: (...args: Args) => ReturnType,
  timeout: number,
  args: Args
): Promise<ReturnType> {
  const callF = async () => f(...args);
  const timeoutF = new Promise<never>((_, reject) => {
    setTimeout(() => {
      reject("timed out");
    }, timeout);
  });
  return await Promise.race([callF(), timeoutF]);
}
