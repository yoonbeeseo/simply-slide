import { keyframes, style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import OpenColor from "open-color"

const time = 2
const scale = keyframes({
  "0%": {
    transform: "scale(0)",
    opacity: 0,
  },
  "50%": {
    transform: "scale(1.5)",
    opacity: 1,
  },
  "100%": {
    transform: "scale(0)",
    opacity: 0,
  },
})

const o = keyframes({
  "0%": {
    opacity: 0,
  },
  "50%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  },
})
const size = 10
const span = style({
  display: "block",
  width: size,
  height: size,
  borderRadius: size,
  backgroundColor: OpenColor.blue[6],
  transform: "scale(0)",

  animation: `${scale} ${time / 2}s ease-out infinite`,
})
const styles = {
  container: recipe({
    base: {
      display: "flex",
      rowGap: 10,
      width: "100%",
      height: "100vh",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "white",
      zIndex: 10,
    },
    variants: {
      isAbs: {
        true: {
          position: "absolute",
          height: "100%",
        },
      },
    },
  }),
  wrap: style({
    display: "flex",
    columnGap: size / 2,
  }),
  span1: style([span]),
  span2: style([
    span,
    { animationDelay: ".33333333s", backgroundColor: OpenColor.cyan[6] },
  ]),
  span3: style([
    span,
    { animationDelay: ".66666666s", backgroundColor: OpenColor.indigo[6] },
  ]),
  message: style({
    animation: `${o} ${time}s ease-out infinite`,
  }),
}

export default styles
