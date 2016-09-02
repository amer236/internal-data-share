import React from 'react';
import ListNode from './ListNode.jsx';
import Card from '../Card.jsx';
import FlatButton from 'material-ui/FlatButton';



var ParentContainer = React.createClass({

	getInitialState: function() {
		return {
			parent: null,
			breadcrumbs : [{
				id: "",
				name: "Home"
			}]
		}
	},

	handleClick: function(item,cb) {
		var self = this;
		this.setState({parent: item},function(){
			cb();
		});
		this.state.breadcrumbs.push({
			id : item.Id,
			name: item.Key
		})
	},

	render: function(){
		return (
			<div>
				{
					this.state.breadcrumbs.map( crumb => {
						return <span key={crumb.id}><FlatButton label={crumb.name} onClick={this.breadcrumbClick.bind(this,crumb)}/> ></span>
					})
				}
				<Card editable={this.props.editable} cardData={this.state.parent}/>
			 	<ListNode parent={this.state.parent} handleClick={this.handleClick} editable={this.props.editable}/>

		 	</div>
		)
	},

	breadcrumbClick: function(crumb){ 
		for (var i = this.state.breadcrumbs.length-1; i >= 0; i--){
			if (this.state.breadcrumbs[i].id === crumb.id){
				break;
			}else{
				this.state.breadcrumbs.pop();
			}
		}
		
		var parent = (this.state.breadcrumbs.length ==1) ? null : this.state.breadcrumbs[this.state.breadcrumbs.length -1];
		this.setState({parent: parent})
	}
});



export default ParentContainer;