import React, { Component } from 'react'

import GradesList from "../components/Grades/GradesList";
import Navbar from '../components/Navigation/Navbar';

export default class Grades extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <GradesList />
            </div>
        )
    }
}
