"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context";
import { useFetchOrderInfo } from "@/hooks";
import { OrderDetaisContainer, PaymentDetailsContainer } from "@/components";
import { failureAlert, getTimeLeft, successAlert } from "@/utils";
import Swal from "sweetalert2";

export default function OrderDetails() {
  //Router to move between pages
  const router = useRouter();

  //Set of global states for the App
  const { action, setAction } = useAppContext();

  //Toggle for the selection between SmartQR and Web3
  const [toggle, setToggle] = useState(false);

  //Object for set the timer of the payment section
  const [timer, setTimer] = useState({ isOn: true, paymentTimeLeft: 3600 });

  //Id taked from the Params to use to fecth the Order data
  const { id } = useParams();

  //handle the toggle action in the Button
  function handleToggle() {
    setToggle(!toggle);
  }

  //Use to the fecth the order info and set the state of the App and get the local data from local storage is neccessary
  async function getOrderInfo() {
    const orderInfo = await useFetchOrderInfo(id);
    if (action.currentIcon === "") {
      const localData = JSON.parse(localStorage.getItem("currentSession"));
      setAction({
        ...action,
        currentIcon: localData.currentIcon,
        currentCurrency: localData.currentCurrency,
        currentSymbol: localData.currentSymbol,
        orderInfoArray: orderInfo[0],
      });
    } else {
      setAction({
        ...action,
        orderInfoArray: orderInfo[0],
      });
      localStorage.setItem(
        "currentSession",
        JSON.stringify({
          currentIcon: action.currentIcon,
          currentCurrency: action.currentCurrency,
          currentSymbol: action.currentSymbol,
        })
      );
    }
  }

  //Check for previous session and display a modal of Order made
  useEffect(() => {
    !localStorage.getItem("currentSession") &&
      Swal.fire({
        title: "¡Orden Lista!",
        text: "Realiza el pago siguiendo las indicaciones",
        confirmButtonColor: "#035AC5",
        showConfirmButton: true,
      });
    getOrderInfo();
  }, []);

  //Establish a websocket connection to listen to events and generate a clousure of the order
  //with a modal
  useEffect(() => {
    const socket = new WebSocket(`wss://payments.pre-bnvo.com/ws/${id}`);
    socket.addEventListener("open", (event) => {
      socket.send("Connection established");
    });
    socket.addEventListener("message", (event) => {
      setTimer({ isOn: false, paymentTimeLeft: 3600 });
      const response = JSON.parse(event.data);
      if (response.status === "CO" || response.status === "AC") {
        successAlert.fire().then((result) => {
          if (result.isConfirmed) {
            setAction({
              ...action,
              orderInfoArray: "",
              orderIdentifier: null,
            });
            localStorage.removeItem("currentSession");
            router.push("/");
          }
        });
      }
    });
    return () => socket.close();
  }, []);

  //Use for the timer in the payment order component and generate a clousure of the order
  //with a modal
  useEffect(() => {
    if (timer.paymentTimeLeft <= 0) {
      failureAlert.fire().then((result) => {
        if (result.isConfirmed) {
          setAction({
            ...action,
            orderInfoArray: "",
            orderIdentifier: null,
          });
          setTimer({ isOn: false, paymentTimeLeft: 3600 });
          localStorage.removeItem("currentSession");
          router.push("/");
        }
      });
      return;
    }
    if (!timer.isOn) return;
    const intervalId = setInterval(() => {
      setTimer({
        ...timer,
        paymentTimeLeft: getTimeLeft(action?.orderInfoArray?.expired_time),
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timer.paymentTimeLeft]);

  return (
    <section>
      <div className="flex justify-center items-center h-[45rem] ">
        {action?.orderInfoArray !== "" && (
          <>
            <OrderDetaisContainer action={action} />
            <PaymentDetailsContainer
              action={action}
              toggle={toggle}
              timeLeft={timer.paymentTimeLeft}
              handleToggle={handleToggle}
            />
          </>
        )}
      </div>
    </section>
  );
}
