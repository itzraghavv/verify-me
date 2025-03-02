import { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { MonitorDotIcon } from "lucide-react";
import { EmailInput } from "./email-input";
import { birthYearSchema, validate } from "../utils/validators";

export const Card = () => {
  const [inputValue, setInputValue] = useState("");
  const [step, setStep] = useState("age-verification"); 
  const [error, setError] = useState(null);

  function handleChange(e) {
    setInputValue(e.target.value);
    if (error) setError(null);
  }

  function handleContinue() {
    const validationError = validate(birthYearSchema, inputValue);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setStep("email-input");
  }

  if (step === "email-input") {
    return <EmailInput />;
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-4xl text-[#3cd8cb] flex ">
        <MonitorDotIcon className="size-12 mr-2" /> Webinar
        <span className="text-[#fffffe]">.gg</span>
      </h1>

      <h1 className="text-[#fffffe] text-4xl font-bold my-8">
        Verify Your Age
      </h1>

      <p className="text-[#8a9db3]">
        Please confirm your birth year. This data will not be stored.
      </p>
      <div className="w-full max-w-md">
        <Input
          type="text"
          placeholder={"Your Birth Year"}
          value={inputValue}
          onChange={handleChange}
          error={error}
        />
        <Button 
          disabled={!inputValue.trim()} 
          onClick={handleContinue}
        > 
          Continue
        </Button>
      </div>
    </div>
  );
};
