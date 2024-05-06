import { FLARE_ID_LENGTH } from "@/constants/flare.constants";
import { init } from "@paralleldrive/cuid2";

const generateFlareId = () => {
  return init({
    length: FLARE_ID_LENGTH,
  })();
};

export { generateFlareId };
