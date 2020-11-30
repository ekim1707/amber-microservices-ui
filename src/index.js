import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import './styles.scss';
import Router from "./routes";
import FooterComponent from "./components/FooterComponent";

const App = () => {
    return (
        <main className="mainContainer">
            <div className="mainBackgroundContainer"></div>
            <Router />
            <FooterComponent />
        </main>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));