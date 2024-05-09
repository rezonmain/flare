import { init } from "@paralleldrive/cuid2";
import { USER_ID_LENGTH } from "@/constants/user.constants";

const generateUserId = () => {
  return init({
    length: USER_ID_LENGTH,
  })();
};

export { generateUserId };
