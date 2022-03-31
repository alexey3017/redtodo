import {useState} from 'react';

import {TextField, Button, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({onAdd}) => {

    const [inputText, setInputText] = useState('');
    const [check, setCheck] = useState(false);
    const onClickAdd = () => {
        onAdd(inputText, check);
        setInputText('');
        setCheck(false);
    };

    return (<div className="field">
        <Checkbox
            checked={check}
            onChange={(e) => {
                setCheck(e.target.checked);
            }}
            className="checkbox"
            icon={<RadioButtonUncheckedIcon/>}
            checkedIcon={<CheckCircleIcon/>}
        />
        <TextField
            onChange={(e) => {
                setInputText(e.target.value);
            }}
            value={inputText}
            placeholder="Введите текст задачи..."
            variant="standard"
            fullWidth
        />
        <Button onClick={onClickAdd}>
            <AddIcon/>
        </Button>
    </div>);
};
