import { Link } from "react-router-dom";
import {
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import XIcon from 'modules/Shared/icons/x';
import { truncate } from 'lib/helpers';

const TopicsTableRow = ({ topics, item, setTopicDispatch, deleteDispatch }) => (
    <TableRow>
        <TableCellLeft>
            <Link to="/lists" onClick={() => setTopicDispatch(item)}>{truncate(topics[item].name, 30)}</Link>
        </TableCellLeft>
        <TableCellRight>
            <div onClick={() => deleteDispatch(item)}><XIcon/></div>
        </TableCellRight>
    </TableRow>
);

export default TopicsTableRow;
