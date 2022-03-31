import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {useReducer} from 'react';
import {AddField} from './components/AddField';
import {Item} from './components/Item';


const initialState = [];

const reducer = (state, action) => {
    if (action.type === 'ADD_TASK') {
        return [
            ...state,
            {
                id: state.length ? state[state.length - 1].id + 1 : 1,
                text: action.payload.text,
                completed: action.payload.completed,
            },
        ];
    }
    if (action.type === 'DELETE_TASK') {
        const newArr = state.filter((task) => {
            return task.id !== action.payload;
        });
        return newArr;
    }

    return state;
};

function App() {
    const addTask = (inputText, check) => {
        dispatch({
            type: 'ADD_TASK',
            payload: {text: inputText, completed: check},
        });
    };
    const deleteTask = (id) => {
        dispatch({
            type: 'DELETE_TASK',
            payload: id,
        });

        return (
            <div className="App">
                <Paper className="wrapper">
                    <Paper className="header" elevation={0}>
                        <h4>Список задач</h4>
                    </Paper>
                    <AddField onAdd={addTask}/>
                    <Divider/>
                    <Tabs value={0}>
                        <Tab label="Все"/>
                        <Tab label="Активные"/>
                        <Tab label="Завершённые"/>
                    </Tabs>
                    <Divider/>
                    <List>
                        {state.map((obj) => (
                            <Item
                                deleteTask={deleteTask}
                                text={obj.text}
                                key={obj.id}
                                id={obj.id}
                                completed={obj.completed}
                            />
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
}

export default App;
