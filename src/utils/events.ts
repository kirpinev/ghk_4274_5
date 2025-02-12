declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      e: "event",
      action: string,
      variant_name: Record<string, string>,
    ) => void;
  }
}

type Payload = { payment_sum: string };

export const sendDataToGA = async (payload: Payload) => {
  try {
    const now = new Date();
    const date = `${now.getFullYear()}-${
      now.getMonth() + 1
    }-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    await fetch(
      "https://script.google.com/macros/s/AKfycbwz-dvN-18rFRua1pew8uAI7-bjuCSKei9jEYn0yEuZ8V1KUw_5Kx2Q6gHI4g2OKQDysA/exec",
      {
        redirect: "follow",
        method: "POST",
        body: JSON.stringify({
          date,
          variant: "ghk_4274_5",
          form_name: "forms1",
          ...payload,
        }),
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
      },
    );
  } catch (error) {
    console.error("Error!", error);
  }
};
