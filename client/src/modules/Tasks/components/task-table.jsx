import { useState } from 'react';
import EntryField from 'modules/Shared/flowbite/entry-field';
import For from 'modules/Shared/logic/for';
import { Table } from 'modules/Shared/flowbite/table';
import TaskTableRow from './task-table-row';

const TaskTable = ({ tasks, inputRef, handleOnSubmit, prioritizeDispatch, updateIsDoneDispatch }) => {
    const [ taskValue, setTaskValue ] = useState('');

    return (
        <>
            <EntryField
                description="New Task"
                buttonText="Create"
                name="task"
                value={taskValue}
                inputRef={inputRef}
                onChange={e => setTaskValue(e.target.value)}
                onSubmit={e => {
                    e.preventDefault();
                    handleOnSubmit();
                    setTaskValue('');
                    return false;
                }}
            />
            <Table>
                <For data={tasks.filter(task => !task.isDone)}>
                    <TaskTableRow {...{prioritizeDispatch, updateIsDoneDispatch}} />
                </For>
            </Table>
        </>
    );
};

export default TaskTable;
