import { useState } from 'react';
import PropTypes from 'prop-types';
import Switch, { Case, Default } from 'modules/Shared/logic/switch';
import Tabs from 'modules/Shared/flowbite/tabs';
import TaskTable from './task-table';
import TaskDoneTable from './task-done-table';

const tabs = [
    { description: 'Todo', name: 'todo' },
    { description: 'Done', name: 'done' },
];

const TasksUI = ({
    tasks,
    inputRef,
    handleOnSubmit,
    prioritizeDispatch,
    updateIsDoneDispatch,
    deleteDispatch
}) => {
    const [ tab, setTab ] = useState(0);

    return (
        <>
            <Tabs tabs={tabs} select={tab} onSelect={setTab} />
            <Switch exp={tabs[tab]?.name}>
                <Case value="todo">
                    <TaskTable
                        tasks={tasks}
                        inputRef={inputRef}
                        handleOnSubmit={handleOnSubmit}
                        prioritizeDispatch={prioritizeDispatch}
                        updateIsDoneDispatch={updateIsDoneDispatch}
                    />
                </Case>
                <Case value="done">
                    <TaskDoneTable
                        tasks={tasks}
                        updateIsDoneDispatch={updateIsDoneDispatch}
                        deleteDispatch={deleteDispatch}
                    />
                </Case>
                <Default>Invalid tab</Default>
            </Switch>
        </>
    );
};

TasksUI.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        listId: PropTypes.string.isRequired,
        task: PropTypes.string.isRequired,
        order: PropTypes.number.isRequired,
        isDone: PropTypes.bool.isRequired,
        created: PropTypes.string.isRequired,
        updated: PropTypes.string.isRequired
    })),
    handleOnSubmit: PropTypes.func.isRequired,
    prioritizeDispatch: PropTypes.func.isRequired,
    updateIsDoneDispatch: PropTypes.func.isRequired,
    deleteDispatch: PropTypes.func.isRequired
};

export default TasksUI;
