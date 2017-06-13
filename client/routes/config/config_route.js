"use strict";

import React from "react";
import _ from "lodash";
import { connect } from "react-redux";

import diffConfig, { CONFIG_STATE } from "./config_differ";
import ConfigDifferenceTable from "../../components/config_difference_table_component";
import SearchBar from "../../components/search_bar_component";
import BaseModal from "../../components/base_modal_component";
import ConfigModel from "../../models/config_model";

const CONFIRM_STATES = {
    APPLY_CHANGES: "apply",
    DISCARD_CHANGES: "discard"
};

const DEFAULT_CONFIG = {
    hosts: []
};

class ConfigStaging extends React.Component {
    constructor (params) {
        super(params);

        this.handleSearchChange = this.handleSearchChange.bind(this);

        this.state = {
            searchTerm: "",
            showModal: false,
            config: {},
            debug: {
                confirmText: ""
            }
        };

        const configModel = new ConfigModel();
        params.dispatch(configModel.findAll({
            type: "GET",
            query: { include: CONFIG_STATE.STAGED }
        }));
    }

    filterConfig (config, searchTerm) {
        return _.filter(config.hosts, item => {
            return _(item)
            .keys()
            .some(key => _.includes(item[key], searchTerm));
        });
    }


    handleSearchChange (searchTerm) {
        this.setState({ searchTerm });
    }

    handleDiscardChanges () {
        this.setState({
            showModal: true,
            modalConfirmAction: CONFIRM_STATES.DISCARD_CHANGES,
            modalBodyText: "Are you sure you want to discard all configuration changes? All stagged changes will be discarded."
        });
    }

    handleApplyChanges () {
        this.setState({
            showModal: true,
            modalConfirmAction: CONFIRM_STATES.APPLY_CHANGES,
            modalBodyText: "Are you sure you want to apply these changes? This cannot be undone."
        });
    }

    handleModalConfirm () {
        this.setState({ showModal: false });

        if (this.state.modalConfirmAction === CONFIRM_STATES.APPLY_CHANGES) {
            this.setState({ debug: { confirmText: "Applying Changes... " }});
        }

        if (this.state.modalConfirmAction === CONFIRM_STATES.DISCARD_CHANGES) {
            this.setState({ debug: { confirmText: "Discarding Changes... " }});
        }
    }

    render () {
        const filteredConfig = { hosts: this.filterConfig(this.props.config, this.state.searchTerm) };

        const spinnerPlaceholder = (
            <div class="text-center">
                <h3>
                    <span class="fa fa-spinner fa-spin" /> Loading Staged Configuration Differences...
                </h3>
            </div>
        );

        const diffTable = this.props.config.hosts.length ? <ConfigDifferenceTable config={filteredConfig} /> : spinnerPlaceholder;

        return (
            <div class="row">
                <div class="col-md-offset-1"></div>

                <div class="col-md-10 col-md-offset-1">
                    <div class="row">
                        <div class="col-md-6">
                            <h1> Staged Configuration </h1>
                        </div>
                        <div class="col-md-4  col-md-offset-2">
                            <h1 class="pull-right">
                                <button class="btn btn-danger" onClick={() => this.handleDiscardChanges()}> Discard All Changes </button>
                                <button class="btn btn-primary margin-left-sm" onClick={() => this.handleApplyChanges()}> Apply Changes </button>
                                {/* this is temp until we actually have real actions taking place*/}
                                {this.state.debug.confirmText &&
                                    <p> {this.state.debug.confirmText} </p>
                                }
                            </h1>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <p>
                                Overview of all changed configuration across all the different BluVectors in your network.
                            </p>
                            <p>
                                <em>Please note:</em> Once changed have been applied, they cannot be undone.
                            </p>
                        </div>
                    </div>
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <div class="row">
                                <div class="col-md-4">
                                    <SearchBar onChange={this.handleSearchChange} placeholder="Search Host Name" />
                                </div>
                            </div>
                        </div>
                        {diffTable}
                    </div>
                </div>

                <BaseModal showModal={this.state.showModal} title="Are you sure?">
                    <div class="modal-body">
                        <p> {this.state.modalBodyText} </p>
                    </div>
                    <div class="modal-footer">
                        <div class="btn btn-default" onClick={() => this.setState({ showModal: false })}>Cancel</div>
                        <div class="btn btn-primary" onClick={() => this.handleModalConfirm()}>Confirm</div>
                    </div>
                </BaseModal>
            </div>
        );
    }
}

export default connect(state => ({ config: (diffConfig(state.config) || DEFAULT_CONFIG) }))(ConfigStaging);
