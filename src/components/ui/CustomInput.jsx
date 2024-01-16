export function CustomInput({
  label,
  placeholder,
  value = "",
  handleValueChange,
}) {
  //Regex to use for validation in the inputs, for numbers and strings
  let regexNumber = /^[0-9.,]+$/;
  let regexString = /^[a-zA-Z0-9" "]{1,45}$/;

  //Validate the String Input for the Concept field
  function validateStringInput(e) {
    if (regexString.test(e.target.value) || e.target.value === "") {
      e.preventDefault();
      handleValueChange({
        target: label,
        value: e.target.value.toString(),
      });
    }
  }
  //Validate the Numbers Input for the Amount field
  function validateNumberInput(e) {
    if (regexNumber.test(e.target.value) || e.target.value === "") {
      e.preventDefault();
      handleValueChange({
        target: label,
        value: e.target.value,
      });
    }
  }

  return (
    <div className="flex flex-col w-full gap-4">
      <label
        htmlFor="name"
        className="text-[0.875rem] font-bold text-[#002859]"
      >
        {label}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (label === "Importe a pagar") {
            validateNumberInput(e);
          } else {
            validateStringInput(e);
          }
        }}
        className="rounded-md w-full h-12 text-[0.875rem] pl-3 border-2 shadow-lg -mt-2"
      />
    </div>
  );
}
