import { handleErrors } from "@/utils";

export async function useFetchCurrency() {
  //Header configuration for the Api
  const headers = {
    "X-Device-Id": process.env.NEXT_PUBLIC_DEVICE_ID,
  };

  try {
    //Response for the Fetch Currency List
    const response = await fetch(
      `https://payments.pre-bnvo.com/api/v1/currencies`,
      {
        method: "GET",
        headers: headers,
        redirect: "follow",
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    handleErrors(error);
  }
}
