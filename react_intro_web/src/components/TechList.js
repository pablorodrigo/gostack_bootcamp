import React, {Component} from "react";

import TechItem from "./TechItem";

class TechList extends Component {

    state = {
        newTech: '',
        techs: []
    };

    // executed when the component is display
    componentDidMount() {

        // recovery data saved
        const techs = localStorage.getItem('techs')
        if (techs){
            this.setState({techs: JSON.parse(techs)})
        }
    }

    // executed when there is a change at props or states
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.state.techs){
            localStorage.setItem('techs', JSON.stringify(this.state.techs))
        }
    }

    // executed when the component does not exist anymore
    componentWillUnmount() {
    }

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