import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { MonitorDotIcon } from "lucide-react";
import { OtpInput } from "./otp-input";
import { emailSchema, validate } from "../utils/validators";

export const EmailInput = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("email-input"); 
  const [error, setError] = useState(null);

  function handleChange(e) {
    setEmail(e.target.value);
    if (error) setError(null);
  }

  function handleContinue() {
    const validationError = validate(emailSchema, email);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setStep("otp-verification");
  }

  function handleVerify() {
    alert("OTP verified successfully!");
  }

  if (step === "otp-verification") {
    return <OtpInput onVerify={handleVerify} email={email} />;
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-4xl text-[#3cd8cb] flex ">
        <MonitorDotIcon className="size-12 mr-2" /> Webinar
        <span className="text-[#fffffe]">.gg</span>
      </h1>

      <h1 className="text-[#fffffe] text-4xl font-bold my-8">
        Let's Get Started
      </h1>

      <div className="w-full max-w-md">
        <Input
          type="email"
          placeholder="Email Id"
          value={email}
          onChange={handleChange}
          error={error}
        />
        <Button 
          disabled={!email.trim()} 
          onClick={handleContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}; 