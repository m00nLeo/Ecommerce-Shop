const FormRow = ({ label, className, children }) => {
  return (
    <div className={`form-control w-full py-2 ${className}`}>
      <label className="label">
        <span className="label-text-alt text-base md:text-lg font-bold">
          {label}
        </span>
      </label>
      {children}
    </div>
  );
};

export default FormRow;
