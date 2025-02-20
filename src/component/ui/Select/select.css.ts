import { AiOutlinePlus } from "react-icons/ai"
import { keyframes, style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"

const show = keyframes({
  "0%": {
    height: "50%",
  },
  "100%": {
    height: "auto",
  },
})
const styles = {
  container: style({}),
  ul: recipe({
    base: {
      position: "absolute",
      transition: "all .5s",
      top: "100%",
      left: 0,
      width: "100%",
    },
    variants: {
      showing: {
        true: {
          height: "100%",
        },
      },
    },
  }),
  option: recipe({
    base: {
      cursor: "pointer",
      width: "100%",
      display: "flex",
      alignItems: "center",
      padding: "0 10px",
    },
    variants: {
      selected: {
        true: {},
      },
    },
  }),
}

export default styles
