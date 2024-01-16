import Image from "next/image";
import { CurrencyList, Spinner } from "..";

export function CustomButtonList({
  label,
  action,
  isDataEmpty,
  toggle,
  data,
  handleValueChange,
  handleChangeCurrency,
}) {
  return (
    <div className="flex flex-col w-full gap-4 ">
      <label
        htmlFor="name"
        className="flex justify-between text-sm font-bold text-[#002859] -mb-2"
      >
        <h5 className="flex gap-1 items-center">
          {label}
          <Image
            src="/info-circle.png"
            alt="info-circle-icon"
            width={24}
            height={24}
            className={`${
              !action.toggle ? " w-auto h-[16px] object-contain" : "hidden"
            }`}
          />
        </h5>

        <Image
          src={"/close-icon.jpg"}
          alt="close-icon"
          height={24}
          width={24}
          className={`${
            action.toggle ? "w-auto h-auto cursor-pointer" : "hidden"
          }`}
          onClick={toggle}
        />
      </label>
      {!action.toggle ? (
        <button
          type="button"
          onClick={toggle}
          className="rounded-md w-full h-12 border-2 text-sm text-[#002859] pl-3 shadow-lg"
        >
          <div className="flex justify-between shadow-inherit">
            {!isDataEmpty ? (
              <div className="flex items-center gap-2">
                <Image
                  src={action.currentIcon}
                  alt={`${action.currentCurrency}-icon`}
                  height={24}
                  width={24}
                />
                {action.currentCurrency}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Spinner /> <p>Loading...</p>
              </div>
            )}
            <Image
              src={"/arrow-down.jpg"}
              alt="arrow-down-icon"
              height={16}
              width={16}
              className="mr-2 mt-1 w-[16px] h-[16px]"
            />
          </div>
        </button>
      ) : (
        <div className="rounded-md w-full h-12 border-2 text-sm text-[#002859] pl-3 shadow-lg outline outline-2 outline-black">
          <div className="flex gap-2 mt-2">
            <Image
              src={"/search-normal.jpg"}
              alt="search-normal-icon"
              height={20}
              width={20}
              className="w-auto h-auto object-contain"
            />
            <input
              type="text"
              placeholder="Buscar"
              className="w-full h-7 outline-none"
              onChange={(e) => {
                e.preventDefault();
                handleValueChange({ target: label, value: e.target.value });
              }}
            />
          </div>
        </div>
      )}

      {action.toggle && (
        <CurrencyList
          action={action}
          data={data}
          handleChangeCurrency={handleChangeCurrency}
        />
      )}
    </div>
  );
}
