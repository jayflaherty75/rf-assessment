import { Link } from "react-router-dom";
import {
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import ArchiveIcon from 'modules/Shared/icons/archive';
import { truncate } from 'lib/helpers';

const ListsTableRow = ({ item, setListDispatch, archiveDispatch }) => (
    <TableRow>
        <TableCellLeft>
            <Link to="/" onClick={() => setListDispatch(item.id)}>{truncate(item.title, 30)}</Link>
        </TableCellLeft>
        <TableCellRight>
            <div onClick={() => archiveDispatch(item.id)}><ArchiveIcon/></div>
        </TableCellRight>
    </TableRow>
);

export default ListsTableRow;
