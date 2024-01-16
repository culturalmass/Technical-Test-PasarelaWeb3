import { handleErrors } from "@/utils";

export async function usePostOrder(data) {
  //Header configuration for the Api
  const headers = {
    "X-Device-Id": process.env.NEXT_PUBLIC_DEVICE_ID,
    "Content-Type": "application/json",
  };
  try {
    //Response for the Post Order
    const response = await fetch(
      `https://payments.pre-bnvo.com/api/v1/orders/`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
        redirect: "follow",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    handleErrors(error);
  }
}
