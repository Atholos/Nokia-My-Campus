import { makeStyles } from "@material-ui/core/styles";
import { blue, green, red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 1000,
      marginTop: 10,
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
    typography:{
      textAlign: "left",
      margin: 10,
    },
    cardactions: {
      justifyContent: "space-between"
    },
  }));

export default useStyles;