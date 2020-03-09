import React, {Component} from "react";

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

    // method required
    render() {


        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <ul>
                        {this.state.techs.map(tech => <li key={tech}>{tech}</li>)}
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