import React, {Component} from "react";

class TechList extends Component{

    state = {
      techs: [
          'Node.js',
          'ReactJS',
          'React Native'
      ]
    };

    // method required
    render() {

        console.log(this.state);

        return (
            <ul>
                <li>NodeJS</li>
                <li>ReactJS</li>
                <li>ReactNative</li>
            </ul>
        )
    }

}

export default TechList