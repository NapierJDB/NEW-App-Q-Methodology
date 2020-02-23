import React, { useState } from "react";
import axios from "axios";
import ReactDOM from 'react-dom';
import {BrowserRouter as Router,
    Route,
    Link,
    Switch} from 'react-router-dom';
import CreateAnchors from './CreateAnchors';
import StatementCreator from './StatementCreator';


export default class CreateSurvey_1 extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        surveyName: "",
        description: "",
        box1: "",
        box2: "",
        box3: "",
        numberOfStatements: "",
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange= event =>  {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        /*
        Check if values are stored 
        by displaying an alert message
        */
  
        /*alert(
            this.state.surveyName + 
            '\n' + 
            this.state.description +
            '\n' +
            this.state.box1 + 
            '\n' +
            this.state.box2 + 
            '\n' +
            this.state.box3 + 
            '\n' +
            this.state.numberOfStatements
            )*/
  
        event.preventDefault()
  
        /*
        Passing values to store in a database
        */

       /*axios
       .post(LINK GOES HERE, {
         surveyName: this.state.surveyName,
         description: this.state.description,
         box1: this.state.box1,
         box2: this.state.box2,
         box3: this.state.box3,
         numberOfStatements: this.state.numberOfStatements
       })
       .then(function (response) {
         console.log(response);
       })
       .catch(function (error) {
         console.log(error);
       });*/
  
    }

    render() {
        return (
          <div>
            <h1>Create new research</h1>

            <div>
                <h2>Research information</h2>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <input
                        type="text"
                        name="surveyName"
                        placeholder="Research name"
                        surveyName={this.state.surveyName}
                        onChange={this.handleChange}
                        required
                        />
                    </div>

                    <div>
                        <input
                        type="text"
                        name="description"
                        placeholder="Description..."
                        description={this.state.description}
                        onChange={this.handleChange}
                        required
                        />       
                    </div>

                    <div>
                        <input
                        type="text"
                        name="box1"
                        placeholder="Box 1"
                        box1={this.state.box1}
                        onChange={this.handleChange}
                        required
                        />                   
                    </div>

                    <div>
                        <input
                        type="text"
                        name="box2"
                        placeholder="Box 2"
                        box2={this.state.box2}
                        onChange={this.handleChange}
                        required
                        />                     
                    </div>

                    <div>
                        <input
                        type="text"
                        name="box3"
                        placeholder="Box 3"
                        box3={this.state.box3}
                        onChange={this.handleChange}
                        required
                        />                    
                    </div>

                    <div>
                        <input
                        type="number"
                        name="numberOfStatements"
                        placeholder="Number of statements"
                        numberOfStatements={this.state.numberOfStatements}
                        onChange={this.handleChange}
                        required
                        />                      
                    </div>
                   

                             
                </form>
            </div>

            <div>
                <CreateAnchors />
            </div>

            <div>
                <StatementCreator />
            </div>

            <div>
                <Link to='/CreateAnchors'>
                    <button type="submit">
                        Create survey
                    </button>
                </Link>
            </div>  

            

          </div>
        );
    }
}


  