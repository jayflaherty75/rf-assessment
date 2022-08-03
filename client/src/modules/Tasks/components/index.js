import { useState } from 'react';
import EntryField from 'modules/Shared/flowbite/entry-field';
import For from 'modules/Shared/logic/for';
import Switch, { Case, Default } from 'modules/Shared/logic/switch';
import Tabs from 'modules/Shared/flowbite/tabs';
import { Table } from 'modules/Shared/flowbite/table';
import TaskTableRow from './task-table-row';
import TaskDoneTableRow from './task-done-table-row';

const tabs = [
    { description: 'Todo', name: 'todo' },
    { description: 'Done', name: 'done' },
];

const filterTaskIdsInList = (tasks, listId) => id => tasks[id].listId === listId;

const sortKeysDesc = tasks => (id1, id2) => tasks[id2].order - tasks[id1].order;

const TasksUI = ({
    listId,
    tasks,
    handleOnSubmit,
    prioritizeDispatch,
    updateIsDoneDispatch,
    deleteDispatch
}) => {
    const [ tab, setTab ] = useState(0);
    const [ taskValue, setTaskValue ] = useState('');
    const ids = Object.keys(tasks)
        .filter(filterTaskIdsInList(tasks, listId))
        .sort(sortKeysDesc(tasks));

    return (
        <>
            <Tabs tabs={tabs} select={tab} onSelect={setTab} />
            <Switch exp={tabs[tab]?.name}>
                <Case value="todo">
                    <>
                        <EntryField
                            description="New Task"
                            buttonText="Create"
                            name="task"
                            value={taskValue}
                            onChange={e => setTaskValue(e.target.value)}
                            onSubmit={e => {
                                handleOnSubmit(e);
                                setTaskValue('');
                                return false;
                            }}
                        />
                        <Table>
                            <For data={ids.filter(id => !tasks[id].isDone)}>
                                <TaskTableRow {...{tasks, prioritizeDispatch, updateIsDoneDispatch}} />
                            </For>
                        </Table>
                    </>
                </Case>
                <Case value="done">
                    <Table>
                        <For data={ids.filter(id => tasks[id].isDone)}>
                            <TaskDoneTableRow {...{tasks, updateIsDoneDispatch, deleteDispatch}} />
                        </For>
                    </Table>
                </Case>
                <Default>Invalid tab</Default>
            </Switch>
        </>
    );
};

export default TasksUI;
