import If, { Then } from 'modules/Shared/logic/if';
import {
    TableRow,
    TableCell,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import ArrowUpIcon from 'modules/Shared/icons/arrow-up';
import CheckIcon from 'modules/Shared/icons/check';
import { truncate } from 'lib/helpers';

const TaskTableRow = ({ tasks, item, index, prioritizeDispatch, updateIsDoneDispatch }) => (
    <TableRow>
        <TableCellLeft>{truncate(tasks[item].task, 30)}</TableCellLeft>
        <TableCell>
            <If exp={index > 0}>
                <Then>
                    <div onClick={() => prioritizeDispatch(item, true)}><ArrowUpIcon /></div>
                </Then>
            </If>
        </TableCell>
        <TableCellRight>
            <div onClick={() => updateIsDoneDispatch(item, true)}><CheckIcon/></div>
        </TableCellRight>
    </TableRow>
);

export default TaskTableRow;
