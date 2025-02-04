import { useEffect, useState } from "react";
import NumricInput from "../../components/NumricInput";
import { useProductContext } from "../../context/ProductContext";
import { ProductService } from "../../service/ProductService";
import { useNavigate } from "react-router-dom";
import style from "./Checkout.module.scss";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";
import { Product } from "../../types";
import axios from "axios";
import SocialLinks from "../../components/SocialLinks";
import classNames from "classnames";

export interface ShippingFee {
  id: number;
  city: string;
  fee: number;
}

enum RequestStatus {
  IDEAL = 0,
  LOADING = 1,
  FAILED = 2,
  SUCCESSED = 3,
}

const Checkout = () => {
  const { quantity, setQuantity, selection } = useProductContext();
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );
  const [shippingFees, setShippingFees] = useState<ShippingFee[]>([]);
  const [shippingFee, setShippingFee] = useState(0);
  const [requestStatus, setRequestStatus] = useState(RequestStatus.IDEAL);
  useEffect(() => {
    const fetchFees = async () => {
      const res = (
        await axios.get(
          "https://x8ki-letl-twmt.n7.xano.io/api:ZKCWC-RM/shipping"
        )
      ).data;

      setShippingFees(res);
    };

    fetchFees();
  }, []);

  useEffect(() => {
    const getSelected = async () => {
      const res = await ProductService.instance().getProduct(selection);
      console.log("res: ", res);
      setSelectedProduct(res);
    };

    getSelected();
  }, []);
  const navigate = useNavigate();

  // Form state
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(-1);
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
    return localPhonePattern.test(phone);
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
      newErrors.phone = "رقم الهاتف غير صالح (يجب أن يبدأ بـ 07)";
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
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>,
    field: "name" | "phone" | "city" | "region"
  ): void => {
    const value: string | number = e.target.value;
    if (field === "name") setName(value);
    if (field === "phone") setPhone(value);
    if (field === "city") {
      setCity(Number(value));
      setShippingFee(
        shippingFees.find((f) => f.id === Number(value))?.fee ?? 0
      );
    }
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
  const handleSubmit = async (): Promise<void> => {
    if (validateForm()) {
      const order = {
        name: name,
        phone_number: phone,
        city: city,
        address: region,
        game_id: selectedProduct?.id,
        quantity: quantity,
        status: "OPEN",
      };
      setRequestStatus(RequestStatus.LOADING);
      try {
        await axios.post(
          "https://x8ki-letl-twmt.n7.xano.io/api:RBbVK1Ck/order",
          order
        );
        setRequestStatus(RequestStatus.SUCCESSED);
        setTimeout(() => {
          navigate("home");
        }, 3000);
      } catch (error) {
        setRequestStatus(RequestStatus.FAILED);
      }
    }
  };

  return (
    <div className={style.checkout}>
      {(requestStatus === RequestStatus.LOADING ||
        requestStatus === RequestStatus.SUCCESSED) && (
        <div className={style.modal}>
          <div className={style.modalBody}>
            {requestStatus === RequestStatus.LOADING && (
              <>
                <img src="/loading.png" className={style.loading} />
                <span>جاري تأكيد الطلب...</span>
              </>
            )}
            {requestStatus === RequestStatus.SUCCESSED && (
              <>
                <img src="/check.png" />
                <span>تم الطلب بنجاح</span>
              </>
            )}
          </div>
        </div>
      )}
      {requestStatus === RequestStatus.FAILED && (
        <div className={classNames(style.modal, style.bgModal)}>
          <div className={style.modalBody}>
            <span>حدث خطأ ما</span>
            <span>تواصل معنا عبر المنصات الاتية</span>
            <SocialLinks />
          </div>
        </div>
      )}
      <section className={style.cartItem}>
        <div>
          <h2>{selectedProduct?.name || "صاحب صاحبه"}</h2>
          <span>{selectedProduct?.price ?? 10} د.أ</span>
          <NumricInput
            value={quantity}
            increment={incrementQuantity}
            decrement={decrementQuantity}
            removeWhenZero={true}
            maximum={selectedProduct?.quantity!}
          />
        </div>
        <img src="/product.jpeg" className={style.productImage} />
      </section>

      <CheckoutForm
        name={name}
        phone={phone}
        city={city}
        region={region}
        errors={errors}
        touched={touched}
        shippingFees={shippingFees}
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
            <span>{shippingFee}د.أ</span>
          </div>
        </div>
        <div className={style.receiptSummary + " " + style.receiptItem}>
          <h4>المجموع</h4>
          <span>{quantity * selectedProduct?.price! + shippingFee}د.أ</span>
        </div>
      </section>

      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        تأكيد الطلب
      </button>
    </div>
  );
};

export default Checkout;
