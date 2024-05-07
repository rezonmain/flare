import { Geo } from "@/types/geo.types";

const makePoint = (geo: Geo) => {
  return `POINT(${geo.lat} ${geo.lng})`;
};

export { makePoint };
