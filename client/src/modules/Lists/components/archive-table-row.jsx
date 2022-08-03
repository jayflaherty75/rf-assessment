import { Link } from "react-router-dom";
import {
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import XIcon from 'modules/Shared/icons/x';
import { truncate } from 'lib/helpers';

const ArchiveTableRow = ({ lists, item, setListDispatch, deleteDispatch }) => (
    <TableRow>
        <TableCellLeft>
            <Link to="/" onClick={() => setListDispatch(item)}>{truncate(lists[item].title, 30)}</Link>
        </TableCellLeft>
        <TableCellRight>
            <div onClick={() => deleteDispatch(item)}><XIcon/></div>
        </TableCellRight>
    </TableRow>
);

export default ArchiveTableRow;
