import React, { Component } from 'react';
import $ from 'jquery';
import countries from './countries.json';

class Form extends Component {

	// class constructor
	constructor(props) {
	    super(props);
	    // sets the initial state
		this.state = {
			countries: [],
			countryCode: null
		};
	}

	// action, to handle the form submission
	handleSubmit(e){
		// prevents the page reload, default for form submission
		e.preventDefault();

		// show the spinner
		$(this.refs.spinner).show();
		
		// prepares the data to be sent, from refs on the form inputs
		var sendData = {
			ContactChanell: "contact page",
			email: this.refs.email.value,
			phoneNumber: this.refs.phoneNumber.value,
			companyName: this.refs.companyName.value,
			contactName: this.refs.contactName.value,
			countryCode: this.state.countryCode
		}

		// makes the ajax call on the jquery object
		$.ajax({
			url: "some.com",
		   	type: 'POST',
		   	data: sendData,
		   	// called when the request is successfull
		   	success: function(response) {
		   		// shows the success message
		   		$(this.refs.success_message).show();
		   		// hides the form
		   		$(this.refs.form).hide();
		   		// hide the spinner
		    	$(this.refs.spinner).hide();
		   	}.bind(this),
		   	// called when the request fails
		   	error:function (e){
		   		// shows the failure message
			    $(this.refs.failure_message).show();
			    // hides the spinner
			    $(this.refs.spinner).hide();
			    // hides the form
			    $(this.refs.form).hide();
			}.bind(this)
		});	
	}

	// life cycle method, gets called after component mounted in the DOM
	// hides the spinnes and messages, so that they are hidden when the page loads
	componentDidMount(){
		// hides the spinner
		$(this.refs.spinner).hide();
		
		// hides the messages
		$(this.refs.success_message).hide();
		$(this.refs.failure_message).hide();
		
		// use an api to get users country, and set it in component state
		$.getJSON("https://ipinfo.io", function(response) {
		    this.setState({
		    	countryCode: response.country
		    })
		}.bind(this))
	}


	render() {
		return (
		  <div>
		  	<div ref="success_message">
			  	<h1>Message Sent Successfully</h1>
			</div>
			
			<div ref="failure_message">
			  	<h1>Message Failed</h1>
			</div>

		  	<img alt="spinner" ref="spinner" src="./4.gif" className="img img-responsive" style={{position: "fixed",zIndex: 999,overflow: "show",margin: "auto",top: 0,left: 0,bottom: 0,right: 0}}/>
		  	
		  	<form ref="form" onSubmit={this.handleSubmit.bind(this)}>
		  		<input name="ContactChanell" value="contact page" type="hidden"/>

		  		<label>Email</label>
		  		<input type="email" ref="email"/>

		  		<label>Phone Number</label>
		  		<input type="text" ref="phoneNumber"/>

		  		<label>Company Name</label>
		  		<input type="text" ref="companyName"/>

		  		<label>Contact Name</label>
		  		<input type="text" ref="contactName"/>

		  		<input type="hidden" ref="countryCode"/>

		  		<input type="submit"/>
		  	</form>
		  </div>  
		);
	}
}

export default Form;
