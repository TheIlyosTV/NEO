"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, CreditCard, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useCart } from "@/context/cart-context";
import { useLanguage } from "@/context/language-context";

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const { items, subtotal, clearCart } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [cardType, setCardType] = useState<string>("");
  const { t } = useLanguage();

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "us",
    cardNumber: "",
    expiry: "",
    cvc: "",
    nameOnCard: "",
  });

  // Calculate shipping - free over $100
  const shipping = subtotal > 100 ? 0 : 9.99;

  // Calculate total
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    let newValue = value;

    // Karta raqami uchun formatlash
    if (id === "cardNumber") {
      // Faqat raqamlarga ruxsat berish
      newValue = newValue.replace(/\D/g, "");
      // 16 ta raqamdan oshmasligi
      newValue = newValue.slice(0, 16);
      // Har 4 ta raqamdan keyin probel qo'yish
      newValue = newValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    }

    // Amal qilish muddati uchun formatlash
    if (id === "expiry") {
      // Faqat raqamlarga ruxsat berish
      newValue = newValue.replace(/\D/g, "");
      // 4 ta raqamdan oshmasligi
      newValue = newValue.slice(0, 4);
      // 2 ta raqamdan keyin / qo'yish
      if (newValue.length > 2) {
        newValue = newValue.replace(/(\d{2})(\d{0,2})/, "$1/$2");
      }
    }

    setFormData((prev) => ({ ...prev, [id]: newValue }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }));

    // Clear error when user selects an option
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: "" }));
    }
  };

  const validateShippingForm = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields = [
      { id: "firstName", name: "First Name" },
      { id: "lastName", name: "Last Name" },
      { id: "email", name: "Email" },
      { id: "phone", name: "Phone" },
      { id: "address", name: "Address" },
      { id: "city", name: "City" },
      { id: "state", name: "State" },
      { id: "zip", name: "ZIP Code" },
      { id: "country", name: "Country" },
    ];

    requiredFields.forEach(({ id, name }) => {
      if (!formData[id as keyof typeof formData]) {
        newErrors[id] = `${name} is required`;
      }
    });

    // Email validation
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Phone validation
    if (formData.phone && !/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Agar country Uzbekistan bo'lmasa, xato qo'shamiz
    if (formData.country && formData.country !== "uz") {
      newErrors.country = "Please contact admin for other countries";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Continue to Payment tugmasi uchun shart qo'shamiz
  const isContinueButtonDisabled = () => {
    // Agar country tanlanmagan bo'lsa yoki Uzbekistan bo'lmasa, tugma disable bo'ladi
    return !formData.country || formData.country !== "uz";
  };

  const validatePaymentForm = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "credit-card") {
      const requiredFields = [
        { id: "cardNumber", name: "Karta raqami" },
        { id: "expiry", name: "Amal qilish muddati" },
        { id: "nameOnCard", name: "Karta egasining ismi" },
      ];

      // Mastercard/Visa uchun CVC maydonini qo'shamiz
      if (cardType === "mastercard" || cardType === "visa") {
        requiredFields.push({ id: "cvc", name: "CVC" });
      }

      requiredFields.forEach(({ id, name }) => {
        if (!formData[id as keyof typeof formData]) {
          newErrors[id] = `${name} maydoni to'ldirilishi shart`;
        }
      });

      // Karta raqami validatsiyasi
      if (formData.cardNumber) {
        const cleanedCardNumber = formData.cardNumber.replace(/\s/g, "");

        if (cleanedCardNumber.length !== 16) {
          newErrors.cardNumber =
            "Karta raqami 16 ta raqamdan iborat bo'lishi kerak";
        } else if (cardType === "humo" && !/^9860/.test(cleanedCardNumber)) {
          newErrors.cardNumber = "Humo kartasi 9860 bilan boshlanishi kerak";
        } else if (cardType === "uzcard" && !/^8600/.test(cleanedCardNumber)) {
          newErrors.cardNumber = "Uzcard kartasi 8600 bilan boshlanishi kerak";
        } else if (
          cardType === "mastercard" &&
          !/^5[1-5]/.test(cleanedCardNumber)
        ) {
          newErrors.cardNumber =
            "Mastercard 51-55 oralig'ida boshlanishi kerak";
        } else if (cardType === "visa" && !/^4/.test(cleanedCardNumber)) {
          newErrors.cardNumber = "Visa kartasi 4 bilan boshlanishi kerak";
        }
      }

      // Amal qilish muddati validatsiyasi
      if (formData.expiry) {
        const [month, year] = formData.expiry.split("/");

        if (!month || !year || month.length !== 2 || year.length !== 2) {
          newErrors.expiry = "Iltimos, to'g'ri formatda kiriting (OO/YY)";
        } else {
          const monthNum = parseInt(month);
          const currentYear = new Date().getFullYear() % 100;
          const currentMonth = new Date().getMonth() + 1;
          const yearNum = parseInt(year);

          if (monthNum < 1 || monthNum > 12) {
            newErrors.expiry = "Noto'g'ri oy raqami";
          } else if (
            yearNum < currentYear ||
            (yearNum === currentYear && monthNum < currentMonth)
          ) {
            newErrors.expiry = "Kartaning amal qilish muddati tugagan";
          }
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const nextStep = () => {
    if (step === 1 && !validateShippingForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    if (step === 2 && !validatePaymentForm()) {
      // Scroll to first error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        document.getElementById(firstError)?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setStep((prev) => prev + 1);
    window.scrollTo(0, 0);

    // If moving to confirmation step, simulate order completion
    if (step === 2) {
      setTimeout(() => {
        clearCart();
      }, 1000);
    }
  };

  const prevStep = () => {
    setStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  // If cart is empty and not in confirmation step, redirect to cart
  if (items.length === 0 && step !== 3) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-600 mb-8">
          Add some items to your cart before checking out.
        </p>
        <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
          <Link href="/">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center text-sm mb-8">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              {t.home || "Home"}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <Link href="/cart" className="text-gray-500 hover:text-gray-700">
              {t.cart || "Cart"}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <span className="text-gray-900 font-medium">
              {t.checkout || "Checkout"}
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-8">
            {t.checkout || "Checkout"}
          </h1>

          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between max-w-2xl mx-auto">
              {/* ... (steps indicator remains the same) ... */}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border p-6">
                {/* Step 1: Shipping Information */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-6">
                      {t.shippingInformation || "Shipping Information"}
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName">
                          {t.firstName || "First Name"}
                        </Label>
                        <Input
                          id="firstName"
                          className={`mt-1 ${
                            errors.firstName ? "border-red-500" : ""
                          }`}
                          value={formData.firstName}
                          onChange={handleInputChange}
                        />
                        {errors.firstName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName">
                          {t.lastName || "Last Name"}
                        </Label>
                        <Input
                          id="lastName"
                          className={`mt-1 ${
                            errors.lastName ? "border-red-500" : ""
                          }`}
                          value={formData.lastName}
                          onChange={handleInputChange}
                        />
                        {errors.lastName && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.lastName}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="email">{t.email || "email"}</Label>
                        <Input
                          id="email"
                          type="email"
                          className={`mt-1 ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          value={formData.email}
                          onChange={handleInputChange}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="phone">{t.phone || "Phone"}</Label>
                        <Input
                          id="phone"
                          type="tel"
                          className={`mt-1 ${
                            errors.phone ? "border-red-500" : ""
                          }`}
                          value={formData.phone}
                          onChange={handleInputChange}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.phone}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <Label htmlFor="address">
                          {t.address || "Street Address"}
                        </Label>
                        <Input
                          id="address"
                          className={`mt-1 ${
                            errors.address ? "border-red-500" : ""
                          }`}
                          value={formData.address}
                          onChange={handleInputChange}
                        />
                        {errors.address && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.address}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="city">{t.City || "City"}</Label>
                        <Input
                          id="city"
                          className={`mt-1 ${
                            errors.city ? "border-red-500" : ""
                          }`}
                          value={formData.city}
                          onChange={handleInputChange}
                        />
                        {errors.city && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="state">
                          {t.state || "State/Province"}
                        </Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => {
                            handleSelectChange("state", value);
                          }}
                        >
                          <SelectTrigger
                            id="state"
                            className={`mt-1 ${
                              errors.state ? "border-red-500" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="toshkent">Toshkent</SelectItem>
                            <SelectItem value="andijon">Andijon</SelectItem>
                            <SelectItem value="namangan">Namangan</SelectItem>
                            <SelectItem value="fargona">
                              Farg&apos;ona
                            </SelectItem>
                            <SelectItem value="sirdaryo">Sirdaryo</SelectItem>
                            <SelectItem value="jizzax">Jizzax</SelectItem>
                            <SelectItem value="samarqand">Samarqand</SelectItem>
                            <SelectItem value="qashqadaryo">
                              Qashqadaryo
                            </SelectItem>
                            <SelectItem value="surxondaryo">
                              Surxondaryo
                            </SelectItem>
                            <SelectItem value="buxoro">Buxoro</SelectItem>
                            <SelectItem value="navoiy">Navoiy</SelectItem>
                            <SelectItem value="xorazm">Xorazm</SelectItem>
                            <SelectItem value="qarakalpogiston">
                              Qoraqalpog‘iston
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.state && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="zip">
                          {t.zip || "ZIP / Postal Code"}
                        </Label>
                        <Input
                          id="zip"
                          className={`mt-1 ${
                            errors.zip ? "border-red-500" : ""
                          }`}
                          value={formData.zip}
                          onChange={handleInputChange}
                        />
                        {errors.zip && (
                          <p className="mt-1 text-sm text-red-600">
                            {errors.zip}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="country">
                          {t.country || "Country"}
                        </Label>
                        <Select
                          value={formData.country}
                          onValueChange={(value) => {
                            handleSelectChange("country", value);
                          }}
                        >
                          <SelectTrigger
                            id="country"
                            className={`mt-1 ${
                              errors.country ? "border-red-700" : ""
                            }`}
                          >
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="uz">Uzbekistan</SelectItem>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="de">Germany</SelectItem>
                            <SelectItem value="fr">France</SelectItem>
                            <SelectItem value="it">Italy</SelectItem>
                            <SelectItem value="es">Spain</SelectItem>
                            <SelectItem value="jp">Japan</SelectItem>
                            <SelectItem value="kr">South Korea</SelectItem>
                            <SelectItem value="cn">China</SelectItem>
                            <SelectItem value="in">India</SelectItem>
                            <SelectItem value="tr">Turkey</SelectItem>
                            <SelectItem value="uae">UAE</SelectItem>
                            <SelectItem value="ru">Russia</SelectItem>
                            <SelectItem value="br">Brazil</SelectItem>
                            <SelectItem value="sa">Saudi Arabia</SelectItem>
                            <SelectItem value="za">South Africa</SelectItem>
                            <SelectItem value="others">
                              Other countries
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.country && (
                          <p className="mt-1 text-sm text-blue-500">
                            {errors.country}
                          </p>
                        )}
                        {formData.country && formData.country !== "uz" && (
                          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                            <p className="text-sm text-yellow-700">
                              You have selected a different country.
                              <Link
                                href="/customer-service"
                                className="font-medium text-yellow-700 underline"
                              >
                                Please contact admin
                              </Link>{" "}
                              to proceed with your order.
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-6 flex items-center">
                      <Checkbox id="saveAddress" />
                      <Label htmlFor="saveAddress" className="ml-2">
                        {t.saveAddress || "Save this address for future orders"}
                      </Label>
                    </div>

                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={nextStep}
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                        disabled={isContinueButtonDisabled()}
                      >
                        {t.continueToPayment || "Continue to Payment"}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Payment Information */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl font-semibold mb-6">
                      {t.paymentMethod || "Payment Method"}
                    </h2>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-4"
                    >
                      <div
                        className={`border rounded-lg p-4 ${
                          paymentMethod === "credit-card"
                            ? "border-gray-900 bg-gray-50"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center">
                          <RadioGroupItem
                            value="credit-card"
                            id="credit-card"
                          />
                          <Label
                            htmlFor="credit-card"
                            className="ml-2 flex items-center"
                          >
                            <CreditCard className="h-5 w-5 mr-2" />
                            {t.card || "Card"}
                          </Label>
                        </div>

                        {paymentMethod === "credit-card" && (
                          <div className="mt-4 space-y-4">
                            {/* Karta turlari - rasmlar bilan */}
                            <div className="flex space-x-4 mb-4">
                              <button
                                type="button"
                                onClick={() => setCardType("humo")}
                                className={`p-2 border rounded-md ${
                                  cardType === "humo"
                                    ? "border-gray-900 bg-gray-100"
                                    : "border-gray-200"
                                }`}
                              >
                                <Image
                                  src="/images/card/Humo.png"
                                  alt="Humo"
                                  className="h-14"
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() => setCardType("uzcard")}
                                className={`p-2 border rounded-md ${
                                  cardType === "uzcard"
                                    ? "border-gray-900 bg-gray-100"
                                    : "border-gray-200"
                                }`}
                              >
                                <Image
                                  src="/images/card/Uzcard.png"
                                  alt="Uzcard"
                                  className="h-14"
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() => setCardType("mastercard")}
                                className={`p-2 border rounded-md ${
                                  cardType === "mastercard"
                                    ? "border-gray-900 bg-gray-100"
                                    : "border-gray-200"
                                }`}
                              >
                                <Image
                                  src="/images/card/Mastercard.png"
                                  alt="Mastercard"
                                  className="h-14"
                                />
                              </button>

                              <button
                                type="button"
                                onClick={() => setCardType("visa")}
                                className={`p-2 border rounded-md ${
                                  cardType === "visa"
                                    ? "border-gray-900 bg-gray-100"
                                    : "border-gray-200"
                                }`}
                              >
                                <Image
                                  src="/images/card/Visa.png"
                                  alt="Visa"
                                  className="h-14"
                                />
                              </button>
                            </div>

                            {/* Karta ma'lumotlari */}
                            <div>
                              <Label htmlFor="cardNumber">
                                {t.cardNumber || "Card Number"}
                              </Label>
                              <Input
                                id="cardNumber"
                                placeholder={
                                  cardType === "humo"
                                    ? "9860 1234 5678 9012"
                                    : cardType === "uzcard"
                                    ? "8600 1234 5678 9012"
                                    : "1234 5678 9012 3456"
                                }
                                className={`mt-1 ${
                                  errors.cardNumber ? "border-red-500" : ""
                                }`}
                                value={formData.cardNumber}
                                onChange={handleInputChange}
                                maxLength={19} // 16 raqam + 3 probel
                              />
                              {errors.cardNumber && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.cardNumber}
                                </p>
                              )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="expiry">
                                  {t.expiryDate || "Expiry Date"}
                                </Label>
                                <Input
                                  id="expiry"
                                  placeholder="OO/YY"
                                  className={`mt-1 ${
                                    errors.expiry ? "border-red-500" : ""
                                  }`}
                                  value={formData.expiry}
                                  onChange={handleInputChange}
                                  maxLength={5} // OO/YY
                                />
                                {errors.expiry && (
                                  <p className="mt-1 text-sm text-red-600">
                                    {errors.expiry}
                                  </p>
                                )}
                              </div>

                              {/* CVC maydoni faqat Mastercard/Visa uchun */}
                              {(cardType === "mastercard" ||
                                cardType === "visa") && (
                                <div>
                                  <Label htmlFor="cvc">CVC</Label>
                                  <Input
                                    id="cvc"
                                    placeholder="123"
                                    className={`mt-1 ${
                                      errors.cvc ? "border-red-500" : ""
                                    }`}
                                    value={formData.cvc}
                                    onChange={handleInputChange}
                                  />
                                  {errors.cvc && (
                                    <p className="mt-1 text-sm text-red-600">
                                      {errors.cvc}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>

                            <div>
                              <Label htmlFor="nameOnCard">
                                {t.nameOnCard || "Name on Card"}
                              </Label>
                              <Input
                                id="nameOnCard"
                                className={`mt-1 ${
                                  errors.nameOnCard ? "border-red-500" : ""
                                }`}
                                value={formData.nameOnCard}
                                onChange={handleInputChange}
                              />
                              {errors.nameOnCard && (
                                <p className="mt-1 text-sm text-red-600">
                                  {errors.nameOnCard}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </RadioGroup>

                    <div className="mt-8 flex justify-between">
                      <Button variant="outline" onClick={prevStep}>
                        {t.backToShipping || "Back to Shipping"}
                      </Button>
                      <Button
                        onClick={nextStep}
                        className="bg-gray-900 hover:bg-gray-800 text-white"
                      >
                        {t.reviewOrder || "Review Order"}
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Order Confirmation */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="h-8 w-8 text-green-600" />
                      </div>
                      <h2 className="text-2xl font-semibold mb-2">
                        {t.thankYou || "Thank You for Your Order!"}
                      </h2>
                      <p className="text-gray-600 mb-6">
                        {t.orderProcessing ||
                          "Your order has been placed and is being processed."}
                      </p>
                      <p className="text-gray-800 font-medium mb-8">
                        {t.orderNumber || "Order Number: #"}
                        {Math.floor(Math.random() * 10000)
                          .toString()
                          .padStart(4, "0")}
                      </p>

                      <div className="max-w-md mx-auto text-left bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-medium mb-2">
                          {t.orderDetails || "Order Details:"}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {t.confirmationEmail ||
                            "We've sent a confirmation email to"}
                          {formData.email}{" "}
                          {t.widthOrderDetails ||
                            "with all the details of your order."}
                        </p>
                      </div>

                      <div className="flex justify-center space-x-4">
                        <Button asChild variant="outline">
                          <Link href="/account/orders">
                            {t.viewOrder || "View Order"}
                          </Link>
                        </Button>
                        <Button
                          asChild
                          className="bg-gray-900 hover:bg-gray-800 text-white"
                        >
                          <Link href="/">
                            {t.continueShopping || "Continue Shopping"}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-20">
                <h2 className="text-lg font-medium text-gray-900 mb-4">
                  {t.orderSummary || "Order Summary"}
                </h2>

                <div className="flow-root">
                  <ul className="divide-y divide-gray-200">
                    {items.map((item) => (
                      <li
                        key={`${item.id}-${item.size}-${item.color}`}
                        className="py-4 flex"
                      >
                        <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="flex justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                              {item.name}
                            </h3>
                            <p className="ml-4 text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.color && `${item.color} / `}
                            {item.size && `${item.size} / `}{" "}
                            {t.ordernum || "Order number:"} {item.quantity}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">
                      {t.subtotal || "Subtotal"}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </p>
                  </div>

                  <div className="flex justify-between">
                    <p className="text-sm text-gray-600">
                      {t.shipping || "Shipping"}
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </p>
                  </div>

                  <Separator />

                  <div className="flex justify-between">
                    <p className="text-base font-medium text-gray-900">
                      {t.total || "Total"}
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
