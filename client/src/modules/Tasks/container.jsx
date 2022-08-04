import { useRef } from 'react';
import { connect } from 'react-redux';
import TasksUI from './components';
import { generateId } from 'lib/helpers';
import {
    actionTaskCreate,
    actionTaskUpdateIsDone,
    actionTaskPrioritize,
    actionTaskDelete
} from './actions';
import { selectCurrentList } from 'modules/App/selectors';
import { selectOrderedTasks } from './selectors';

const TasksPage = ({ tasks, listId, createDispatch, updateIsDoneDispatch, prioritizeDispatch, deleteDispatch }) => {
    const inputRef = useRef(null);

    const handleOnSubmit = () => {
        const value = inputRef.current.value;

        if (value) {
            createDispatch(generateId(), listId, value);
        }
    }

    return (
        <TasksUI
            listId={listId}
            tasks={tasks}
            inputRef={inputRef}
            handleOnSubmit={handleOnSubmit}
            updateIsDoneDispatch={updateIsDoneDispatch}
            prioritizeDispatch={prioritizeDispatch}
            deleteDispatch={deleteDispatch}
        />
    );
};

const mapStateToProps = state => {
    const listId = selectCurrentList(state);
    const tasks = selectOrderedTasks(state, listId);
  
    return { tasks, listId };
}

const mapDispatchToProps = {
    createDispatch: actionTaskCreate,
    updateIsDoneDispatch: actionTaskUpdateIsDone,
    prioritizeDispatch: actionTaskPrioritize,
    deleteDispatch: actionTaskDelete
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TasksPage
);
