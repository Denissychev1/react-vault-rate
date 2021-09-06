import React from "react";
import 'whatwg-fetch';
import {DropDownBox, DataGrid} from "devextreme-react";
import {FilterRow, Paging, Scrolling, Selection} from "devextreme-react/data-grid";
import CustomStore from "devextreme/data/custom_store";

import {Container, Col, Row} from "react-bootstrap";

const gridColumns = ['Name'];


export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.gridDataSource = [];
        this.state = {
            gridBoxValue: [3],
            isGridBoxOpened: false,
        };
        this.syncDataGridSelection = this.syncDataGridSelection.bind(this);
        this.dataGrid_onSelectionChanged = this.dataGrid_onSelectionChanged.bind(this);
        this.dataGridRender = this.dataGridRender.bind(this);
        this.onGridBoxOpened = this.onGridBoxOpened.bind(this);
        fetch("https://www.cbr-xml-daily.ru/daily_json.js")
            .then((res) => res.json())
            .then((data) => {
                this.gridDataSource = Object.values(data.Valute)
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
            <Container>
                <Row>
                    <Col md={6} lg={6} sm={6}>
                        <p> Выберите валюту: </p>
                    </Col>

                    <Col md={6} lg={6} sm={6}>
                        <DropDownBox
                            value={this.state.gridBoxValue}
                            opened={this.state.isGridBoxOpened}
                            valueExpr="Name"
                            deferRendering={false}
                            displayExpr={this.gridBox_displayExpr}
                            placeholder="Select a value..."
                            showClearButton={true}
                            dataSource={this.gridDataSource}
                            onValueChanged={this.syncDataGridSelection}
                            onOptionChanged={this.onGridBoxOpened}
                            contentRender={this.dataGridRender}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }

    dataGridRender() {
        return (
            <DataGrid
                dataSource={this.gridDataSource}
                columns={gridColumns}
                hoverStateEnabled={true}
                keyExpr="Name"
                selectedRowKeys={this.state.gridBoxValue}
                onSelectionChanged={this.dataGrid_onSelectionChanged}
                height="100%">
                <Selection mode="single"/>
                <Scrolling mode="virtual"/>
                <Paging enabled={true} pageSize={10}/>
                <FilterRow visible={true}/>
            </DataGrid>

        );
    }

    syncDataGridSelection(e) {
        this.setState({
            gridBoxValue: e.value
        });
    }

    dataGrid_onSelectionChanged(e) {
        this.setState({
            gridBoxValue: e.selectedRowKeys,
            isGridBoxOpened: false
        });
    }

    gridBox_displayExpr(item) {
        return item && `${item.Name}`;
    }

    onGridBoxOpened(e) {
        if (e.name === 'opened') {
            this.setState({
                isGridBoxOpened: e.value
            });
        }
    }

    async makeAsyncDataSource() {
        return new CustomStore({
            loadMode: 'raw',
            key: 'ID',
            load: function () {
                return fetch("https://www.cbr-xml-daily.ru/daily_json.js")
                    .then(data => {
                        console.log(data);
                        data.json()
                    });
            }
        });
    }
}
