import { style } from "@vanilla-extract/css";

const container = style({
  display: "flex",
  padding: "1rem",
  flexDirection: "column",
  gap: "1rem",
});

const box = style({
  display: "flex",
  flexDirection: "column",
  gap: ".5rem",
  borderRadius: "24px",
  border: "2px solid #F8F8F8",
  overflow: "hidden",
  textAlign: "center",
  paddingBottom: "1rem",
  backgroundColor: "#F8F8F8",
});

const subscription = style({
  display: "flex",
  alignItems: "center",
  border: "2px solid #F3F4F5",
  borderRadius: "24px",
  boxSizing: "border-box",
  padding: "1rem",
  justifyContent: "space-evenly",
  gap: "1.2rem",
});

const subscriptionText = style({
  fontSize: "15px",
  lineHeight: "20px",
});

const bottomBtn = style({
  position: "fixed",
  zIndex: 2,
  width: "100%",
  padding: "12px",
  bottom: 0,
});

const productsTitle = style({
  fontSize: "22px",
});

const products = style({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const product = style({
  backgroundColor: "#F2F3F5",
  borderRadius: "1rem",
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  gap: "0.2rem",
});

const productTitle = style({
  lineHeight: "24px",
  fontSize: "17px",
  marginBottom: "0.3rem",
});

const productIcon = style({
  transform: "scale(1.1)",
});

const productText = style({
  marginBottom: 0,
});

const card = style({
  display: "flex",
  gap: "12px",
});

const cardImageContainer = style({
  alignSelf: "center",
});

const cardImage = style({
  borderRadius: "0.5rem",
  display: "block",
  objectFit: "contain",
});

const cardTextContainer = style({
  display: "flex",
  flexDirection: "column",
  flex: "1 1",
});

const cardDiscountContainer = style({
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
});

const sheetContainer = style({
  display: "flex",
  flexDirection: "column",
  borderRadius: "1rem",
});

const sheetImage = style({
  height: "172px",
  borderRadius: "1rem 1rem 0 0",
});

const sheetTextContainer = style({
  display: "flex",
  padding: "1rem",
  boxSizing: "border-box",
  backgroundColor: "#F5F5F5",
  borderRadius: "0 0 1rem 1rem",
});

const icon = style({
  display: "block",
  margin: "0 auto",
});

export const appSt = {
  icon,
  bottomBtn,
  container,
  box,
  subscription,
  subscriptionText,
  productsTitle,
  products,
  productTitle,
  product,
  productIcon,
  productText,
  card,
  cardImageContainer,
  cardImage,
  cardTextContainer,
  cardDiscountContainer,
  sheetContainer,
  sheetImage,
  sheetTextContainer,
};
