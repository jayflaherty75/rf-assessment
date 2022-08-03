import React from 'react';
import { connect } from 'react-redux';
import TopicsUI from './components';
import { generateId } from 'lib/helpers';
import { selectTopics } from './selectors';
import {
    actionTopicCreate,
    actionTopicUpdate,
    actionTopicDelete
} from './actions';
import {
    actionSetTopic,
} from 'modules/App/actions';

class TopicsPage extends React.Component {
    handleOnSubmit = event => {
        event.preventDefault();

        const { createDispatch } = this.props;
        const topic = document.querySelector('#topicInput')?.value;

        if (topic) {
            createDispatch(generateId(), topic);
        }
    }

    render() {
        const { topics, setTopicDispatch, deleteDispatch } = this.props;

        return (
            <TopicsUI
                topics={topics}
                handleOnSubmit={this.handleOnSubmit}
                setTopicDispatch={setTopicDispatch}
                deleteDispatch={deleteDispatch}
            />
        );
    }
};

const mapStateToProps = state => ({
	topics: selectTopics(state),
});

const mapDispatchToProps = {
    createDispatch: actionTopicCreate,
    updateDispatch: actionTopicUpdate,
    deleteDispatch: actionTopicDelete,
    setTopicDispatch: actionSetTopic
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TopicsPage
);
