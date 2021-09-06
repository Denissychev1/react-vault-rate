import React from "react";
import Calendar from 'devextreme-react/calendar';
import {Container, Col, Row} from "react-bootstrap";

export class Calendarr extends React.Component {
    constructor() {
        super();
        this.state = {
            currentValue: new Date(),
            disabled: false,
            zoomLevel: 'month'
        };
        this.onCurrentValueChanged = this.onCurrentValueChanged.bind(this);
        this.onZoomLevelValueChanged = this.onZoomLevelValueChanged.bind(this);
        this.onZoomLevelChanged = this.onZoomLevelChanged.bind(this);
    }

    render() {
        const {
            currentValue
        } = this.state;
        return (
            <Container>
                <Row>
                    <Col md={6} lg={6} sm={6}>
                        <p>Выберите дату:</p>
                    </Col>

                    <Col md={6} lg={6} sm={6}>
                        <div className="widget-container">
                            <Calendar
                                id="calendar-container"
                                value={currentValue}
                                onValueChanged={this.onCurrentValueChanged}
                                onOptionChanged={this.onZoomLevelChanged}/>
                        </div>
                    </Col>
                </Row>
            </Container>


        );
    }

    onCurrentValueChanged(e) {
        this.setState({
            currentValue: e.value
        });
    }

    onZoomLevelValueChanged(e) {
        this.setState({
            zoomLevel: e.value
        });
    }

    onZoomLevelChanged(e) {
        if (e.name === 'zoomLevel') {
            this.setState({
                zoomLevel: e.value
            });
        }
    }
}
