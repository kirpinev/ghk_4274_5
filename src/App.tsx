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
import { sendDataToGA } from "./utils/events.ts";

const marks = [
  { value: 100, position: 0 },
  { value: 1000, position: 25 },
  { value: 5000, position: 50 },
  { value: 10000, position: 75 },
  { value: 20000, position: 100 },
];

const scaleValue = (value: number) => {
  for (let i = 0; i < marks.length - 1; i++) {
    const minMark = marks[i];
    const maxMark = marks[i + 1];

    if (value >= minMark.value && value <= maxMark.value) {
      const ratio = (value - minMark.value) / (maxMark.value - minMark.value);
      return minMark.position + ratio * (maxMark.position - minMark.position);
    }
  }

  return 100;
};

const inverseScaleValue = (percent: number) => {
  for (let i = 0; i < marks.length - 1; i++) {
    const minMark = marks[i];
    const maxMark = marks[i + 1];

    if (percent >= minMark.position && percent <= maxMark.position) {
      const ratio =
        (percent - minMark.position) / (maxMark.position - minMark.position);
      return Math.round(
        minMark.value + ratio * (maxMark.value - minMark.value),
      );
    }
  }

  return 20000;
};

export const App = () => {
  const [loading, setLoading] = useState(false);
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [amount, setAmount] = useState<number | null>(null);

  const [login, setLogin] = useState("");
  const [value, setValue] = useState(100);
  const [sliderValue, setSliderValue] = useState(scaleValue(value));
  const [email, setEmail] = useState("");
  const [coloredIndex, setColoredIndex] = useState(0);

  const submit = () => {
    setLoading(true);

    sendDataToGA({payment_sum: String(value)}).then(() => {
      LS.setItem(LSKeys.ShowThx, true);
      setThx(true);
      setLoading(false);
    });
  };

  const handleInputChange = (value: string) => {
    let newValue = parseInt(value, 10) || 100;
    newValue = Math.max(100, Math.min(20000, newValue));
    setValue(newValue);
    setSliderValue(scaleValue(newValue));
  };

  const handleSliderChange = (value: string) => {
    const newSliderValue = parseFloat(value);

    setSliderValue(newSliderValue);
    setValue(inverseScaleValue(newSliderValue));
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
            handleInputChange(String(payload.value));
            setAmount(payload.value);

            if (payload.value !== null) {
              if (payload.value >= 100 && payload.value <= 1000) {
                setColoredIndex(0);
              } else if (payload.value > 1000 && payload.value <= 5000) {
                setColoredIndex(1);
              } else if (payload.value > 5000 && payload.value <= 10000) {
                setColoredIndex(2);
              } else if (payload.value > 10000 && payload.value <= 20000) {
                setColoredIndex(3);
              } else if (payload.value > 20000) {
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
        />
        <Typography.Text tag="p" view="primary-small" color="secondary">
          Минимальная сумма 100₽
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
            >
              {num}%
            </Typography.Text>
          ))}
        </div>
        <Slider
          step={0.1}
          size={4}
          value={sliderValue}
          onChange={(e) => handleSliderChange(String(e.value))}
          disabled={true}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {[100, 1000, 5000, 10000, 20000].map((num) =>
            num === 50000 ? (
              <Typography.Text tag="p" view="primary-medium" key={num}>
                {num}₽ +
              </Typography.Text>
            ) : (
              <Typography.Text tag="p" view="primary-medium" key={num}>
                {num}₽
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
          {!amount || amount < 100 ? "Оплатить" : `Оплатить ${amount}₽`}
        </ButtonMobile>
      </div>
    </>
  );
};
