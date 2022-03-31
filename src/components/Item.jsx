import React from 'react';
import {useState} from 'react';

import {IconButton, Checkbox, ListItem, Typography} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const Item = ({text, completed, id, deleteTask, toggleCheckbox}) => {

    const [confirmDelete, setConfirmDelete] = useState(false);

    const onDeleteClick = () => {
        deleteTask(id);
    };

    const deleteQuestion = () => {
        setConfirmDelete(true);
    };

    const onCancelDelete = () => {
        setConfirmDelete(false);
    };

    const onCheckboxClick = () => {
        toggleCheckbox(id);
    };

    return (
        <ListItem>
            <div className="d-flex item">
                <Checkbox checked={completed} icon={<RadioButtonUncheckedIcon/>} checkedIcon={<CheckCircleIcon/>} onChange={onCheckboxClick}/>
                <Typography className="item-text">{text}</Typography>
                {confirmDelete ? (
                    <div>
                        <span>Are you sure? </span>
                        <button onClick={onDeleteClick}>Yes</button>
                        <button onClick={onCancelDelete}>no</button>
                    </div>
                ) : null}
                <div className="item-buttons d-flex">
                    <IconButton>
                        <EditIcon style={{fontSize: 20}}/>
                    </IconButton>
                    <IconButton onClick={deleteQuestion}>
                        <DeleteOutlineIcon style={{fontSize: 20}}/>
                    </IconButton>
                </div>
            </div>
        </ListItem>
    );
};
