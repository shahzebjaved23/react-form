import React, { Component } from 'react';
import $ from 'jquery';

class Form extends Component {
	constructor(props) {
	    super(props);
		this.state = {
			countries: []
		};
	}

	getCountries(){
		console.log("get countries called");
		$(this.refs.spinner).show();
		$.getJSON('https://restcountries.eu/rest/v2/all',function(data){
			this.setState({
				countries: data
			});
			$(this.refs.spinner).hide();
		}.bind(this))
	}

	handleSubmit(e){
		e.preventDefault();

		$(this.refs.spinner).show();
		var sendData = {
			ContactChanell: "contact page",
			email: this.refs.email.value,
			phoneNumber: this.refs.phoneNumber.value,
			companyName: this.refs.companyName.value,
			contactName: this.refs.contactName.value,
			countryCode: this.refs.countryCode.value
		}

		$.ajax({
			url: "some.com",
		   	type: 'POST',
		   	data: sendData,
		   	success: function(response) {
		   		$(this.refs.spinner).hide();
		    	alert("message sent");
		   	}.bind(this),
		   	error:function (e){
			    if(e.status == 404) {
			        alert("message failed");
			    }
			    $(this.refs.spinner).hide();
			}.bind(this)
		});	
	}

	componentDidMount(){
		$(this.refs.spinner).hide();
		this.getCountries();
	}

	componentWillMount(){
		this.getCountries();
	}

	render() {
		return (
		  <div>
		  	<img alt="spinner" ref="spinner" src="./4.gif" className="img img-responsive" style={{position: "fixed",zIndex: 999,overflow: "show",margin: "auto",top: 0,left: 0,bottom: 0,right: 0}}/>
		  	<form onSubmit={this.handleSubmit.bind(this)}>
		  		<input name="ContactChanell" value="contact page" type="hidden"/>

		  		<label>Email</label>
		  		<input type="email" ref="email"/>

		  		<label>Phone Number</label>
		  		<input type="text" ref="phoneNumber"/>

		  		<label>Company Name</label>
		  		<input type="text" ref="companyName"/>

		  		<label>Contact Name</label>
		  		<input type="text" ref="contactName"/>

		  		<label>Country</label>
		  		<select ref="countryCode">
		  			{
		  				this.state.countries.map(function(country){
		  					return <option value={country.alpha2Code}>{country.name}</option>
		  				})
		  			}
		  		</select>

		  		<input type="submit"/>


		  	</form>
		  </div>  
		);
	}
}

export default Form;
