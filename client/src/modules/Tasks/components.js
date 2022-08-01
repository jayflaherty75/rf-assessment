import EntryField from 'modules/Shared/flowbite/entry-field';
import Tabs from 'modules/Shared/flowbite/tabs';
import {
    Table,
    TableRow,
    TableCell,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import ArrowUpIcon from 'modules/Shared/icons/arrow-up';
import CheckIcon from 'modules/Shared/icons/check';
import XIcon from 'modules/Shared/icons/x';
import { truncate } from 'lib/helpers';

const ACTIVE_TAB = 0
// const ARCHIVE_TAB = 1

const tabs = [
    { description: 'Todo', name: 'todo' },
    { description: 'Done', name: 'done' },
];

const TasksUI = ({
    currentTab,
    listId,
    tasks,
    taskValue,
    handleOnTabSelect,
    handleOnSubmit,
    handleOnChange,
    prioritizeDispatch,
    updateIsDoneDispatch,
    deleteDispatch
}) => {
    const ids = Object.keys(tasks)
        .filter(id => tasks[id].listId === listId)
        .sort((id1, id2) => tasks[id2].order - tasks[id1].order);

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
                            name="task"
                            value={taskValue}
                            onSubmit={handleOnSubmit}
                            onChange={handleOnChange}
                        />
                        <Table>
                            {
                                ids.filter(id => !tasks[id].isDone).map((id, index) => (
                                    <TableRow key={id}>
                                        <TableCellLeft>{truncate(tasks[id].task, 30)}</TableCellLeft>
                                        <TableCell>
                                            {
                                                index > 0 ? (
                                                    <div onClick={() => prioritizeDispatch(id, true)}><ArrowUpIcon /></div>
                                                ) : null
                                            }
                                        </TableCell>
                                        <TableCellRight>
                                            <div onClick={() => updateIsDoneDispatch(id, true)}><CheckIcon/></div>
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
                                ids.filter(id => tasks[id].isDone).map(id => (
                                    <TableRow key={id}>
                                        <TableCellLeft>{truncate(tasks[id].task, 30)}</TableCellLeft>
                                        <TableCell>
                                            <div onClick={() => updateIsDoneDispatch(id, false)}><CheckIcon/></div>
                                        </TableCell>
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

export default TasksUI;
