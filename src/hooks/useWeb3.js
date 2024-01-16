import { ethers } from "ethers";
import { NETWORKS, parseWeb3Error } from "@/utils";
import Swal from "sweetalert2";

export async function useWeb3({ orderInfoArray }) {
  try {
    //Check if Metamask is Installed in the web browser
    if (window.ethereum) {
      //Get the Current address from Metamask wallet
      const data = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      //Double Check if the wallet Address was retrieve
      if (data.length > 0) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const currentNetwork = await provider.getNetwork();
        const chainID = currentNetwork.chainId.toString();
        const signer = await provider.getSigner();
        const supportedNetwork = NETWORKS.find(
          (network) => network.chainID === chainID
        );
        //Check the compatibility between the Metamask supported network and the CurrentNetwork for payment
        if (
          supportedNetwork !== undefined &&
          orderInfoArray.currency_id === "ETH_TEST3"
        ) {
          await signer.sendTransaction({
            to: orderInfoArray.address,
            value: ethers.parseEther(orderInfoArray.crypto_amount.toString()),
          });
          //Display a Modal to inform Network not compatible
        } else {
          Swal.fire({
            title: "¡Red no compatible con Metamask!",
            text: "Usa la forma de pago Smart QR",
            imageUrl: "/failure-close-circle.jpg",
            imageAlt: "failure-close-circle-icon",
            confirmButtonText: "OK",
            confirmButtonColor: "#035AC5",
            imageWidth: 80,
            imageHeight: 80,
          });
        }
      }
      //Display a Modal to inform Metamask not installed
    } else {
      Swal.fire({
        title: "¡Necesitas Metamask para realizar esta operación!",
        icon: "info",
        confirmButtonText: "Instala Metamask",
        confirmButtonColor: "#035AC5",
      }).then((result) => {
        if (result.isConfirmed) {
          window.open("https://metamask.io/", "_blank");
        }
      });
    }
  } catch (error) {
    parseWeb3Error(error);
  }
}
