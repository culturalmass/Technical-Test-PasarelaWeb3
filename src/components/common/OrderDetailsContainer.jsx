import Image from "next/image";
import { formatDate } from "@/utils";
import { Spinner } from "..";

export function OrderDetaisContainer({ action }) {
  return (
    <div className="flex flex-col gap-6 p-8 w-[36.438rem] h-[36.188rem]  text-[#002859]">
      <h4 className="text-xl font-bold">Resumen del pedido</h4>
      <div className="flex flex-col justify-between p-8 gap-8 rounded-2xl bg-[#F9FAFC]">
        <div className="flex justify-between text-lg font-bold pb-[1.2rem] border-b border-[#C0CCDA]">
          <h5>Importe:</h5>
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <h5>
              {action?.orderInfoArray?.fiat_amount.toString().replace(".", ",")}{" "}
              {action?.orderInfoArray?.fiat}
            </h5>
          )}
        </div>
        <div className="flex justify-between text-lg font-bold pb-[1.2rem] border-b border-[#C0CCDA]">
          <h5>Moneda seleccionada:</h5>
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <div className="flex gap-1 items-center">
              <Image
                src={action?.currentIcon}
                alt={`${action?.currentCurrency}-icon`}
                height={24}
                width={24}
                className="h-auto w-auto object-contain"
              />
              <h5>{action?.currentSymbol.replace("_", " ")}</h5>
            </div>
          )}
        </div>
        <div className="flex justify-between text-lg">
          <h5 className="font-bold">Comercio:</h5>
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <div className="flex gap-1">
              <Image
                src="/verify.jpg"
                alt="verify-icon"
                height={24}
                width={24}
                className="h-auto w-auto object-contain"
              />
              <h5 className="font-semibold">
                {"Comercio de Pruebas "}
                {action?.orderInfoArray?.merchant_device_id}
              </h5>
            </div>
          )}
        </div>
        <div className="flex justify-between text-lg pb-[1.2rem] border-b border-[#C0CCDA]">
          <h5 className="font-bold">Fecha:</h5>
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <h5 className="font-semibold">
              {formatDate(action?.orderInfoArray?.created_at)}
            </h5>
          )}
        </div>
        <div className="flex justify-between text-lg">
          <h5 className="font-bold">Concepto:</h5>
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <h5 className="font-semibold">
              {action?.orderInfoArray?.reference}
            </h5>
          )}
        </div>
      </div>
    </div>
  );
}
