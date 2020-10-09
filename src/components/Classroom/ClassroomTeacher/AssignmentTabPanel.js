import { Box } from "@material-ui/core";
import zIndex from "@material-ui/core/styles/zIndex";
import React, { Component } from "react";

export default class AssignmentTab extends Component {
    render() {
        const { index, open } = this.props;
        return (
            <div
                role="tabpanel"
                hidden={open}
                id={`vertical-tabpanel-${index}`}
                aria-labelledby={`vertical-tab-${index}`}
            >
                <Box p={3}>{`Tab ${index}`}</Box>
            </div>
        );
    }
}
