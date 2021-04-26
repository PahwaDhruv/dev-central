import React from 'react'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const Alert = (props) => {
    const {alerts} = props;
    return (
        <div>
            {
                alerts !== null && alerts.length > 0 && alerts.map(alert => (
                    <div key={alert.id} className={`alert alert-${alert.type}`}>
                        {alert.text}
                    </div>
                ))
            }
        </div>
    )
}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}
const mapStateToProps = (state) => {
    return {
        alerts: state.alert.alerts
    }
}
export default connect(mapStateToProps)(Alert)
