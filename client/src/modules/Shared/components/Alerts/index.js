import React from 'react';
import { connect } from 'react-redux';
import Alert from 'modules/Shared/flowbite/alert';
import { actionAlertClose } from './actions';
import { selectAlert } from './selectors';

const Alerts = ({ alert, actionAlertClose }) => {
    const { level, message } = alert;

    return message ? (
        <div style={{ position: 'relative' }}>
            <div style={{ position: 'fixed', bottom: 0, width: '22rem' }}>
                <Alert
                    level={level}
                    message={message}
                    onClick={() => actionAlertClose()}
                />
            </div>
        </div>
    ) : null;
};

const mapStateToProps = state => {
    const alert = selectAlert(state);
  
    return { alert };
}

const mapDispatchToProps = {
    actionAlertClose,
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	Alerts
);
