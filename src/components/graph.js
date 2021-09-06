import React from "react";

import {
    Chart,
    Series,
    ArgumentAxis,
    CommonSeriesSettings,
    Export,
    Legend,
    Margin,
    Title,
    Tooltip,
    Grid
} from 'devextreme-react/chart';

import {Container} from "react-bootstrap";

export class Graph extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'scatter'
        };
        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            .then((res) => res.json())
            .then((data) => {
                this.gridDataSource = Object.values(data.Valute)
                console.log(this.gridDataSource)
            });

    }

    componentDidMount() {
        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            .then((res) => res.json())
            .then((data) => {
                console.log('look it is data', data);
                this.setState({gridDataSource: [data.Valute]})
            });
    }

    render() {
        return (
            <React.Fragment>
                <Container>
                    <Chart
                        palette="Violet"
                        dataSource={this.gridDataSource}
                    >
                        <CommonSeriesSettings
                            argumentField="Name"
                            type={this.state.type}
                        />
                        <Series valueField="Value"/>
                        <Margin bottom={20}/>
                        <ArgumentAxis
                            valueMarginsEnabled={false}
                            discreteAxisDivisionMode="crossLabels"
                        >
                            <Grid visible={true}/>
                        </ArgumentAxis>
                        <Legend visible={false}
                                verticalAlignment="bottom"
                                horizontalAlignment="center"
                                itemTextPosition="bottom"
                        />
                        <Export enabled={true}/>
                        <Title text="Курс Валют">
                        </Title>
                        <Tooltip enabled={true} customizeTooltip={customizeTooltip}/>
                    </Chart>
                </Container>
            </React.Fragment>
        );
    }


}

function customizeTooltip(e) {
    return {
        html: `<div>
<div class="tooltip-header">Валюта: ${e.argumentText}</div>
<div class="value-text">
<span class='top-series-value'>Значение: ${e.originalValue}</span class='top-series-value'></div> </div>`
    };

}