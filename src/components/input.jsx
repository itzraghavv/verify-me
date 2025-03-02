export const Input = ({
    type,
    value,
    placeholder,
    onChange,
    error
 }) => {
  return (
    <div className="mb-4 w-full">
      <div className={`bg-[#183e6b] text-[#3f5c82] p-8 rounded-2xl py-4 w-full ${
        error ? "border border-red-500" : ""
      }`}>
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="outline-none text-white bg-transparent w-full"
        />
      </div>
      {error && (
        <p className="text-red-500 mt-1 text-sm">{error}</p>
      )}
    </div>
  );
};
