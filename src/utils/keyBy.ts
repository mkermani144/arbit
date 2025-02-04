export const keyBy = <T>(arr: T[], key: keyof T) => {
  return arr.reduce(
    (acc, item) => ({
      ...acc,
      [item[key] as string]: item,
    }),
    {} as Record<string, T>,
  );
};
