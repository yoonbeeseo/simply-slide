import { style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import OpenColor from "open-color"

const styles = {
  container: recipe({
    base: {
      position: "fixed",
      width: "100%",
      height: "100vh",
      zIndex: 100,
      backdropFilter: "blur(2px)",
      backgroundColor: "rgba(0,0,0,.5)",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      opacity: 0,
      visibility: "hidden",
      top: 0,
      left: 0,
    },
    variants: {
      state: {
        true: {
          border: "none",
          opacity: 1,
          visibility: "visible",
        },
      },
    },
  }),
  wrap: recipe({
    base: {
      backgroundColor: "white",
      padding: 20,
      paddingBottom: 10,
      borderRadius: 10,
      boxShadow: "0 3px 6px rgba(0,0,0,.2)",
      transition: "all .5s ease-out",
      transform: "translateY(30px)",
      textAlign: "center",
      minWidth: 200,
      width: "80vw",
      maxWidth: 320,
    },
    variants: {
      state: {
        true: {
          transform: "translateY(0px)",
        },
      },
    },
  }),
  title: style({
    fontSize: 14,
    fontWeight: 300,
  }),
  message: style({
    marginTop: 10,
    paddingBottom: 20,
    borderBottom: "1px solid lightgray",
    lineHeight: 1.6,
    fontSize: 16,
  }),
  ul: style({
    display: "flex",
    justifyContent: "center",
  }),
  button: recipe({
    base: {
      fontWeight: 300,
      color: OpenColor.blue[6],
      cursor: "pointer",
      height: 40,
      width: "100%",
      "@media": {
        "(hover: hover)": {
          ":hover": {
            color: OpenColor.blue[4],
          },
        },
      },
    },
    variants: {
      isLeft: {
        true: {
          //   borderLeft: "1px solid lightgray",
        },
      },
    },
  }),
  shadow: style({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  }),
}

export default styles
