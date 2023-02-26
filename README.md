## Installations
```bash
sudo apt-get install ros-noetic-rosbridge-server
sudo apt-get install ros-noetic-turtlebot3*
npm install roslib
npm install three
```

## App Creation
```bash
npx create-react-app react-ros-robot
```

## App Usage 
```bash
npm start
roslaunch rosbridge_server rosbridge_websocket.launch
roslaunch turtlebot3_gazebo turtlebot3_world.launch
roslaunch turtlebot3_navigation turtlebot3_navigation.launch map_file:=/home/oben-n/react-ros-robot/src/maps/map.yaml
```

## Information
### EventEmitter

- The EventEmitter is a module that facilitates communication/interaction between objects in Node. EventEmitter is at the core of Node asynchronous event-driven architecture. Many of Node's built-in modules inherit from EventEmitter including prominent frameworks like Express. js


### roslibjs

- roslibjs is the core JavaScript library for interacting with ROS from the browser. It uses WebSockets to connect with rosbridge and provides publishing, subscribing, service calls, actionlib, TF, URDF parsing, and other essential ROS functionality. roslibjs is developed as part of the Robot Web Tools effort.
http://wiki.ros.org/roslibjs


### rosbridge_suite

- Rosbridge provides a JSON API to ROS functionality for non-ROS programs. There are a variety of front ends that interface with rosbridge, including a WebSocket server for web browsers to interact with. Rosbridge_suite is a meta-package containing rosbridge, various front end packages for rosbridge like a WebSocket package, and helper packages.
https://wiki.ros.org/rosbridge_suite


### rosbridge_server

- Rosbridge server is part of the rosbridge_suite of packages, providing a WebSocket transport layer. A WebSocket is a low-latency, bidirectional communication layer between clients (web browsers) and servers. By providing a WebSocket connection, rosbridge server allows webpages to talk ROS using the rosbridge protocol.
Rosbridge server creates a WebSocket connection and passes any JSON messages from the WebSocket to rosbridge_library, so rosbridge library can convert the JSON strings into ROS calls. The reverse also happens, with rosbridge library converting any ROS responses into JSON, then passing it to rosbridge server to send over the WebSocket connection.
http://wiki.ros.org/rosbridge_server


### ros2djs

- ros2djs is the standard JavaScript 2D visualization manager for ROS. It is build ontop of roslibjs and utilizes the power of EaselJS. Many standard ROS features like maps are included as part of this library. ros2djs is developed as part of the Robot Web Tools effort.
http://wiki.ros.org/ros2djs


### nav2djs

- nav2djs is a tool that allows for an easy way to display and interact with a robots autonomous navigation capabilities. The main widget renders an image of the robot's internal map (streamed as a nav_msgs/OccupancyGrid message) on an HTML5 canvas element, as well as a icon displaying the robot's current position on the map. Furthermore, users can send navigation goals to the robot by double clicking a location on the map. This widget requires the robot_pose_publisher node to be running. nav2djs is developed as part of the Robot Web Tools effort.
http://wiki.ros.org/nav2djs