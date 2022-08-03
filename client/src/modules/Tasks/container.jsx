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
    handleOnSubmit = event => {
        event.preventDefault();

        const { listId, createDispatch } = this.props;
        const task = document.querySelector('#taskInput')?.value;

        if (task) {
            createDispatch(generateId(), listId, task);
        }
    }

    render() {
        const { tasks, listId, updateIsDoneDispatch, prioritizeDispatch, deleteDispatch } = this.props;

        return (
            <TasksUI
                listId={listId}
                tasks={tasks}
                handleOnSubmit={this.handleOnSubmit}
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
