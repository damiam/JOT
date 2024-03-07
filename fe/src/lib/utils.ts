import type { AxiosResponse } from "axios";

export const unwrap = async <T>(p: Promise<AxiosResponse<T, any>>) => {
  const { data } = await p;
  return data;
};
