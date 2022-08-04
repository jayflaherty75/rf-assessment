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
import { selectTasks } from './selectors';

const filterTaskIdsInList = listId => task => task.listId === listId;
const sortKeysDesc = (task1, task2) => task2.order - task1.order;
const mapTasksToArray = (tasks, listId) => Object.values(tasks)
        .filter(filterTaskIdsInList(listId))
        .sort(sortKeysDesc);

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
            tasks={mapTasksToArray(tasks, listId)}
            inputRef={inputRef}
            handleOnSubmit={handleOnSubmit}
            updateIsDoneDispatch={updateIsDoneDispatch}
            prioritizeDispatch={prioritizeDispatch}
            deleteDispatch={deleteDispatch}
        />
    );
};

const mapStateToProps = state => ({
	tasks: selectTasks(state),
    listId: selectCurrentList(state)
});

const mapDispatchToProps = {
    createDispatch: actionTaskCreate,
    updateIsDoneDispatch: actionTaskUpdateIsDone,
    prioritizeDispatch: actionTaskPrioritize,
    deleteDispatch: actionTaskDelete
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TasksPage
);
