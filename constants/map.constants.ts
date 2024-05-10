import { MapCapabilities } from "@/constants/map.enum";

const _MAP_ID = "8e0a97af9386fef";
const MAP_ID = "739af084373f96fe";

const BASE_CAPABILITIES = [
  MapCapabilities.FLARE_ADD,
  MapCapabilities.STATE_ON_IDLE,
];

const ADMIN_CAPABILITIES = [
  MapCapabilities.FLARE_ADD,
  MapCapabilities.FLARE_ADD_ANY_WHERE,
  MapCapabilities.STATE_ON_IDLE,
  MapCapabilities.FLARE_DELETE,
];

export { MAP_ID, BASE_CAPABILITIES, ADMIN_CAPABILITIES };
