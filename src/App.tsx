import {
    useState,
    FormEvent
} from 'react';
import './App.css';
import { StockChart } from './stockChart';
import { toDateString } from './utils/toDateString';

function App() {
    const [ query, setQuery ] = useState({
        leftRange: '',
        rightRange: ''
    });
    const [ leftDateString, setLeftDateString ] = useState('');
    const [ leftRange, setLeftRange ] = useState('');
    const [ rightDateString, setRightDateString ] = useState('');
    const [ rightRange, setRightRange ] = useState('');

    function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setQuery({
            leftRange,
            rightRange
        });
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>BH Homework</h1>
                <p>{ leftRange && rightRange ?
                    `BH Homework displaying chart for range: "${leftRange}-${rightRange}"` : ''}</p>
            </header>
            <main>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="date"
                            max={rightDateString}
                            required={true}
                            onChange={(ev) => {
                                setLeftDateString(ev.target.value);
                                setLeftRange(toDateString(ev.target.value))
                            }}
                        /> - 
                        <input
                            type="date"
                            required={true}
                            min={leftDateString}
                            onChange={(ev) => {
                                setRightDateString(ev.target.value);
                                setRightRange(toDateString(ev.target.value));
                            }}
                        />
                        <button type="submit">Fetch</button>
                    </form>
                </div>
                <StockChart query={query} />
            </main>
        </div>
    );
}

export default App;
