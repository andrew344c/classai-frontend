import { Typography } from "@material-ui/core";
import React, { Component } from "react";

export default class ClassGrade extends Component {
    render() {
        const { cardNumber, classroomInfo } = this.props;

        const tabContent = `accordion-tab-1-content-${cardNumber}`;
        return (
            <div className="card widget-part">
                <div
                    className="card-header d-flex align-items-center"
                    id="accordion-tab-1-heading-1"
                >
                    <div
                        className="individual-grade row"
                        data-toggle="collapse"
                        data-target={`#${tabContent}`}
                        aria-expanded="false"
                        aria-controls={tabContent}
                    >
                        <div className="col-3 d-inline">
                            <h2 className="text-center">
                                {classroomInfo.grade
                                    ? classroomInfo.grade
                                    : "N/A"}
                            </h2>
                        </div>
                        <div className="col-9">
                            <h4>{classroomInfo.name}</h4>
                            <h6>Teacher: {classroomInfo.owner}</h6>
                        </div>
                    </div>
                </div>
                <div
                    className="collapse"
                    id={tabContent}
                    aria-labelledby="accordion-tab-1-heading-1"
                    data-parent="#accordion-tab-1"
                >
                    <div className="card-body">
                        <div className="row">
                            <div className="col-xl-6 d-none d-xl-block">
                                <h3>Trends</h3>
                                <canvas id="myChart" height={300} />
                            </div>
                            <div className="col-xl-6">
                                <h3>Recent</h3>
                                <div className="row all-grades">
                                    <div className="row categories">
                                        <div className="col-3">
                                            <h6>Name</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>Grade</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>Category</h6>
                                        </div>
                                        <div className="col-3">
                                            <h6>Notes</h6>
                                        </div>
                                    </div>
                                    {classroomInfo.grade ? (
                                        classroomInfo.grade.assignments.map(
                                            (assignment) => {
                                                return (
                                                    <div className="row assignment">
                                                        <div className="col-3">
                                                            <h6>
                                                                {
                                                                    assignment.name
                                                                }
                                                            </h6>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6>{`${assignment.grade}/${assignment.total}`}</h6>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6>Assignments</h6>
                                                        </div>
                                                        <div className="col-3">
                                                            <h6>{`${assignment.notes}`}</h6>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : (
                                        <Typography variant="h2">
                                            No assignments yet
                                        </Typography>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
