import { blue, green, red } from "@material-ui/core/colors";
import {
    makeStyles
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1000,
      margin: "2%",
      justifyContent: "center",
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    thumbsup: {
      marginLeft: "auto",
      colorPrimary: green,
    },
    thumbsdown: {
      colorPrimary: red,
    },
    avatar: {
      backgroundColor: blue[900],
      color: "primary",
    },
    header: {
      fontSize: "large",
    },
    cardactions: {
      justifyContent: "space-between",
    },
  }));

export default useStyles;