"use strict";

import $ from "jQuery";
import React from "react";

export default class BaseModalComponent extends React.Component {
    render () {
        const hideOrShow = this.props.showModal ? "show" : "hide";
        $(this.refs.modal).modal(hideOrShow);

        return (
            <div ref="modal" class ="modal fade" tabIndex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">{this.props.title}</h4>
                        </div>

                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
