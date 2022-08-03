import { Link } from "react-router-dom";
import {
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import ArchiveIcon from 'modules/Shared/icons/archive';
import { truncate } from 'lib/helpers';

const ListsTableRow = ({ lists, item, setListDispatch, archiveDispatch }) => (
    <TableRow>
        <TableCellLeft>
            <Link to="/" onClick={() => setListDispatch(item)}>{truncate(lists[item].title, 30)}</Link>
        </TableCellLeft>
        <TableCellRight>
            <div onClick={() => archiveDispatch(item)}><ArchiveIcon/></div>
        </TableCellRight>
    </TableRow>
);

export default ListsTableRow;
