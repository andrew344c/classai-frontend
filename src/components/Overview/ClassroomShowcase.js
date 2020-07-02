import React, { Component } from "react";
import ClassroomCard from "./ClassroomCard";

import { connect } from "react-redux";
import { Typography } from "@material-ui/core";

class ClassroomShowcase extends Component {
    render() {
        return (
            <div>
                {this.props.assignments.length === 0 ? (
                    <Typography>There are currently no assignments</Typography>
                ) : (
                    <ClassroomCard />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    assignments: state.data.assignments,
});
export default connect(mapStateToProps, null)(ClassroomShowcase);
