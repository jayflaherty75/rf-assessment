import { Link } from "react-router-dom";
import { truncate } from 'lib/helpers';
import EntryField from 'modules/Shared/flowbite/entry-field';
import {
    Table,
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import XIcon from 'modules/Shared/icons/x';

const TopicsUI = ({
    topics,
    topicValue,
    handleOnChange,
    handleOnSubmit,
    setTopicDispatch,
    deleteDispatch
}) => {
    const ids = Object.keys(topics);

    return (
        <div>
            <EntryField
                description="New Topic"
                buttonText="Create"
                name="topic"
                value={topicValue}
                onSubmit={handleOnSubmit}
                onChange={handleOnChange}
            />
            <Table>
                {
                    ids.map(id => (
                        <TableRow key={id}>
                            <TableCellLeft>
                                <Link to="/lists" onClick={() => setTopicDispatch(id)}>{truncate(topics[id].name, 30)}</Link>
                            </TableCellLeft>
                            <TableCellRight>
                                <div onClick={() => deleteDispatch(id)}><XIcon/></div>
                            </TableCellRight>
                        </TableRow>
                    ))
                }
            </Table>
        </div>
    );
};

export default TopicsUI;
