import { useState } from "react";
import NumricInput from "../../components/NumricInput";
import { useProductContext } from "../../context/ProductContext";
import { ProductService } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import style from "./Checkout.module.scss";

const Checkout = () => {
  const { quantity, setQuantity, selection } = useProductContext();
  const selectedProduct = ProductService._constructor().getProduct(selection);
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");

  // Error state
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
    city: "",
    region: "",
  });

  // Touched state to track when a field has been blurred
  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    city: false,
    region: false,
  });

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    quantity > 1 ? setQuantity((prev) => prev - 1) : removeSelection();
  };

  const removeSelection = () => {
    setQuantity(1);
    navigate("/");
  };

  // Phone number validation function
  const validatePhoneNumber = (phone) => {
    const localPhonePattern = /^07[789]\d{7}$/; // Matches 07 followed by 7, 8, or 9 and 7 more digits
    const internationalPhonePattern = /^(00962|\+962)[7-9]\d{7}$/; // Matches +962 or 00962 followed by 7, 8, or 9 and 7 more digits

    return (
      localPhonePattern.test(phone) || internationalPhonePattern.test(phone)
    );
  };

  // Validation function
  const validateForm = () => {
    let isValid = true;
    let newErrors = { name: "", phone: "", city: "", region: "" };

    if (!name.trim()) {
      newErrors.name = "الاسم مطلوب";
      isValid = false;
    }

    if (!phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    } else if (!validatePhoneNumber(phone)) {
      newErrors.phone = "رقم الهاتف غير صالح (يجب أن يبدأ بـ 07 أو +962/00962)";
      isValid = false;
    }

    if (!city) {
      newErrors.city = "المدينة مطلوبة";
      isValid = false;
    }

    if (!region.trim()) {
      newErrors.region = "المنطقة مطلوبة";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle input change and validate
  const handleChange = (e, field) => {
    const { value } = e.target;
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "city") setCity(value);
    if (field === "region") setRegion(value);

    // Validate when value changes if the field was already touched and invalid
    if (touched[field]) {
      validateForm();
    }
  };

  // Handle blur and validate
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate on blur if field is invalid
    validateForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Handle form submission (e.g., save data, make API call)
      console.log("Form submitted successfully!");
    }
  };

  return (
    <>
      <div>
        <section className={style.cartItem}>
          <div>
            <h2>{selectedProduct?.name}</h2>
            <span>{selectedProduct?.price} د.أ</span>
            <NumricInput
              value={quantity}
              increment={incrementQuantity}
              decrement={decrementQuantity}
              removeWhenZero={true}
            />
          </div>
          <img src={selectedProduct?.image} className={style.productImage} />
        </section>
        <section>
          <form className={style.submitForm} onSubmit={handleSubmit}>
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
                <option value="null" disabled>
                  --اختر--
                </option>
                <option value="amman">عمان</option>
                <option value="zarqa">الزرقاء</option>
                <option value="irbid">اربد</option>
                <option value="albalqa">البلقاء</option>
                <option value="madaba">مادبا</option>
                <option value="jarash">جرش</option>
                <option value="ajloun">عجلون</option>
                <option value="mafraq">المفرق</option>
                <option value="karak">الكرك</option>
                <option value="tafilah">الطفيلة</option>
                <option value="maan">معان</option>
                <option value="aqaba">العقبة</option>
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
        </section>
        <section>
          <div className={style.receiptDetails}>
            <div className={style.receiptItem}>
              <h4>{selectedProduct?.name}</h4>
              <span>
                {quantity * selectedProduct?.price!}د.أ ({quantity} *{" "}
                {selectedProduct?.price!})
              </span>
            </div>
            <div className={style.receiptItem}>
              <h4>توصيل خلال 48 ساعة</h4>
              <span>2د.أ</span>
            </div>
          </div>
          <div className={style.receiptSummary + " " + style.receiptItem}>
            <h4>المجموع</h4>
            <span>{quantity * selectedProduct?.price! + 2}د.أ</span>
          </div>
        </section>
        <button type="submit" className="btn btn-primary">
          تأكيد الطلب
        </button>
      </div>
    </>
  );
};

export default Checkout;
