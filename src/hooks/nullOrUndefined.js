export const isNullOrUndefined = (value) => {
  return value === null || value === undefined;
};

export const isNotNullOrUndefined = (value) => {
  return !isNullOrUndefined(value);
};
