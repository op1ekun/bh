import {
    useState,
    FormEvent,
    ChangeEvent
} from 'react';
import { debounce } from 'lodash';
import './App.css';
import {
    QueryType
} from './useData';
import { StockChart } from './stockChart';
import { toDateString } from './utils/toDateString';

function App() {
    const [ query, setQuery ] = useState({
        queryType: QueryType.RANGE,
        queryString: ''
    });
    const [ leftRange, setLeftRange ] = useState('');
    const [ rightRange, setRightRange ] = useState('');

    function handleSubmit(ev: FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        setQuery({
            queryType: QueryType.RANGE,
            queryString: `${leftRange}-${rightRange}`
        });
    }

    const handleLeftRange = debounce(
        (ev: ChangeEvent<HTMLInputElement>) => {
            setLeftRange(toDateString(ev.target.value))
        }, 400);

    const handleRightRange = debounce(
        (ev: ChangeEvent<HTMLInputElement>) => {
            setRightRange(toDateString(ev.target.value))
        }, 400);

    return (
        <div className="App">
            <header className="App-header">
                {`BH Homework displaying chart for range: "${query.queryString}"`}
            </header>
            <main>
                <div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="date"
                            required={true}
                            onChange={(ev) => handleLeftRange(ev)}
                        /> - 
                        <input
                            type="date"
                            required={true}
                            onChange={(ev) => handleRightRange(ev)}
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
