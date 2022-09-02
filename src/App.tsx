// import React from 'react';
import './App.css';
import {
    QueryType,
    useData
} from './useData';

function App() {
    const data = useData({
        queryType: QueryType.RANGE,
        queryString: '15/02/2022-15/05/2022'
    });

    return (
        <div className="App">
            <header className="App-header">
                BH Homework
            </header>
            <main>
                {
                    data.map((item) => <div>{item.date}</div>)
                }
            </main>
        </div>
    );
}

export default App;
