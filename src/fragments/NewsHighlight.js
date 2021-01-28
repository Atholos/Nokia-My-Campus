// News by Rockronnie
import React from "react";
import {
  Paper,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  CardActionArea,
  Chip,
} from "@material-ui/core";
import useStyles from '../styles/newsHighlightStyles';
import { PropTypes } from "prop-types";
import { navigate } from "hookrouter";

import { useDispatch } from 'react-redux';
import { currentItem } from './../actions/NewsActions';

// News highlight item, takes the curren highlight item as props, used in news
const HighlightItem = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  // When navigating we're adding the item to redux/localstorage state so when user refreshes it doesn't lose the currently selected article and show an empty page
  return (
    
      <Paper elevation={0} className={classes.root}>
        <CardActionArea
          onClick={() => {
            dispatch(currentItem(props.highlight));
            navigate("/news_article", false);
          }}
        >
          <CardHeader
            className={classes.header}
            titleTypographyProps={{ variant: "h5" }}
            title={props.highlight.title}
          />
         <CardMedia
            className={classes.media}
            image={props.highlight.headerImgUrl ? props.highlight.headerImgUrl : require("../assets/default.jpg")}
            title={props.highlight.headerImgTitle}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.highlight.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing className={classes.cardactions}>
          <Typography>{props.highlight.timestamp}</Typography>
          <Chip label="Highlight" color="primary" />
        </CardActions>
      </Paper>
    
  );
};

HighlightItem.propTypes = {
  highlight: PropTypes.object,
};

export default HighlightItem;
