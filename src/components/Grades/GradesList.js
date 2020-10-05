import React, { Component } from "react";

import ClassGrade from "./ClassGrade";
import "./Grades.css";

export default class GradesList extends Component {
    render() {
        return (
            <div className="d-flex align-items-center container-grades">
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
                                                {/* for testing */}
                                                <ClassGrade cardNumber={1} />
                                                <ClassGrade cardNumber={2} />
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
