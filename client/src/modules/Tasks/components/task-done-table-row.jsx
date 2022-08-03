import {
    TableRow,
    TableCell,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import CheckIcon from 'modules/Shared/icons/check';
import XIcon from 'modules/Shared/icons/x';
import { truncate } from 'lib/helpers';

const TaskDoneTableRow = ({ tasks, item, index, updateIsDoneDispatch, deleteDispatch }) => (
    <TableRow key={item}>
        <TableCellLeft>{truncate(tasks[item].task, 30)}</TableCellLeft>
        <TableCell>
            <div onClick={() => updateIsDoneDispatch(item, false)}><CheckIcon/></div>
        </TableCell>
        <TableCellRight>
            <div onClick={() => deleteDispatch(item)}><XIcon/></div>
        </TableCellRight>
    </TableRow>
);

export default TaskDoneTableRow;
