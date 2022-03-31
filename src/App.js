import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {useReducer, useState} from 'react';
import {AddField} from './components/AddField';
import {Item} from './components/Item';


const initialState = [
    {
        id: 1,
        text: 'ХЗ что написать',
        completed: true,
    },
];

const reducer = (state, action) => {
    if (action.type === 'ADD_TASK') {
        return [...state, action.payload];
    }

    return state;
};

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);

    const [inputText, setInputText] = useState('');

    const [check, setCheck] = useState(false);

    const addTask = () => {
        dispatch({
            type: 'ADD_TASK',
            payload: {text: inputText, id: state.length ? state.length + 1 : 1, completed: check},
        });
        setInputText('');
        setCheck(false);
    };

    return (
        <div className="App">
            <Paper className="wrapper">
                <Paper className="header" elevation={0}>
                    <h4>Список задач</h4>
                </Paper>
                <AddField setCheck={setCheck}
                          check={check}
                          addTask={addTask}
                          input={inputText}
                          setInputText={setInputText}/>
                <Divider/>
                <Tabs value={0}>
                    <Tab label="Все"/>
                    <Tab label="Активные"/>
                    <Tab label="Завершённые"/>
                </Tabs>
                <Divider/>
                <List>
                    {state.map((obj) => (
                        <Item text={obj.text} key={obj.id} completed={obj.completed}/>
                    ))}
                </List>
                <Divider/>
                <div className="check-buttons">
                    <Button>Отметить всё</Button>
                    <Button>Очистить</Button>
                </div>
            </Paper>
        </div>
    );
}

export default App;
