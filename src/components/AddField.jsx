import {TextField, Button, Checkbox} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const AddField = ({setCheck, check, inputText, setInputText, addTask,}) => {
    return (<div className="field">
        <Checkbox
            checked={check}
            onChange={() => {
                setCheck((prevState) => {
                    return !prevState;
                });
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
        <Button onClick={addTask}>
            <AddIcon/>
        </Button>
    </div>);
};
