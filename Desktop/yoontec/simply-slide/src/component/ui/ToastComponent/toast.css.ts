import { style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import OpenColor from "open-color"

const styles = {
  container: style({
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 99,
  }),
  toast: recipe({
    base: {
      display: "flex",
      columnGap: 10,
      border: "1px solid",
      padding: 10,
      borderRadius: 4,
      borderLeft: `4px solid`,
      margin: "20px 20px 0",
    },
    variants: {
      type: {
        Error: {
          backgroundColor: OpenColor.red[0],
          color: OpenColor.red[6],
        },
        Success: {
          backgroundColor: OpenColor.green[0],
          color: OpenColor.green[6],
        },
        Message: {
          backgroundColor: OpenColor.gray[0],
          color: OpenColor.gray[6],
        },
        Warning: {
          backgroundColor: OpenColor.orange[0],
          color: OpenColor.orange[6],
        },
      },
    },
  }),
  wrap: style({
    display: "flex",
    columnGap: 20,
    alignItems: "center",
    flex: 1,
    paddingLeft: 10,
  }),
  btn: recipe({
    base: {
      // border: "1px solid",
      padding: 10,
      cursor: "pointer",
    },
    variants: {
      type: {
        Error: {},
        Success: {},
        Message: {},
        Warning: {},
      },
    },
  }),
  icon: style({
    fontSize: 20,
  }),
}

export default styles
