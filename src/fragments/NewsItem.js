// News by Rockronnie
import React from "react";
import { ThemeProvider } from "@material-ui/core";
import useStyles from '../styles/newsItemStyles';
import Paper from "@material-ui/core/Paper";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

import Chip from "@material-ui/core/Chip";
import PropTypes from 'prop-types';

// Newsitem takes a single article object as props
const NewsItem = (props) => {
    const classes = useStyles();
    var data = props;
    return (
    <>  
      <ThemeProvider> 
      <Paper elevation = {0} className={classes.root}>
        <CardActions disableSpacing className = {classes.cardactions}>
          <Typography>{data.articleData.timestamp}</Typography>
          {data.articleData.highlight !== false ? <Chip label="Highlight" color="primary" /> : <div/>}
        </CardActions>
        <CardMedia
          className={classes.media}
          image={data.articleData.headerImgUrl ? data.articleData.headerImgUrl : require("../assets/default.jpg")}
          title={data.articleData.headerImgTitle}
        />
        <CardHeader
          className={classes.header}
          titleTypographyProps={{ variant: "h5" }}
          title={data.articleData.title}
        />
        <CardContent>
          {(Object.keys(data.articleData.paragraphs) || {}).map(paragraph => (
            <>
            {data.articleData.paragraphs[paragraph].imgUrl &&
            <CardMedia
                className={classes.media}
                image={data.articleData.paragraphs[paragraph].imgUrl}
            />}
            {data.articleData.paragraphs[paragraph].imgTitle &&
            <Typography className = {classes.typography} key={paragraph} variant="body2" color="textSecondary" component="p">{data.articleData.paragraphs[paragraph].imgTitle}</Typography>}
            <Typography className = {classes.typography} key={paragraph} variant="body2" color="textSecondary" component="p">{data.articleData.paragraphs[paragraph].text}</Typography>
            </>
          ))}
        </CardContent>
      </Paper>
      </ThemeProvider>
    </>
    );
  };

  NewsItem.propTypes = {
    articleData: PropTypes.object
  };

  export default NewsItem;