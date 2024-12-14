import { useState } from "react";
import NumricInput from "../../components/NumricInput";
import { useProductContext } from "../../context/ProductContext";
import { ProductService } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import style from "./Checkout.module.scss";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";

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
  const validatePhoneNumber = (phone: string) => {
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

  // Handle blur and validate
  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateForm();
  };

  /**
   * Handles input change and validates the field.
   * @param e the event, should be of type React.ChangeEvent<HTMLInputElement>
   * @param field the name of the field to update and validate
   * @returns void
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>,
    field: "name" | "phone" | "city" | "region"
  ): void => {
    const value: string = e.target.value;
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "city") setCity(value);
    if (field === "region") setRegion(value);

    // Validate when value changes if the field was already touched and invalid
    if (touched[field]) {
      validateForm();
    }
  };

  /**
   * Handles form submission and validates the form before submission.
   * @param e the React.FormEvent<HTMLFormElement> event
   * @returns void
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission (e.g., save data, make API call)
      console.log("Form submitted successfully!");
    }
  };

  return (
      <div className={style.checkout}>
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

        <CheckoutForm
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          city={city}
          setCity={setCity}
          region={region}
          setRegion={setRegion}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          handleBlur={handleBlur}
        />

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

        <button type="submit" className="btn btn-primary" disabled>
          تأكيد الطلب
        </button>
        <span className="error-msg">الطلب غير متوفر حاليا، سيتم توفير المنتج في اقرب وقت</span>
      </div>
  );
};

export default Checkout;
