const listValues = (obj: Record<string, string>) =>
  Object.values(obj)
    .map((c) => `'${c}'`)
    .join(", ");

export { listValues };
