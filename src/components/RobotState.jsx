import React, { Component } from "react";
import {Row, Col} from "react-bootstrap";
import Config from "../scripts/config.js";
import * as Three from "three";

class RobotState extends Component {
    state = {
        ros: null,
        x:0,
        y:0,
        orientation:0,
        linear_velocity:0,
        angular_velocity:0,
    };

    constructor() {
        super();
        this.init_connection();
    }

    getRobotState(){
        // create pose subscriber
        var pose_subscriber = new window.ROSLIB.Topic({
                ros:this.state.ros,
                name: Config.POSE_TOPIC ,
                messageType: "geometry_msgs/PoseWithCovarianceStamped",
        });

        // create pose callback
        pose_subscriber.subscribe((message) => {
            this.setState({x: message.pose.pose.position.x.toFixed(2)});
            this.setState({y: message.pose.pose.position.y.toFixed(2)});
            this.setState({orientation: this.getOrientataionFromQuaternion(message.pose.pose.orientation).toFixed(2)});
        });
        
        // create velocity subcriber
        var velocity_subscriber = new window.ROSLIB.Topic({
                ros:this.state.ros,
                name: Config.ODOM_TOPIC,
                messageType: "nav_msgs/Odometry",
        });

        // create velocity callback
        velocity_subscriber.subscribe((message) => {
            this.setState({linear_velocity: message.twist.twist.linear.x.toFixed(2)});
            this.setState({angular_velocity: message.twist.twist.angular.z.toFixed(2)});
        });
    }

    getOrientataionFromQuaternion(ros_orientation_quaternion){
        var q = new Three.Quaternion(ros_orientation_quaternion.x, ros_orientation_quaternion.y, 
                                        ros_orientation_quaternion.z, ros_orientation_quaternion.w)
    
        //convert this quaternion to roll, pitch, yaw
        var RPY = new Three.Euler().setFromQuaternion(q);
        
        return RPY["_z"] * (180 / Math.PI);
    };



    init_connection(){
        this.state.ros = new window.ROSLIB.Ros(); // window must be used because package is called from index.html
        console.log(this.state.ros);
        
        this.state.ros.on("connection", () => {
            console.log("connection established in RobotState");
            this.setState({connected: true});
        }); 

        this.state.ros.on("close", () => {
            console.log("here");
            console.log("connection closed!");
            this.setState({connected: false});

            // try to reconnect every 3 seconds
            setTimeout(() => {
                try {
                    this.state.ros.connect(
                        "ws://" + 
                        Config.ROSBRIDGE_SERVER_IP + 
                        ":" +  
                        Config.ROSBRIDGE_SERVER_PORT +
                        ""
                    );
                } catch (error) {
                    console.log("connection problem");
                }
            }, Config.RECONNECTION_TIMER);
        });

        try {
            this.state.ros.connect(
                "ws://" + 
                Config.ROSBRIDGE_SERVER_IP + 
                ":" +  
                Config.ROSBRIDGE_SERVER_PORT +
                ""
            );
        } catch (error) {
            console.log("connection problem");
        }
    }

    componentDidMount(){
        this.getRobotState();
    }

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <h4 className="mt-4">Position</h4>
                        <p className="mt-0">X: {this.state.x}</p>
                        <p className="mt-0">Y: {this.state.y}</p>
                        <p className="mt-0">Orientation: {this.state.orientation}</p>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h4 className="mt-4">Velocity</h4>
                        <p className="mt-0">Linear X: {this.state.linear_velocity}</p>
                        <p className="mt-0">Angular Z: {this.state.angular_velocity}</p>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default RobotState;