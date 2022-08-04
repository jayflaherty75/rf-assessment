import React, { useRef } from 'react';
import { connect } from 'react-redux';
import TopicsUI from './components';
import { generateId } from 'lib/helpers';
import { selectTopics } from './selectors';
import {
    actionTopicCreate,
    actionTopicDelete
} from './actions';
import {
    actionSetTopic,
} from 'modules/App/actions';
import { sortByUpdated } from 'lib/helpers';

const mapTopicsToArray = topics => sortByUpdated(Object.values(topics));

const TopicsPage = ({ topics, createDispatch, setTopicDispatch, deleteDispatch }) => {
    const inputRef = useRef(null);

    const handleOnSubmit = () => {
        const value = inputRef.current.value;

        if (value) {
            createDispatch(generateId(), value);
        }
    }

    return (
        <TopicsUI
            topics={mapTopicsToArray(topics)}
            inputRef={inputRef}
            handleOnSubmit={handleOnSubmit}
            setTopicDispatch={setTopicDispatch}
            deleteDispatch={deleteDispatch}
        />
    );
};

const mapStateToProps = state => ({
	topics: selectTopics(state),
});

const mapDispatchToProps = {
    createDispatch: actionTopicCreate,
    deleteDispatch: actionTopicDelete,
    setTopicDispatch: actionSetTopic
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TopicsPage
);
