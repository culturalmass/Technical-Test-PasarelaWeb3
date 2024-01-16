"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { useFetchCurrency, usePostOrder } from "@/hooks";
import { CustomButton, CustomInput, CustomButtonList } from "@/components/";
import { parseNameCurrency } from "@/utils";

import Swal from "sweetalert2";

export default function Home() {
  //Router to move between pages
  const router = useRouter();

  //Set of global states for the App
  const { action, setAction } = useAppContext();

  //Fetch the List of Currencies
  async function getCurrencyList() {
    const currencies = await useFetchCurrency();
    setAction({
      ...action,
      currenciesArray: currencies,
      currentCurrency: parseNameCurrency(currencies[0].name),
      currentIcon: currencies[0].image,
      currentSymbol: currencies[0].symbol,
      currentMinAmount: currencies[0].min_amount,
      currentMaxAmount: currencies[0].max_amount,
    });
  }

  //Boolean to render components in Home
  const isDataEmpty =
    !Array.isArray(action.currenciesArray) ||
    action.currenciesArray.length < 1 ||
    !action.currenciesArray;

  //Handle value changes for the CustomInputs
  function handleValueChange({ target, value }) {
    if (target === "Importe a pagar") {
      if (isFinite(value) && !isNaN(value)) {
        setAction({ ...action, amountForm: value });
      }
    } else if (target === "Concepto") {
      setAction({ ...action, conceptForm: value });
    } else {
      setAction({ ...action, filterCurrencyList: value });
    }
  }

  //Handle value change for the currency selected
  function handleChangeCurrency({
    selectedCurrency,
    selectedIcon,
    selectedSymbol,
    selectedMinAmount,
    selectedMaxAmount,
  }) {
    setAction({
      ...action,
      toggle: false,
      filterCurrencyList: "",
      currentCurrency: selectedCurrency,
      currentIcon: selectedIcon,
      currentSymbol: selectedSymbol,
      currentMinAmount: selectedMinAmount,
      currentMaxAmount: selectedMaxAmount,
    });
  }

  //Handle the "Continuar" button wrap the necessary info to post the order,
  //display a modal and push to the orderdetails page
  async function handleClick(action) {
    if (
      Number(action.currentMinAmount) > Number(action.amountForm) ||
      Number(action.amountForm) > Number(action.currentMaxAmount)
    ) {
      Swal.fire({
        title: "¡Importe a pagar no disponible!",
        text: `Lamentamos los inconvenientes el importe a pagar actual es máximo ${Number(
          action.currentMaxAmount
        )} y mínimo ${Number(action.currentMinAmount)}`,
        imageUrl: "/failure-close-circle.jpg",
        imageAlt: "failure-close-circle-icon",
        imageWidth: 80,
        imageHeight: 80,
        showConfirmButton: false,
      });
      return;
    }
    Swal.fire({
      title: "¡Generando Orden!",
      text: "En unos segundos sera dirigirido...",
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const submitOrder = await usePostOrder({
      expected_output_amount: Number(action.amountForm),
      input_currency: action.currentSymbol,
      reference: action.conceptForm,
    });
    setAction({
      ...action,
      orderIdentifier: submitOrder.identifier,
      amountForm: "",
      conceptForm: "",
    });
    router.push(`/orderdetails/${submitOrder.identifier}`);
  }

  //Run the getCurrency List at render to feth the data
  useEffect(() => {
    getCurrencyList();
  }, []);

  return (
    <section>
      <div className="flex justify-center items-center h-[45rem] ">
        <div className="flex flex-col items-center gap-6 p-8 w-[42rem] h-[33.125rem] border rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-[#002859]">Crear Pago</h2>

          <CustomInput
            label={"Importe a pagar"}
            placeholder={"Añade importe a pagar"}
            value={action.amountForm}
            handleValueChange={handleValueChange}
          />

          <CustomButtonList
            label={"Seleccionar Criptomoneda"}
            action={action}
            isDataEmpty={isDataEmpty}
            toggle={() => setAction({ ...action, toggle: !action.toggle })}
            data={action.currenciesArray}
            handleChangeCurrency={handleChangeCurrency}
            handleValueChange={handleValueChange}
          />

          {!action.toggle && (
            <>
              <CustomInput
                label={"Concepto"}
                placeholder={"Añade descripción del pago"}
                value={action.conceptForm}
                handleValueChange={handleValueChange}
              />
              <CustomButton
                title={"Continuar"}
                action={action}
                handleClick={handleClick}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
