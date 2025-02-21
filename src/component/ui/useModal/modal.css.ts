import { keyframes, style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import OpenColor from "open-color"

const hide = style({
  width: 20,
  height: 20,
  position: "absolute",
  top: 0,
  right: 0,
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
})

const show = keyframes({
  "0%": {
    opacity: 0,
    visibility: "hidden",
  },
  "100%": {
    opacity: 1,
    visibility: "visible",
  },
})
const styles = {
  container: style({
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,.2)",
    backdropFilter: "blur(1px)",
  }),
  content: recipe({
    base: {
      position: "relative",
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      border: "1px solid lightgray",
      minWidth: 160,
    },
    variants: {
      visible: {
        true: {},
      },
    },
  }),
  hide,
  span: style({
    width: 10,
    height: 10,
    borderRadius: 14,
    backgroundColor: OpenColor.red[6],
    display: "block",
    selectors: {
      [`${hide}:hover &`]: {
        backgroundColor: OpenColor.red[4],
      },
    },
  }),
  bg: style({
    position: "absolute",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
    zIndex: -1,
  }),
}

export default styles
