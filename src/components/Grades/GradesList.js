import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import ClassGrade from "./ClassGrade";
import "./Grades.css";

import axios from "axios";
import { connect } from "react-redux";
import LoadingBackdrop from "../LoadingBackdrop";
import { Typography } from "@material-ui/core";

class GradesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            errors: null,
            classroomInfos: [],
        };
    }

    componentDidMount() {
        axios
            .get(`/grades`)
            .then((res) => {
                this.setState((oldState) => ({
                    ...oldState,
                    loading: false,
                    classroomInfos: res.data.classroomInfos,
                }));
            })
            .catch((err) => {
                if (
                    err.response &&
                    (err.response.status === 403 || err.response.status === 401)
                ) {
                    this.props.history.push("/login");
                } else {
                    console.error(err);
                    this.setState((oldState) => ({
                        ...oldState,
                        loading: false,
                        errors:
                            "An unexpected error occured, please try again later or contact us if this error persists.",
                    }));
                }
            });
    }

    render() {
        const { loading, errors, classroomInfos } = this.state;

        let classGrades = [];
        for (let i = 0; i < classroomInfos.length; i++) {
            classGrades.push(
                <ClassGrade
                    id={i}
                    cardNumber={i}
                    classroomInfo={classroomInfos[i]}
                />
            );
        }

        let grades;
        if (classGrades.length !== 0) {
            grades = classGrades;
        } else if (!loading) {
            grades = (
                <Typography
                    style={{
                        textAlign: "center",
                        paddingBottom: "1em",
                    }}
                    variant="h2"
                >
                    You are not a student in any classes yet!
                </Typography>
            );
        } else {
            grades = null;
        }

        return (
            <div className="d-flex align-items-center container-grades">
                <LoadingBackdrop open={loading} />
                <div className="row all">
                    <div className="col-lg-12 col-12 grades">
                        <div className="container-grades">
                            <div className="row all">
                                <div className="col-12 grades">
                                    <div
                                        className="tab-content wow animate__animated animate__fadeInRight"
                                        id="faq-tab-content"
                                    >
                                        <div
                                            className="tab-pane show active widget-part"
                                            id="tab1"
                                            role="tabpanel"
                                            aria-labelledby="tab1"
                                        >
                                            <div className="text-top">
                                                <h3>Grades</h3>
                                                <h5>Sort by: Period</h5>
                                            </div>
                                            <div
                                                className="accordion widget-part"
                                                id="accordion-tab-1"
                                            >
                                                {grades}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    classroom: state.data.classroom,
});

export default withRouter(connect(mapStateToProps, null)(GradesList));
