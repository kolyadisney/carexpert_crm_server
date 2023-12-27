export function setSkipTake(
  skip: number,
  take: number,
): {
  skip: number;
  take: number;
} {
  const takeDefault = 12;

  if (!skip) {
    skip = 1;
  }

  return {
    skip: skip ? skip : 0,
    take: take ? take : takeDefault,
  };
}
