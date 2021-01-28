/*
    Made by Atholos
    This function returns a view depending on the widget(s) selected and the dialog that is seen
    when you press the '+' sign and select a widget.
*/

import React, { Fragment, useState } from 'react';
import { Card, Dialog, DialogTitle, List, ListItem, ListItemText, CardContent  } from '@material-ui/core';
import strings from '../localization';
import WidgetStyle from '../styles/widgetStyle';
import PropTypes from 'prop-types';
import WidgetList from '../widgets/WidgetList';
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '../actions/WidgetActions';
import WidgetFunctions from '../widgets/WidgetFunctions';

const Widgets = () => {
    const classes = WidgetStyle().widgetStyle();
    const widgets = WidgetList();

  // This list contains only one picture, the symbol '+'
  const defaultWidgetPicture = [
      require('../assets/plus_sign.png')
    ];

    // Creates a item of every widget for the Dialog
    const SelectViewDialog = (props) => {

        const { onClose, selectedValue, open } = props;

        const handleClose = () => {
            onClose(selectedValue);
       };

       const handleListItemClick = (value) => {
           onClose(value);
       };

        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
                <DialogTitle id="simple-dialog-title">{strings.dialogTitle}</DialogTitle>
                <List>
                    {widgets.map((widget) => (
                        <ListItem button onClick={() => handleListItemClick(widget)} key={widget}>
                            <ListItemText secondary={widget.label} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    };

    //proptypes for selecViewDialogs' closing, opening and saves the selected value
    SelectViewDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired
      };

    /*
        The HomepageWidget gets a default value of selectedValue, which is a state,
        the default value of the state will be first on the widgets list which is at the start of the code
        the default value should be plus_sign.png from src/assets folder so the first time users know
        they can add something to the front page
    */
    const HomepageWidget = () => {
        const [selectedValue, setSelectedValue] = useState(defaultWidgetPicture);
        const [open, setOpen] = useState(false);

        const selectedWidgets = useSelector(state => state.WidgetReducer);

        const dispatch = useDispatch();

        const handleClickOpen = () => {
            setOpen(true);
          };

          //Closes the dialog window and saves the value in selectedwidgets array
        const handleClose = (value) => {
            setOpen(false);
            if(widgets.includes(value)){
                setSelectedValue(value);
                dispatch(increment(value));
            }
          };

        /*
        The returned fragment is here, it get the values from above function SelectViewDialog
        the returned value depends on the length of selectedWidgets array and what state selectedValue has
        with .map one can forEach every array element, which is why the fragment returns as many widgets
        as there are saved into selectedWidgets state
        */
       if(selectedWidgets.length === 0) {
        return (
            <Fragment>
                <Card className={classes.card} onClick={handleClickOpen}>
                    <CardContent>
                        <img className={classes.plus} src={defaultWidgetPicture} alt='placeholder'/>
                    </CardContent>
                </Card>
                <SelectViewDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
            </Fragment>
        )
       }  else if (selectedWidgets.length < 3 && selectedWidgets.length > 0) {
        return (
            <Fragment>
                {selectedWidgets.map((selectedWidget) => (
                    <Card className={classes.card}>
                        <CardContent>
                            {selectedWidget.label}
                            {WidgetFunctions(selectedWidget)}
                        </CardContent>
                    </Card>
                ))}

                <Card className={classes.card} onClick={handleClickOpen}>
                    <CardContent>
                        <img className={classes.plus} src={defaultWidgetPicture} alt='placeholder'/>
                    </CardContent>
                </Card>
                <SelectViewDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
            </Fragment>
        )} else {
            return (
            <Fragment>
                {selectedWidgets.map((selectedWidget) => (
                    <Card className={classes.card}>
                        <CardContent>
                            {selectedWidget.label}
                            {WidgetFunctions(selectedWidget)}
                        </CardContent>
                    </Card>
                ))}
            </Fragment>
            )}
    };

    return {
        HomepageWidget
        };
};

export default Widgets;
