import {Paper, Divider, Button, List, Tabs, Tab} from '@mui/material';
import {useReducer, useState} from 'react';
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
        return state.filter((task) => {
            return task.id !== action.payload;
        });
    }

    if (action.type === 'TOGGLE_CHECKBOX') {
        return state.map((task) => {
            if (task.id === action.payload) {
                return {...task, completed: !task.completed};
            }
            return task;
        });
    }
    if (action.type === 'TICK_TASKS') {
        if (!action.payload) {
            return state.map((task) => {
                return {...task, completed: true};
            });
        } else
            return state.map((task) => {
                return {...task, completed: false};
            });
    }
    if (action.type === 'CLEAR_TASKS') {
        return [];
    }

    return state;
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [activeTab, setActiveTab] = useState(0);

    const toggleCheckbox = (id) => {
        dispatch({
            type: 'TOGGLE_CHECKBOX',
            payload: id,
        });
    };

    const tickAllTasks = () => {
        dispatch({type: 'TICK_TASKS'});
    };
    const clearAllTasks = () => {
        dispatch({type: 'CLEAR_TASKS'});
    };

    const showActiveTasks = () => {
        setActiveTab(1);
    };
    const showFinishedTasks = () => {
        setActiveTab(2);
    };

    const showAllTasks = () => {
        setActiveTab(0);
    };

    const filterTodos = (filterType) => {
        switch (filterType) {
            case 0:
                return state;
            case 1:
                return state.filter((task) => !task.completed);
            case 2:
                return state.filter((task) => task.completed);
            default:
                return state;
        }
    };

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
                    <Tabs value={activeTab}>
                        <Tab onClick={showAllTasks} label="Все"/>
                        <Tab onClick={showActiveTasks} label="Активные"/>
                        <Tab onClick={showActiveTasks} label="Завершённые"/>
                    </Tabs>
                    <Divider/>
                    <List>
                        {filterTodos(activeTab).map((obj) => (
                            <Item
                                deleteTask={deleteTask}
                                text={obj.text}
                                key={obj.id}
                                id={obj.id}
                                completed={obj.completed}
                                toggleCheckbox={toggleCheckbox}
                            />
                        ))}
                    </List>
                    <Divider/>
                    <div className="check-buttons">
                        <Button disabled={!state.length}  onClick={tickAllTasks}>Отметить всё</Button>
                        <Button disabled={!state.length} onClick={clearAllTasks}>Очистить</Button>
                    </div>
                </Paper>
            </div>
        );
    }
}

export default App;
