export async function callWithTimeout<Args extends any[], ReturnType>(
  f: (...args: Args) => ReturnType,
  timeout: number,
  args: Args
): Promise<ReturnType> {
  const callF = async () => f(...args);
  const timeoutF = setTimeout(() => {
    return "timed-out";
  }, timeout);
  const result = await Promise.race([callF(), timeoutF]);
  if (result !== "timed-out") {
    throw new Error(`timed out when calling ${f.toString()}`);
  }
  return result;
}
