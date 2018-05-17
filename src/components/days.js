import React from 'react';

//export const Days = (props) => (
// <!-- <p>{props.name}</p> -->
export const Days = ({name}) => (
	<div className="days-container">
		
		<p>{name.map((d, i) => 
				<React.Fragment key={i}>
				<span >
					{d.day}
				</span><br />	
				</React.Fragment>
		)}</p>
	</div>

)

Days.defaultProps = {name : [
				{day: 'Mon'},
				{day: 'Tue'},
				{day: 'Wed'},
				{day: 'Thur'},
				{day: 'Fri'},
				{day: 'Sat'},
				{day: 'Sun'}				
]}