import React, { Component } from "react";
import Config from "../scripts/config.js"

class Map extends Component {

    state = {
        ros: null,
    };

    constructor() {
        super();
        this.view_map = this.view_map.bind(this);

    }

    init_connection(){
        this.state.ros = new window.ROSLIB.Ros(); // window must be used because package is called from index.html
        console.log("Map:" + this.state.ros);
        
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
        this.init_connection();
        console.log("Map: Component Did Mount" + this.state.ros);
        this.view_map();
    }

    view_map(){
        var viewer = new window.ROS2D.Viewer({
            divID: "nav_div",
            width: 640,
            height: 480,
        });

        var navClient = new window.NAV2D.OccupancyGridClientNav({
            ros: this.state.ros,
            rootObject: viewer.scene,
            viewer: viewer,
            serverName: "/move_base",
            withOrientation: true,
        })

    }

    render() {
        return (
            <div>
                <div id = "nav_div">Viewer</div>
            </div>
        );
    }
}

export default Map;