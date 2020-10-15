import React, { Component } from 'react'

import Settings from "../components/Settings/Settings";
import GradesList from "../components/Grades/GradesList";
import Navbar from '../components/Navigation/Navbar';

export default class Grades extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <GradesList />
                <Settings />
            </div>
        )
    }
}
