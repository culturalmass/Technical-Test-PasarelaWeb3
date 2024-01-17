import Image from "next/image";
import { useWeb3 } from "@/hooks";
import { parseTimeLeft } from "@/utils";
import { Spinner } from "..";

export function PaymentDetailsContainer({
  action,
  toggle,
  timeLeft,
  handleToggle,
}) {
  return (
    <div className="flex flex-col gap-6 p-8 w-[36.438rem] h-[36.188rem] ">
      <h4 className="text-xl font-bold text-[#002859]">Realiza el pago</h4>
      <div className="flex flex-col w-full gap-4 p-6 text-[#002859] border rounded-lg shadow-lg">
        <div className="flex justify-center items-center gap-1">
          <Image
            src="/timer.jpg"
            alt="timer-icon"
            height={18}
            width={18}
            className="h-auto w-auto"
          />

          <p className="font-semibold text-xs">
            {timeLeft <= 0 || isNaN(timeLeft)
              ? "60:00"
              : parseTimeLeft(timeLeft)}
          </p>
        </div>
        <div className="flex justify-center gap-6 h-8 mt-4">
          <button
            className={`${
              toggle ? "bg-[#F9FAFC] text-[#647184]" : "bg-[#035AC5] text-white"
            } text-xs  rounded-full p-2`}
            onClick={() => handleToggle()}
          >
            {"Smart QR"}
          </button>
          <button
            className={`${
              !toggle
                ? "bg-[#F9FAFC] text-[#647184]"
                : "bg-[#035AC5] text-white"
            } text-xs  rounded-full p-2`}
            onClick={() => handleToggle()}
          >
            {"Web3"}
          </button>
        </div>
        <div className="flex justify-center">
          {!toggle ? (
            <div className="flex w-48 h-48 items-center justify-center">
              <Image
                src="/dummy-qrcode.jpg"
                alt="dummy-qrcode-icon"
                height={193}
                width={193}
                className="h-auto w-auto object-contain"
              />
            </div>
          ) : (
            <div
              className="flex w-48 h-48 items-center justify-center cursor-pointer"
              onClick={() => useWeb3(action)}
            >
              <Image
                src="/metamask.jpg"
                alt="metamask-icon"
                height={43}
                width={137}
                className=" w-auto h-auto object-contain"
              />
            </div>
          )}
        </div>
        <div className="flex justify-center items-center gap-2 text-[#002859]">
          <p>Enviar</p>
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <h4 className="text-xl font-bold">
              {action?.orderInfoArray?.crypto_amount.toString() +
                " " +
                action?.orderInfoArray?.currency_id.replace("_", " ")}
            </h4>
          )}
          <Image
            src="/copy.jpg"
            alt="copy-icon.jpg"
            height={18}
            width={18}
            className=" w-auto h-auto object-contain cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(
                action?.orderInfoArray?.crypto_amount.toString()
              );
            }}
          />
        </div>
        <div className="flex justify-center items-start gap-2 text-[#002859] text-sm">
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <p className="w-96 h-auto text-center break-words">
              {action?.orderInfoArray?.address}
            </p>
          )}
          <Image
            src="/copy.jpg"
            alt="copy-icon.jpg"
            height={18}
            width={18}
            className=" w-auto h-auto object-contain cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(action?.orderInfoArray?.address);
            }}
          />
        </div>
        <div className="flex justify-center items-center gap-2 text-[#002859] font-semibold text-xs text-wrap">
          <Image
            src="/warning-2.jpg"
            alt="warning-2-icon.jpg"
            height={18}
            width={18}
            className=" w-auto h-auto object-contain"
          />
          {action?.orderInfoArray === "" ? (
            <Spinner />
          ) : (
            <p>Etiqueta de destino: {action?.orderInfoArray?.identifier}</p>
          )}
          <Image
            src="/copy.jpg"
            alt="copy-icon.jpg"
            height={18}
            width={18}
            className=" w-auto h-auto object-contain cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(action?.orderInfoArray?.identifier);
            }}
          />
        </div>
      </div>
    </div>
  );
}
