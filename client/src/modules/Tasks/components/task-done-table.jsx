import For from 'modules/Shared/logic/for';
import { Table } from 'modules/Shared/flowbite/table';
import TaskDoneTableRow from './task-done-table-row';

const TaskDoneTable = ({ tasks, updateIsDoneDispatch, deleteDispatch }) => (
    <Table>
        <For data={tasks.filter(task => task.isDone)}>
            <TaskDoneTableRow {...{updateIsDoneDispatch, deleteDispatch}} />
        </For>
    </Table>
);

export default TaskDoneTable;
