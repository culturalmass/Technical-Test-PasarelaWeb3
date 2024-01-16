import Swal from "sweetalert2";

//Parse the name currency to fit the design
export function parseNameCurrency(currencyName) {
  let parseCurrencyName = currencyName
    .split(" ")
    .slice(0, -1)
    .toString()
    .replaceAll(",", " ");

  return parseCurrencyName;
}

// Modal to display the error on the App
export function handleErrors(error) {
  Swal.fire({
    title: "¡Error!",
    text: error.toString(),
    imageUrl: "/failure-close-circle.jpg",
    imageAlt: "failure-close-circle-icon",
    imageWidth: 80,
    imageHeight: 80,
    showConfirmButton: true,
    confirmButtonText: "OK",
    confirmButtonColor: "#035AC5",
  });
}

//Modal to display the success of the Payment Order
export const successAlert = Swal.mixin({
  title: "¡Pago completado!",
  text: "En pocos segundos tendras tu saldo reflejado en tu cartera...",
  imageUrl: "/success-tick-circle.jpg",
  imageAlt: "success-tick-circle-icon",
  confirmButtonText: "Crear un nuevo pago",
  confirmButtonColor: "#035AC5",
  imageWidth: 80,
  imageHeight: 80,
});

//Modal to display the failure of the Payment Order
export const failureAlert = Swal.mixin({
  title: "¡Pago cancelado!",
  text: "Intenta nuevamente creando un nuevo pago..",
  imageUrl: "/failure-close-circle.jpg",
  imageAlt: "failure-close-circle-icon",
  confirmButtonText: "Crear un nuevo pago",
  confirmButtonColor: "#035AC5",
  imageWidth: 80,
  imageHeight: 80,
});

//Parse the date to fit the format of the design
export function formatDate(data) {
  let date = new Date(data);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hour = hour < 10 ? "0" + hour : hour;
  minute = minute < 10 ? "0" + minute : minute;
  let formattedDate =
    day + "/" + month + "/" + year + " " + hour + ":" + minute;

  return formattedDate;
}

//Get the time left to make the payment for the order
export function getTimeLeft(data) {
  let currentTime = new Date();
  let expiredTime = new Date(data);

  const utc1 = Date.UTC(
    currentTime.getFullYear(),
    currentTime.getMonth(),
    currentTime.getDate(),
    currentTime.getHours(),
    currentTime.getMinutes(),
    currentTime.getSeconds()
  );
  const utc2 = Date.UTC(
    expiredTime.getFullYear(),
    expiredTime.getMonth(),
    expiredTime.getDate(),
    expiredTime.getHours(),
    expiredTime.getMinutes(),
    expiredTime.getSeconds()
  );

  return Math.floor((utc2 - utc1) / 1000);
}

//Parse the time left to fit the design
export function parseTimeLeft(timeLeft) {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  return minutes + ":" + seconds;
}

//A compile of a list of general errors working with the Web3 and Metamask
export const parseWeb3Error = (error) => {
  if (error.code === -32603) {
    if (error.message.length < "54") {
      const parsedErrorMessage = error.data.message.slice(
        "VM Exception while processing transaction: revert".length
      );
      handleErrors(parsedErrorMessage);
    } else {
      handleErrors("Out of Gas");
    }
  } else if (error.code === 4001) {
    const parsedErrorMessage = error.message
      .slice("MetaMask Tx Signature:".length)
      .slice(0, -1);
    handleErrors(parsedErrorMessage);
  } else if (error.code === "ACTION_REJECTED") {
    handleErrors("El usuario rechazo la transacción");
  } else if (error.error?.code === -32603) {
    const parsedErrorMessage = error.reason
      .slice("execution reverted:".length)
      .slice(0, -1);
    handleErrors(parsedErrorMessage);
  } else {
    handleErrors(error);
  }
};

//List of Network to use with Metamask
export const NETWORKS = [
  { name: "Ethereum MainNet", chainID: "1" },
  { name: "Ropsten TestNet", chainID: "3" },
  { name: "Rinkeby TestNet", chainID: "4" },
  { name: "Goerli TestNet", chainID: "5" },
  { name: "Kovan TestNet", chainID: "42" },
  { name: "Binance MainNet", chainID: "56" },
  { name: "Binance TestNet", chainID: "97" },
  { name: "Polygon Mainnet", chainID: "137" },
  { name: "Avalanche Fuji", chainID: "43113" },
];
