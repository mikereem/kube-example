import {useState, useEffect, useRef} from 'react';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import {getAllTodos, createTodo} from './client';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import fetch from "unfetch";

function App() {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');
    const toastCreated = useRef(null);

    useEffect(() => {
        initConfig(() => getTodos());
    }, []);

    const initConfig = (callback) => {
        fetch('/config.json', {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            res.json().then(conf => {
                window.CONFIG = conf;
                callback();
            });
        });
    }

    const getTodos = () => {
        getAllTodos().then(res => res.json().then(todos => {
            setTodos(todos);
        }));
    }

    return (
        <div>
            <Toast ref={toastCreated} position="top-right" />
            <div className="card">
                <DataTable value={todos} responsiveLayout="scroll">
                    <Column field="todoItemUUID" header="ID"></Column>
                    <Column field="title" header="Title"></Column>
                    <Column field="description" header="Description"></Column>
                </DataTable>
            </div>
            <br/>
            <div className="card">
                <h5>Create new Todo item:</h5>
                <div className="flex">
                    <div className="flex-none flex align-items-center justify-content-center m-2">
                        <span className="p-float-label">
                            <InputText id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            <label htmlFor="title">Title</label>
                        </span>
                    </div>
                    <div className="flex-grow-1 flex align-items-center justify-content-center m-2">
                        <span className="p-float-label w-full">
                            <InputText id="desc" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} className="w-full"/>
                            <label htmlFor="desc">Description</label>
                        </span>
                    </div>
                    <div className="flex-none flex align-items-center justify-content-center m-2">
                        <Button label="Create" icon="pi pi-plus" onClick={e => createTodo(newTitle, newDesc).then(() => {
                            toastCreated.current.show({
                                severity: 'success',
                                summary: 'Success',
                                detail: 'Todo item created',
                                life: 3000
                            })
                            setNewTitle('');
                            setNewDesc('');
                            getTodos();
                        })}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;