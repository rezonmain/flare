const result = async <T>(query: any) => {
  const [res] = await query();
  return res[0] as T;
};

export { result };
