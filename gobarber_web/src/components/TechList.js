import React, {Component} from "react";

import TechItem from "./TechItem";

class TechList extends Component {

    state = {
        newTech: '',
        techs: [
            'Node.js',
            'ReactJS',
            'React Native'
        ]
    };

    // arrow function is required to access 'this' variable
    handleInputChange = e => {

        //console.log(e.target.value);
        this.setState({newTech: e.target.value})

    };

    handleSubmit = e => {
        // avoid update screen
        e.preventDefault();


        this.setState({
            // copy the previous list and create new
            techs: [...this.state.techs, this.state.newTech],
            newTech: ''
        })

        //console.log(this.state.newTech)
    };

    handleDelete = (tech) => {
        //console.log(tech);

        this.setState({
            techs: this.state.techs.filter(techItem => techItem !== tech)
        })

    };

    // method required
    render() {


        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        {this.state.techs.map(tech => (

                            <TechItem key={tech}
                                      tech={tech}
                                      onDelete={() => this.handleDelete(tech)}/>

                        ))}
                    </ul>

                    <input type="text"
                           onChange={this.handleInputChange}
                           value={this.state.newTech}/>

                    <button type="submitte">Enviar</button>
                </form>
            </>
        )
    }

}

export default TechList