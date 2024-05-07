const result = async <T>(query: any) => {
  const [res] = await query();
  return res[0] as T;
};

const results = async <T>(query: any) => {
  const [res] = await query();
  return res as T[];
};

export { result, results };
