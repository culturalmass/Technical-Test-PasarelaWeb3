import Image from "next/image";
import { parseNameCurrency } from "@/utils";

export function CurrencyList({ action, data, handleChangeCurrency }) {
  return (
    <div className="flex flex-col gap-2 h-52 overflow-y-auto rounded-lg">
      {data
        .filter((currency) =>
          currency.name
            .toLowerCase()
            .includes(action.filterCurrencyList.toLowerCase())
        )
        .map((currency, index) => (
          <button
            key={index}
            className="flex justify-between shadow-inherit p-2 hover:bg-[#E5E9F2]"
            onClick={() =>
              handleChangeCurrency({
                selectedCurrency: parseNameCurrency(currency.name),
                selectedSymbol: currency.symbol,
                selectedMinAmount: currency.min_amount,
                selectedMaxAmount: currency.max_amount,
                selectedIcon: currency.image,
              })
            }
          >
            <div className="flex items-center gap-2 h-8 z-10">
              <Image
                src={currency.image}
                alt={`${currency.name}-icon`}
                height={24}
                width={24}
              />
              <ul className="flex flex-col">
                <li className="flex font-bold text-[0.875rem] text-[#002859]">
                  {parseNameCurrency(currency.name)}
                </li>
                <li className="flex text-[0.75rem] text-[#647184] -mt-[0.3rem]">
                  {currency.symbol.replaceAll("_", " ")}
                </li>
              </ul>
            </div>
            <Image
              src={`${
                action.currentCurrency === parseNameCurrency(currency.name)
                  ? "/tick-circle.png"
                  : "/arrow-right.png"
              }`}
              alt={`${
                action.currentCurrency === parseNameCurrency(currency.name)
                  ? "tick-circle-icon"
                  : "arrow-right-icon"
              }`}
              height={20}
              width={20}
              className="mr-2 w-auto h-auto object-contain mt-2"
            />
          </button>
        ))}
    </div>
  );
}
