import React from 'react';
import List from './List.jsx';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import $ from 'jquery';
import config from '../../config.js';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add-box';

// Component that renders List Items view and ability to add items to the List
var ListContainer = React.createClass({

	// Set up initial state
	getInitialState: function () {
		return {};
	},

	// Tells parent container that a list item has been clicked
	handleClick: function (item) {
		this.props.handleClick(item);
	},

	// Handles the new addition of an list item
	addNewNode: function () {
		// Gets the name of the list item
		var text = $('#newListField').val();
		// Show error if no name is provided
		if (text === "") {
			this.setState({ errors: "This field is required" });
			// Collect the data and posts it to the database
		} else {
			var self = this;
			var data = {
				Key: text,
				Type: 'node'
			};
			if (this.props.parent) {
				data.Parent = this.props.parent.Id;
			}
			$.post({
				url: config.apiHost + 'items',
				data: JSON.stringify(data),
				success: function (result) {
					self.handleClick(result);
				},
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	},

	render: function () {
		var divStyle = {
			display: 'flex',
		};

		var itemStyle = {
			marginLeft: 10,
			width: '100%',
			display: 'inline-block',
			position: 'relative'
		};

		var buttonStyle = {
			display: 'inline-block',
			position: 'relative',
			width: '150px'
		};

		return (
			<Card>
				<List listItems={this.props.nodes} handleClick={this.handleClick} editable={this.props.editable}></List>
				<Divider />
				<div style={divStyle}>
					<TextField id="newListField" style={itemStyle} errorText={this.state.errors} hintText="Hint Text"/>
					<FlatButton label="Add Node" style={buttonStyle} primary={true} onTouchTap={this.addNewNode} />
				</div>
			</Card>
		)
	}
});


export default ListContainer;