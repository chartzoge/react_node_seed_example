"use strict";

import React from "react";
import str from "underscore.string";
import _ from "lodash";

const humanize = (text) => str.titleize(str.humanize(text));

const getValueDisplay = (value) => {
    if (_.isBoolean(value)) {
        const icon = value ? "check" : "remove";
        return <i class={"fa fa-" + icon}></i>;
    }

    return value.toString();
};

const getStyledConfigValue = (config, value) => {
    const name = config.verbose_name || config.name;

    return (
        <p key={_.uniqueId(name + value)}>
            <strong>{humanize(name)}</strong>: <code>{getValueDisplay(value)}</code>
        </p>
    );
};

export default class ConfigDifferenceTable extends React.Component {
    constructor (props) {
        super(props);

        const initialHost = props.config.hosts[0];

        this.state = {
            expandedRows: [initialHost ? initialHost.id : undefined]
        };
    }

    getCategoryRows (machine) {
        const hideOrShow = _.includes(this.state.expandedRows, machine.id) ? "" : "hidden";

        return machine.categories.map(category => {
            const oldText = [];
            const newText = [];

            category.configs.forEach(config => {
                oldText.push(getStyledConfigValue(config, config.diff.old));
                newText.push(getStyledConfigValue(config, config.diff.new));
            });

            return (
                <tr class={hideOrShow} key={category.id}>
                    <td></td>
                    <td></td>
                    <td>
                        <a href={category.href} target="_blank">{category.name}</a>
                    </td>
                    <td>{oldText}</td>
                    <td>{newText}</td>
                </tr>
            );
        });
    }

    getTableRows () {
        return this.props.config.hosts.map((machine, index) => {
            const topBorderClass = index <= 0 ? "" : "strong-border-top";
            const isExpanded = _.includes(this.state.expandedRows, machine.id);
            const expandIconClass = isExpanded ? "fa fa-minus-square-o" : "fa fa-plus-square-o";

            const row = (
                <tr class="pointer" key={machine.id} onClick={() => this.toggleRowExpand(machine.id)}>
                    <td class="expand-row info"><i class={expandIconClass}></i></td>
                    <td class={topBorderClass + " info"} colSpan="5">{machine.name}</td>
                </tr>
            );

            return [row, ...this.getCategoryRows(machine)];
        });
    }

    render () {
        return (
            <div>
                <table class="table table-padded table-condensed table-hover">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Host</th>
                            <th>Category</th>
                            <th>Current</th>
                            <th>Staged</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.getTableRows()}
                    </tbody>
                </table>
            </div>
        );
    }

    // actions
    toggleRowExpand (machineId) {
        let expandedRows = this.state.expandedRows;

        if (_.includes(expandedRows, machineId)) {
            expandedRows = _.without(expandedRows, machineId);
        } else {
            expandedRows = expandedRows.concat(machineId);
        }

        this.setState({
            expandedRows: expandedRows
        });
    }
}
