import React, { useRef } from 'react';
import { connect } from 'react-redux';
import TopicsUI from './components';
import { generateId } from 'lib/helpers';
import { selectOrderedTopics } from './selectors';
import {
    actionTopicCreate,
    actionTopicDelete
} from './actions';
import {
    actionSetTopic,
} from 'modules/App/actions';

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
            topics={topics}
            inputRef={inputRef}
            handleOnSubmit={handleOnSubmit}
            setTopicDispatch={setTopicDispatch}
            deleteDispatch={deleteDispatch}
        />
    );
};

const mapStateToProps = state => ({
	topics: selectOrderedTopics(state),
});

const mapDispatchToProps = {
    createDispatch: actionTopicCreate,
    deleteDispatch: actionTopicDelete,
    setTopicDispatch: actionSetTopic
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TopicsPage
);
