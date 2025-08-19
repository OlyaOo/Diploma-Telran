import React from 'react'
import { useForm } from "react-hook-form";
import FormInput from '@common/components/ui/inputs/FormInput';
import { useAlert } from '@common/components/ui/alert/AlertContext';


const DiscountForm = ({ onSuccess }) => {

    const { showAlert } = useAlert();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        mode: "onTouched",
        reValidateMode: "onChange",
        defaultValues: { name: "", phone: "", email: "" },
    });

    const onSubmit = (data) => {
        showAlert("Discount successfully applied!", "success");
        const hasDiscount = true;
        localStorage.setItem("hasDiscount", JSON.stringify(hasDiscount));
        reset();
        onSuccess?.();
    };

    return (
        <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <FormInput
                name="name"
                placeholder="Name"
                register={register}
                rules={{
                    required: "Name is required",
                    minLength: { value: 2, message: "Minimum 2 characters" },
                    maxLength: { value: 50, message: "Name is too long" },
                    setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                }}
                error={errors.name}
            />

            <FormInput
                name="phone"
                placeholder="Phone number"
                register={register}
                rules={{
                    required: "Phone is required",
                    // remove spaces, dashes, parentheses before validation if needed:
                    setValueAs: (v) =>
                        typeof v === "string" ? v.replace(/[\s()-]/g, "") : v,
                    pattern: {
                        value: /^\+?\d{6,15}$/,
                        message: "Enter a valid phone (6–15 digits, optional +)",
                    },
                }}
                error={errors.phone}
            />

            <FormInput
                name="email"
                placeholder="Email"
                register={register}
                rules={{
                    required: "Email is required",
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Invalid email address",
                    },
                    setValueAs: (v) => (typeof v === "string" ? v.trim() : v),
                }}
                error={errors.email}
            />

            <button type="submit" className="form__submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting…" : "Submit"}
            </button>
        </form>
    );
}

export default DiscountForm