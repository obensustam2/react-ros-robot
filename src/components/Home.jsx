import React, { Component } from "react";
import Connection from "./Connection.jsx";
import RobotState from "./RobotState.jsx";
import Teleoperation from "./Teleoperation.jsx";
import Map from "./Map.jsx";
import {Row, Col, Container} from "react-bootstrap"

class Home extends Component {
    state = {};

    render() {
        return (
            <div>
                <Container>
                    <h1 className="text-center mt-3">Robot Control Page</h1>
                    <Row>
                        <Col>
                            <Connection/>
                        </Col>   
                    </Row>
                

                    <Row>
                        <Col>
                            <Teleoperation/>
                        </Col> 
                    </Row>


                    <Row>
                        <Col>
                            <RobotState/>
                        </Col>

                        <Col>
                            <h1>Map</h1>
                            <Map/>
                        </Col>  
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Home;