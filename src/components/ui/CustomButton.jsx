export function CustomButton({ title, action, handleClick }) {
  return (
    <button
      type="button"
      className={`bg-[#035AC5] text-white rounded-md w-full h-12 ${
        action.amountForm === "" && action.conceptForm === ""
          ? "opacity-30"
          : "opacity-100"
      }`}
      disabled={action.amountForm === "" && action.conceptForm === ""}
      onClick={() => handleClick(action)}
    >
      {title}
    </button>
  );
}
