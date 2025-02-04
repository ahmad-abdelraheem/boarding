import style from "../../pages/Checkout/Checkout.module.scss";
import { ShippingFee } from "../../pages/Checkout";

interface CheckoutFormProps {
  name: string;
  phone: string;
  city: number;
  region: string;
  errors: {
    name: string;
    phone: string;
    city: string;
    region: string;
  };
  touched: {
    name: boolean;
    phone: boolean;
    city: boolean;
    region: boolean;
  };
  shippingFees: ShippingFee[],
  handleChange: (
    e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>,
    field: "name" | "phone" | "city" | "region"
  ) => void;
  handleBlur: (field: string) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  name,
  phone,
  city,
  region,
  errors,
  touched,
  shippingFees,
  handleChange,
  handleBlur,
}) => {

  return (
    <form className={style.submitForm}>
      <div className={style.inputGroup}>
        <label htmlFor="nameInput">الاسم</label>
        <input
          type="text"
          name="name"
          id="nameInput"
          value={name}
          onChange={(e) => handleChange(e, "name")}
          onBlur={() => handleBlur("name")}
          className={errors.name ? style.invalidInput : ""}
        />
        {errors.name && touched.name && (
          <p className={style.error}>{errors.name}</p>
        )}
      </div>
      <div className={style.inputGroup}>
        <label htmlFor="phoneInput">رقم الهاتف</label>
        <input
          type="text"
          name="phone"
          id="phoneInput"
          value={phone}
          onChange={(e) => handleChange(e, "phone")}
          onBlur={() => handleBlur("phone")}
          className={errors.phone ? style.invalidInput : ""}
        />
        {errors.phone && touched.phone && (
          <p className={style.error}>{errors.phone}</p>
        )}
      </div>
      <div className={style.inputGroup}>
        <label htmlFor="cityInput">المدينة</label>
        <select
          name="city"
          id="cityInput"
          value={city}
          onChange={(e) => handleChange(e, "city")}
          onBlur={() => handleBlur("city")}
          className={errors.city ? style.invalidInput : ""}
        >
          <option value="-1" disabled>
            --اختر--
          </option>
          {shippingFees?.map(fee => <option value={fee.id} key={`${fee.city}-option`}>{fee.city}</option>)}
        </select>
        {errors.city && touched.city && (
          <p className={style.error}>{errors.city}</p>
        )}
      </div>
      <div className={style.inputGroup}>
        <label htmlFor="regionInput">المنطقة</label>
        <input
          type="text"
          name="region"
          id="regionInput"
          value={region}
          onChange={(e) => handleChange(e, "region")}
          onBlur={() => handleBlur("region")}
          className={errors.region ? style.invalidInput : ""}
        />
        {errors.region && touched.region && (
          <p className={style.error}>{errors.region}</p>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
