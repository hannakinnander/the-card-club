import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { z } from "zod";

// const schema = z.object({

// })

const ShippingMethodForm = () => {
  return (
    <form>
      <label>
        <input type="radio" />
        Instabox
      </label>
      <label>
        <input type="radio" />
        Postnord
      </label>
      <label>
        <input type="radio" />
        DHL
      </label>
    </form>
  );
};
