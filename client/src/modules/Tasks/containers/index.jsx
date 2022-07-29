import React from 'react';
import { connect } from 'react-redux';
import Tabs from 'modules/Shared/flowbite/tabs';
import EntryField from 'modules/Shared/flowbite/entry-field';
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
import { generateId } from 'lib/helpers';
import {
    actionTaskCreate,
    actionTaskUpdate,
    actionTaskUpdateIsDone,
    actionTaskPrioritize,
    actionTaskDelete
} from '../actions';
import { selectCurrentList } from 'modules/App/selectors';

const selectTasks = state => state.tasks;


const ACTIVE_TAB = 0
// const ARCHIVE_TAB = 1

const tabs = [
    { description: 'Todo', name: 'todo' },
    { description: 'Done', name: 'done' },
];

class TasksPage extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
            task: '',
            currentTab: 0
        };
    }

    handleOnChange = event => {
        this.setState({
			[event.target.name]: event.target.value
		});
    }

    handleOnSubmit = event => {
        event.preventDefault();

        const { listId, createDispatch } = this.props;
        const { task } = this.state

        if (task) {
            createDispatch(generateId(), listId, task);
            this.setState({ task: '' });
        }

        return false;
    }

    handleOnTabSelect = select => {
        this.setState({
			currentTab: select
		});
    }

    render() {
        const { currentTab } = this.state;
        const { tasks, listId, updateIsDoneDispatch, prioritizeDispatch, deleteDispatch } = this.props;
        const ids = Object.keys(tasks)
            .filter(id => tasks[id].listId === listId)
            .sort((id1, id2) => tasks[id2].order - tasks[id1].order);

        return (
            <div>
                <Tabs
                    tabs={tabs}
                    select={currentTab}
                    onSelect={this.handleOnTabSelect}
                />
                {
                    currentTab === ACTIVE_TAB ? (
                        <div>
                            <EntryField
                                description="New Todo List"
                                buttonText="Create"
                                name="task"
                                value={this.state.task}
                                onSubmit={this.handleOnSubmit}
                                onChange={this.handleOnChange}
                            />
                            <Table>
                                {
                                    ids.filter(id => !tasks[id].isDone).map((id, index) => (
                                        <TableRow key={id}>
                                            <TableCellLeft>{tasks[id].task}</TableCellLeft>
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
                                            <TableCellLeft>{tasks[id].task}</TableCellLeft>
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
    }
};

const mapStateToProps = state => ({
	tasks: selectTasks(state),
    listId: selectCurrentList(state)
});

const mapDispatchToProps = {
    createDispatch: actionTaskCreate,
    updateDispatch: actionTaskUpdate,
    updateIsDoneDispatch: actionTaskUpdateIsDone,
    deleteDispatch: actionTaskDelete,
    prioritizeDispatch: actionTaskPrioritize
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TasksPage
);
