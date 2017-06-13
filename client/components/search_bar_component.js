"use strict";

import React from "react";
import _ from "lodash";

export default class SearchBar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            searchTerm: ""
        };

        this.handleChange = this.handleChange.bind(this);

        this.onChange = _.debounce(searchTerm => this.props.onChange(searchTerm), 100);
    }

    handleChange (event) {
        const { value } = event.target;

        this.setState({ searchTerm: value });
        this.onChange(value);
    }

    render () {
        const { state } = this;

        return (
            <div class="input-group">
                <div class="input-group-addon"><span class="glyphicon glyphicon-search"></span></div>
                <input
                    type="text"
                    class="form-control"
                    placeholder={this.props.placeholder}
                    value={state.searchTerm}
                    onChange={this.handleChange}
                />
            </div>
        );
    }
}