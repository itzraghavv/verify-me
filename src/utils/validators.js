import { z } from "zod";

const currentYear = new Date().getFullYear();

export const birthYearSchema = z
  .string()
  .nonempty("Birth year is required")
  .refine((val) => !isNaN(Number(val)), {
    message: "Birth year must be a number",
  })
  .refine((val) => Number(val) > 1900, {
    message: "Birth year must be after 1900",
  })
  .refine((val) => Number(val) <= currentYear, {
    message: `Birth year cannot be in the future (max: ${currentYear})`,
  })
  .refine((val) => currentYear - Number(val) >= 18, {
    message: "You must be at least 18 years old to continue",
  });

export const emailSchema = z
  .string()
  .nonempty("Email is required")
  .email("Please enter a valid email address");

export const otpSchema = z
  .array(z.string().regex(/^\d$/, "Must be a digit"))
  .length(6, "OTP must be 6 digits")
  .refine((val) => val.every(digit => digit !== ""), {
    message: "All OTP digits are required",
  });

export const validate = (schema, value) => {
  try {
    schema.parse(value);
    return null;
  } catch (error) {
    return error.errors?.[0]?.message || "Invalid input";
  }
}; 