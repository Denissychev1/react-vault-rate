import React from 'react';
import './App.css';
import {Calendarr} from './components/calendar'
import {Graph} from './components/graph'
import {Button} from "./components/button";
import 'devextreme/dist/css/dx.light.css';
import {Container, Row, Col} from "react-bootstrap";


function App() {
    return (
        <div className='app'>

            <main>
                <Container>
                    <Row>
                        <Col md={6} sm={12} lg={6}>
                            <div className="button">
                                <Button/>
                            </div>
                        </Col>
                        <Col md={6} sm={12} lg={6}>
                            <div className="calendar">
                                <Calendarr/>
                            </div>
                        </Col>
                        <div className="graph">
                            <Graph/>
                        </div>
                    </Row>
                </Container>
            </main>
        </div>
    );
}

export default App;