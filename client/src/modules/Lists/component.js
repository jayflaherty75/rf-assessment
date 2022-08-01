import { Link } from "react-router-dom";
import { truncate } from 'lib/helpers';
import Tabs from 'modules/Shared/flowbite/tabs';
import EntryField from 'modules/Shared/flowbite/entry-field';
import {
    Table,
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import ArchiveIcon from 'modules/Shared/icons/archive';
import XIcon from 'modules/Shared/icons/x';

const ACTIVE_TAB = 0
// const ARCHIVE_TAB = 1

const tabs = [
    { description: 'Active', name: 'active' },
    { description: 'Archive', name: 'archive' },
];

const ListsUI = ({
    currentTab,
    topicId,
    lists,
    listValue,
    handleOnTabSelect,
    handleOnSubmit,
    handleOnChange,
    setListDispatch,
    archiveDispatch,
    deleteDispatch
}) => {
    const ids = Object.keys(lists).filter(id => lists[id].topicId === topicId);

    return (
        <div>
            <Tabs
                tabs={tabs}
                select={currentTab}
                onSelect={handleOnTabSelect}
            />
            {
                currentTab === ACTIVE_TAB ? (
                    <div>
                        <EntryField
                            description="New Todo List"
                            buttonText="Create"
                            name="list"
                            value={listValue}
                            onSubmit={handleOnSubmit}
                            onChange={handleOnChange}
                        />
                        <Table>
                            {
                                ids.filter(id => !lists[id].isArchived).map(id => (
                                    <TableRow key={id}>
                                        <TableCellLeft>
                                            <Link to="/" onClick={() => setListDispatch(id)}>{truncate(lists[id].title, 30)}</Link>
                                        </TableCellLeft>
                                        <TableCellRight>
                                            <div onClick={() => archiveDispatch(id)}><ArchiveIcon/></div>
                                        </TableCellRight>
                                    </TableRow>
                                ))
                            }
                        </Table>
                    </div>
                ) : (
                    <div>
                        <Table>
                            {
                                ids.filter(id => lists[id].isArchived).map(id => (
                                    <TableRow key={id}>
                                        <TableCellLeft>
                                            <Link to="/" onClick={() => setListDispatch(id)}>{truncate(lists[id].title, 30)}</Link>
                                        </TableCellLeft>
                                        <TableCellRight>
                                            <div onClick={() => deleteDispatch(id)}><XIcon/></div>
                                        </TableCellRight>
                                    </TableRow>
                                ))
                            }
                        </Table>
                    </div>
                )
            }
        </div>
    );
};

export default ListsUI;
