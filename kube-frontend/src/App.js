import {useState, useEffect} from 'react';
import { InputText } from 'primereact/inputtext';
import {Button} from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {getAllTodos} from './client';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';

function App() {
    const [count,setCount] = useState(0);
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    useEffect(() => {
        getAllTodos().then(res => res.json().then(todos => {
            setTodos(todos);
        }));
    }, []);

    return (
        <div>
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
                <div className="flex flex-row flex-wrap">
                    <div className="flex align-items-center justify-content-center m-2">
                        <span className="p-float-label">
                            <InputText id="title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                            <label htmlFor="title">Title</label>
                        </span>
                    </div>
                    <div className="flex align-items-center justify-content-center m-2">
                        <span className="p-float-label">
                            <InputText id="desc" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} />
                            <label htmlFor="desc">Description</label>
                        </span>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <Button label="Click" icon="pi pi-plus" onClick={e => setCount(count + 1)}></Button>
                <div className="text-2xl text-900 mt-3">{count}</div>
            </div>
        </div>
    );
}

export default App;