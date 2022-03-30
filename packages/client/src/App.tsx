import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

const usePing = (): string | undefined => {
    const [message, setMessage] = useState<string | undefined>();

    useEffect(() => {
        (async () => {
            const responce = await fetch('/api/ping');
            const pong = await responce.text();
            setMessage(pong);
        })();
    }, []);

    return message;
}

const usePostsData = (): string | undefined => {
    const [message, setMessage] = useState<string | undefined>();

    useEffect(() => {
        (async () => {
            const responce = await fetch('/api/posts');
            const message = await responce.json();
            setMessage(JSON.stringify(message));
        })();
    }, []);

    return message;
}

function App() {
    const message = usePing();
    const posts = usePostsData();

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />

                <p>
                    Сообщение от сервера по пути '/api/ping': {message}
                </p>

                <p>Посты из базы: {posts}</p>
            </header>
        </div>
    );
}

export default App;
