import React from 'react';
import { connect } from 'react-redux';
import TasksUI from './components';
import { generateId } from 'lib/helpers';
import {
    actionTaskCreate,
    actionTaskUpdate,
    actionTaskUpdateIsDone,
    actionTaskPrioritize,
    actionTaskDelete
} from './actions';
import { selectCurrentList } from 'modules/App/selectors';
import { selectTasks } from './selectors';

class TasksPage extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
            task: '',
            currentTab: 0
        };
    }

    handleOnChange = event => {
        this.setState({
			[event.target.name]: event.target.value
		});
    }

    handleOnSubmit = event => {
        event.preventDefault();

        const { listId, createDispatch } = this.props;
        const { task } = this.state

        if (task) {
            createDispatch(generateId(), listId, task);
            this.setState({ task: '' });
        }

        return false;
    }

    handleOnTabSelect = select => {
        this.setState({
			currentTab: select
		});
    }

    render() {
        const { currentTab } = this.state;
        const { tasks, listId, updateIsDoneDispatch, prioritizeDispatch, deleteDispatch } = this.props;

        return (
            <TasksUI
                currentTab={currentTab}
                listId={listId}
                tasks={tasks}
                taskValue={this.state.task}
                handleOnTabSelect={this.handleOnTabSelect}
                handleOnSubmit={this.handleOnSubmit}
                handleOnChange={this.handleOnChange}
                updateIsDoneDispatch={updateIsDoneDispatch}
                prioritizeDispatch={prioritizeDispatch}
                deleteDispatch={deleteDispatch}
            />
        );
    }
};

const mapStateToProps = state => ({
	tasks: selectTasks(state),
    listId: selectCurrentList(state)
});

const mapDispatchToProps = {
    createDispatch: actionTaskCreate,
    updateDispatch: actionTaskUpdate,
    updateIsDoneDispatch: actionTaskUpdateIsDone,
    deleteDispatch: actionTaskDelete,
    prioritizeDispatch: actionTaskPrioritize
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TasksPage
);
