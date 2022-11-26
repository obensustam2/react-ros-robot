import React, { Component } from "react";
import { Joystick } from 'react-joystick-component';
import Config from "../scripts/config.js"

class Teleoperation extends Component {
    state = {ros: null};

    constructor() {
        super();
        this.init_connection();

        this.handleMove = this.handleMove.bind(this);
        this.handleStop = this.handleStop.bind(this);
    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros(); // window must be used because package is called from index.html
        console.log(this.state.ros);
        
        this.state.ros.on("connection", () => {
            console.log("connection established in Teleop");
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

    handleMove(event){
        console.log("handle move");
        //create ROS publisher cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist"
        });
        //create twist message
        var twist = new window.ROSLIB.Message({
            linear:{
                x: event.y / 100,
                y: 0,
                z: 0,
            },
            angular:{
                x: 0,
                y: 0,
                z: -event.x / 100,
            },
        });
        //publish the message
        cmd_vel.publish(twist)
    }

    handleStop(event){
        console.log("handle stop");
        //create ROS publisher cmd_vel
        var cmd_vel = new window.ROSLIB.Topic({
            ros: this.state.ros,
            name: Config.CMD_VEL_TOPIC,
            messageType: "geometry_msgs/Twist"
        });
        //create twist message
        var twist = new window.ROSLIB.Message({
            linear:{
                x: 0,
                y: 0,
                z: 0,
            },
            angular:{
                x: 0,
                y: 0,
                z: 0,
            },
        });
        //publish the message
        cmd_vel.publish(twist)
    }


    render() {
        return (
            <div>
                <Joystick 
                    size={100} 
                    sticky={true} 
                    baseColor="#EEEEEE" 
                    stickColor="#BBBBBB" 
                    move={this.handleMove} 
                    stop={this.handleStop}>
                </Joystick>
            </div>)
    }
}

export default Teleoperation;