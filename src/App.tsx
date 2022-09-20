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
    const [ leftRange, setLeftRange ] = useState('');
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
                {`BH Homework displaying chart for range: "${leftRange}-${rightRange}"`}
            </header>
            <main>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="date"
                            required={true}
                            onChange={(ev) => setLeftRange(toDateString(ev.target.value))}
                        /> - 
                        <input
                            type="date"
                            required={true}
                            onChange={(ev) => setRightRange(toDateString(ev.target.value))}
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
