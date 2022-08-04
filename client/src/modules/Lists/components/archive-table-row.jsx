import { Link } from "react-router-dom";
import {
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import XIcon from 'modules/Shared/icons/x';
import { truncate } from 'lib/helpers';

const ArchiveTableRow = ({ item, setListDispatch, deleteDispatch }) => (
    <TableRow>
        <TableCellLeft>
            <Link to="/" onClick={() => setListDispatch(item.id)}>{truncate(item.title, 30)}</Link>
        </TableCellLeft>
        <TableCellRight>
            <div onClick={() => deleteDispatch(item.id)}><XIcon/></div>
        </TableCellRight>
    </TableRow>
);

export default ArchiveTableRow;
