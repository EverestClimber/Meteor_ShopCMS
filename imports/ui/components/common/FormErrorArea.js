import React from 'react';
//antd
import Alert from 'antd/lib/alert';

const FormErrorArea = ({errors}) => {
	return (
		<div style={{marginTop: 15}}>
  			{errors.length > 0 && errors.map(error => {
          		return <Alert key={error} message={error} type="error" />
          	})}
  		</div>
	)
}

export { FormErrorArea }
