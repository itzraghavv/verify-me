import { useState, useRef, useEffect } from "react";
import { MonitorDotIcon, TimerIcon } from "lucide-react";
import { Button } from "./button";
import { otpSchema, validate } from "../utils/validators";

export const OtpInput = ({ onVerify, email }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5 * 60); 
  const [isExpired, setIsExpired] = useState(false);
  const inputRefs = useRef([]);
  
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (timeLeft <= 0) {
      setIsExpired(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);
    
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (error) setError(null);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();
    
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      
      inputRefs.current[5].focus();
      if (error) setError(null);
    }
  };

  const handleVerify = () => {
    if (isExpired) {
      setError("OTP has expired. Please request a new code.");
      return;
    }

    const validationError = validate(otpSchema, otp);
    
    if (validationError) {
      setError(validationError);
      return;
    }
    
    onVerify();
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(5 * 60);
    setIsExpired(false);
    setError(null);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  return (
    <div className="flex items-center justify-center flex-col">
      <h1 className="text-4xl text-[#3cd8cb] flex ">
        <MonitorDotIcon className="size-12 mr-2" /> Webinar
        <span className="text-[#fffffe]">.gg</span>
      </h1>

      <h1 className="text-[#fffffe] text-4xl font-bold my-8">
        Enter Verification Code
      </h1>

      <p className="text-[#8a9db3] mb-6">
        We've sent a 6-digit code to {email}
      </p>

      <div className="flex gap-2 mb-6">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            onPaste={index === 0 ? handlePaste : undefined}
            ref={(el) => (inputRefs.current[index] = el)}
            className={`w-12 h-12 text-center text-white bg-[#183e6b] rounded-lg outline-none text-xl ${
              error || isExpired ? "border border-red-500" : ""
            }`}
            maxLength={1}
            disabled={isExpired}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      <div className={`flex items-center gap-2 ${isExpired ? "text-red-500" : "text-[#8a9db3]"} mb-4`}>
        <TimerIcon className="size-4" />
        <span>
          {isExpired 
            ? "Code has expired" 
            : `Code expires in ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
          }
        </span>
      </div>

      <div className="w-full max-w-md">
        <Button 
          disabled={!isOtpComplete || isExpired} 
          onClick={handleVerify}
        >
          Verify
        </Button>
      </div>

      <p className="text-[#8a9db3] mt-4">
        Didn't receive the code? {" "}
        <span 
          className="text-[#3cd8cb] cursor-pointer" 
          onClick={handleResend}
        >
          Resend
        </span>
      </p>
    </div>
  );
};