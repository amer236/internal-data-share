import React from 'react';
import List from './List.jsx';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Divider from 'material-ui/Divider';
import IconButton from 'material-ui/IconButton';
import AddIcon from 'material-ui/svg-icons/content/add-box';

var ListContainer = React.createClass({


	getInitialState: function() {
		return {};
	},

	handleClick: function (item){
		this.props.handleClick(item);
	},

	handleTouchTap: function(){
		var text = $('#newListField').val();
		if (text === ""){
			this.setState({ errors: "This field is required"});
		}
		else {
			var self = this;
			var data = {
				Key: text,
				Type: 'node'
			};
			if (this.props.parent){
				data.Parent = this.props.parent.Id;
			}
			$.post({
				url: config.apiHost + 'items',
				data: JSON.stringify(data),
				success: function(result) {
					self.handleClick(result);
				},
				headers: {
					'Content-Type': 'application/json'
				}
			});
		}
	},

	render: function(){
		var textFieldStyle = {
			marginLeft: 10,
			width: '90%'
		};
		var iconButtonStyle = {
			float: 'right'
		};

		return (
			<Card>
				<List listItems={this.props.nodes} handleClick={this.handleClick} editable={this.props.editable}></List>
				<Divider />
				<div>
					<TextField id="newListField" style={textFieldStyle} errorText={this.state.errors} hintText="Hint Text"/>
					<IconButton label="Add" style={iconButtonStyle} onTouchTap={this.handleTouchTap}> <AddIcon/></IconButton>
				</div>
			</Card>
		)
	}
});


export default ListContainer;