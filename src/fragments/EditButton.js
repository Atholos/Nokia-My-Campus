/*
Made by Atholos
This file holds all the functionality that editbutton has
Include or remove functionality as you see fit.
*/
import React, { useEffect, useState } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import { useSelector, useDispatch } from 'react-redux';
import { cleanState } from '../actions/WidgetActions';
//import {editmode} from '../actions/EditModeActions';
import editButtonStyles from '../styles/editButtonStyles';
import { Grid } from '@material-ui/core';
import {  Dialog, DialogTitle, List, ListItem, ListItemText  } from '@material-ui/core';
import strings from '../localization';
import PropTypes from 'prop-types';

/*
This function returns a EditIcon button which will enable editing once the state is updated
when a person has 1 or more widgets selected on the homepage.
*/
const EditButton = () =>  {
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const classes = editButtonStyles();
    const editList = ['Yes', 'No'];

    //Redux states
    const selectedWidgets = useSelector(state => state.WidgetReducer);
    //const editMode = useSelector(state => state.EditModeReducer)

    // Creates a item of every widget for the Dialog on front page
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
                <DialogTitle id="simple-dialog-title">{strings.remWidgets}</DialogTitle>
                <List>
                    {editList.map((item) => (
                        <ListItem button onClick={() => handleListItemClick(item)} key={item}>
                            <ListItemText secondary={item} />
                        </ListItem>
                    ))}
                </List>
            </Dialog>
        );
    };

    //Handling selecViewDialogs' closing, opening and saves the selected value
    SelectViewDialog.propTypes = {
        onClose: PropTypes.func.isRequired,
        open: PropTypes.bool.isRequired,
        selectedValue: PropTypes.string.isRequired,
      };


    const dispatch = useDispatch();

    // Toggles the buttons disabled state, depending on how many widgets are in selectedWidgets state
    const toggleButton = () => {
        if(selectedWidgets.length > 0){
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    };

    // Removes all states from selectedWidgets
    const RemoveAll = () => {
        dispatch(cleanState());
    };

    useEffect(() => {
        toggleButton();
    });



    const EditIconButton = () => {
        const [selectedValue, setSelectedValue] = useState('No');
        const [open, setOpen] = useState(false);

        const handleClickOpen = () => {
            setOpen(true);
          };

          //Closes the dialog window and saves the value in selectedwidgets array
        const handleClose = (value) => {
            setOpen(false);
            setSelectedValue(value);
          };

        /* eslint-disable */
        useEffect(() => {
            if(selectedValue==='Yes'){
                RemoveAll();
            }
        }), [selectedValue];

        return (
            <Grid float='right'>
                <IconButton disabled={buttonDisabled} onClick={handleClickOpen} className={classes.button}>
                    <EditIcon/>
                </IconButton>
                <SelectViewDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
            </Grid>
        )
    };

return {
    EditIconButton,
    };
};

export default EditButton;
