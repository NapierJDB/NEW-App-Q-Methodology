import React from "react";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
    useHistory,
    withRouter,
    Redirect,
    MemoryRouter
} from 'react-router-dom';


export default class Debrief extends React.Component {

    constructor() {
        super();

        this.state = {
            agreed: false,
            researchToken: localStorage.getItem('RE_TOKEN'),
            privacyStatement: localStorage.getItem('RE_PRIVACY'),
            results: [],
            researchID: localStorage.getItem('RE_ID'),
            email: "",
            negative: [],
            neutral: [],
            positive: [],
            statements: [],
            testArray: {

                researchID: 123, 
                statements:[

                    {markerNum:1, statement:1},
                    {markerNum:2, statement:2}
                ], 
                email:"test@email.com"
            },

            array: [],
            array2: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.results = this.results.bind(this);

    }

    handleCheckboxChange = (e) => {
        this.setState(previousState => { 
            return {agreed: !previousState.agreed}
            })
            
        localStorage.setItem('PARTICIPANT_EMAIL', this.state.email);
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        })
      }

    results(){
        let negative = localStorage.getItem('NEGATIVE_RESULTS');
        let neutral = localStorage.getItem('NEUTRAL_RESULTS');
        let positive = localStorage.getItem('POSITIVE_RESULTS');
        this.state.negative = JSON.parse(negative);
        this.state.neutral = JSON.parse(neutral);
        this.state.positive = JSON.parse(positive);
        //console.log(this.state.negative);

        this.setState({
            results: [this.state.negative + this.state.neutral + this.state.positive]
        }, 
            () => {
                //console.log(this.state.results)
            })

        console.log(this.state.negative);
        console.log(this.state.neutral);
        console.log(this.state.positive);

        //const statementObj2 = Object.assign(this.state.negative, this.state.neutral, this.state.positive);
        //console.log(statementObj2);

        //const statementObj = this.state.negative;
        
        this.state.statements = this.state.negative.concat(this.state.neutral, this.state.positive);
        console.log(this.state.statements);
        
        
        const obj = {researchID: this.state.researchID,                   
                     statements: this.state.statements,
                     email:this.state.email};

         this.state.array = [...this.state.array, obj];
         console.log(this.state.array);

         const obj2 = {array: this.state.array}
         this.state.array2 = [...this.state.array2, obj2];
         console.log(this.state.array2);

         fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/sendResults', {

      method: 'POST',
      headers: {
        'Authorization': this.state.researchToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'researchID': this.state.researchID,
        'array': obj
      })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          console.log(data.message);
      })


        

    
    //    .then((data) => {
    //      console.log(data);

    //      this.state.error = data.error;
        
    //      if (this.state.error == false) {
    //        this.setState({ Redirect: true });
    //      }
    //      else {
    //        alert("Upps...\nIt looks like this survey already exist!")
    //      }


    //    })
      .catch(function (error) {
        console.log(error);
      });


         //this.sendResults();
        
    }

    sendResults(){
        fetch('https://soc-web-liv-60.napier.ac.uk/API/public/api/user/sendResults', {

      method: 'POST',
      headers: {
        'Authorization': this.state.researchToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'researchID': this.state.researchID,
        'array': this.state.array2 
      })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
          console.log(data.message);
      })


        

    
    //    .then((data) => {
    //      console.log(data);

    //      this.state.error = data.error;
        
    //      if (this.state.error == false) {
    //        this.setState({ Redirect: true });
    //      }
    //      else {
    //        alert("Upps...\nIt looks like this survey already exist!")
    //      }


    //    })
      .catch(function (error) {
        console.log(error);
      });

    }

    //      QJ5921

    render() {

        let btn_style = this.state.agreed ? 'space button enabled' : 'space button disabled';

        return (
            <div className ='TextCenter'>
                <h1>Consent Form</h1>
                <p>Please provide email address</p>
                <form>
                    <div>
                        <input className="space textbox"
                            type="email"
                            name="email"
                            placeholder="Email address"
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                </form>
                <p>Please read and accept the terms and conditions</p>
                <br></br>
                <textarea className='policyTextbox'>
                    {this.state.privacyStatement}
                </textarea>
                <br></br>
                <p>I accept the terms and conditions 
                    <input 
                    name ="agree"
                    type="Checkbox"
                    value={this.state.agreed}
                    onChange={this.handleCheckboxChange}
                    />
                </p>
                <Link to={'/End'}>
                    <button
                        className = 'space button button3'>Disagree
                    </button>
                </Link>
                
                {/* <Link to={'/Complete'}> */}
                  <button 
                    onClick={this.results}
                    name=""
                    type="submit" 
                    className = {btn_style}
                    disabled={!this.state.agreed}
                    >
                      Agree
                  </button>
                {/* </Link> */}
            </div>
        )

    }
   
}