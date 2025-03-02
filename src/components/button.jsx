export const Button = ({ disabled, children, onClick }) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`cursor-pointer text-[#fdfcff] text-xl md:text-2xl px-4 md:px-32 rounded-2xl py-4 flex justify-center items-center ${
        disabled ? "bg-[#7f94ad]" : "bg-[#3eded0]"
      }`}
    >
      {children}
    </div>
  );
};
