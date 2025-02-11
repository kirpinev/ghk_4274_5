import { ButtonMobile } from "@alfalab/core-components/button/mobile";

import { Typography } from "@alfalab/core-components/typography";

import steam from "./assets/steam.svg";

import { LS, LSKeys } from "./ls";
import { appSt } from "./style.css";
import { ThxLayout } from "./thx/ThxLayout";
import { useState } from "react";
import { Gap } from "@alfalab/core-components/gap";
import { Input } from "@alfalab/core-components/input";
import { AmountInput } from "@alfalab/core-components/amount-input";
import { Slider } from "@alfalab/core-components/slider";

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [amount, setAmount] = useState<number | null>(null);

  const [login, setLogin] = useState("");
  const [value, setValue] = useState(2);
  const [email, setEmail] = useState("");
  const [coloredIndex, setColoredIndex] = useState(0);

  const submit = () => {
    setLoading(true);

    Promise.resolve().then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <Gap size={4} />
        <img className={appSt.icon} src={steam} alt="" width={80} height={80} />
        <Typography.TitleResponsive
          font="system"
          tag="h1"
          view="medium"
          weight="bold"
          style={{ textAlign: "center" }}
        >
          Пополнение аккаунта Steam
        </Typography.TitleResponsive>
        <Typography.Text
          tag="p"
          view="primary-large"
          color="secondary"
          style={{ textAlign: "center" }}
        >
          Комиссия – 0%
        </Typography.Text>
        <Gap size={8} />
        <Input
          value={login}
          onChange={(_, payload) => setLogin(payload.value)}
          placeholder="Введите значение"
          block={true}
          label="Логин"
          labelView="outer"
          size={48}
        />
        <AmountInput
          value={amount}
          onChange={(_, payload) => {
            setAmount(payload.value);

            if (payload.value !== null) {
              if (payload.value < 1000) {
                setValue(2);
                setColoredIndex(0);
              } else if (payload.value >= 1000 && payload.value < 10000) {
                setValue(24);
                setColoredIndex(1);
              } else if (payload.value >= 10000 && payload.value < 25000) {
                setValue(45);
                setColoredIndex(2);
              } else if (payload.value >= 25000 && payload.value < 50000) {
                setValue(67);
                setColoredIndex(3);
              } else if (payload.value >= 50000) {
                setValue(98);
                setColoredIndex(4);
              }
            }
          }}
          placeholder="Введите значение"
          label="Сумма пополнения"
          labelView="outer"
          integersOnly={true}
          bold={false}
          block={true}
          minority={1}
          clear={amount !== 0}
          onClear={() => {
            setAmount(0);
          }}
        />
        <Typography.Text tag="p" view="primary-small" color="secondary">
          Минимальная сумма 100Р
        </Typography.Text>
        <Gap size={2} />
        <Typography.Text
          tag="p"
          view="primary-medium"
          color="secondary"
          defaultMargins={false}
        >
          Расчёт кэшбэка
        </Typography.Text>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[0, 3, 4, 5, 6].map((num, index) => (
            <Typography.Text
              color={coloredIndex === index ? "negative" : "primary"}
              weight={coloredIndex === index ? "bold" : "regular"}
              tag="p"
              view="primary-medium"
              key={num}
              defaultMargins={false}
              style={{
                width: "45px",
              }}
            >
              {num} %
            </Typography.Text>
          ))}
        </div>
        <Slider
          size={4}
          value={value}
          onChange={(e) => setValue(e.value)}
          disabled={true}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[100, 1000, 10000, 25000, 50000].map((num) =>
            num === 50000 ? (
              <Typography.Text tag="p" view="primary-medium" key={num}>
                {num}Р +
              </Typography.Text>
            ) : (
              <Typography.Text tag="p" view="primary-medium" key={num}>
                {num}Р
              </Typography.Text>
            ),
          )}
        </div>
        <Gap size={8} />
        <Input
          value={email}
          onChange={(_, payload) => setEmail(payload.value)}
          placeholder="Введите значение"
          block={true}
          label="E-mail"
          labelView="outer"
          size={48}
        />
        <Typography.Text
          tag="p"
          view="primary-small"
          color="secondary"
          defaultMargins={false}
        >
          Проверьте адрес электронной почты, на указанный адрес придёт цифровой
          код. Время обработки заказа от 5 минут до 5 часов
        </Typography.Text>
      </div>

      <Gap size={96} />

      <div className={appSt.bottomBtn} style={{ backgroundColor: "white" }}>
        <ButtonMobile
          disabled={!amount || amount < 100}
          block
          view="primary"
          loading={loading}
          onClick={submit}
        >
          {!amount || amount < 100 ? "Оплатить" : `Оплатить ${amount}Р`}
        </ButtonMobile>
      </div>
    </>
  );
};
