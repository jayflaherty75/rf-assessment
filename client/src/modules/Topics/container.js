import React from 'react';
import { connect } from 'react-redux';
import TopicsUI from './component';
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
	constructor (props) {
		super(props);
		this.state = {
            topic: ''
        };
    }

    handleOnChange = event => {
        this.setState({
			[event.target.name]: event.target.value
		});
    }

    handleOnSubmit = event => {
        event.preventDefault();

        const { createDispatch } = this.props;
        const { topic } = this.state

        if (topic) {
            createDispatch(generateId(), topic);
            this.setState({ topic: '' });
        }

        return false;
    }

    render() {
        const { topics, setTopicDispatch, deleteDispatch } = this.props;

        return (
            <TopicsUI
                topics={topics}
                topicValue={this.state.topic}
                handleOnChange={this.handleOnChange}
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
