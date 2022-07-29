import React from 'react';
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

    }

    handleOnTabSelect = select => {
        this.setState({
			currentTab: select
		});
    }

    render() {
        const { currentTab } = this.state;

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
                                name="tasks"
                                value={this.state.list}
                                onSubmit={this.handleOnSubmit}
                                onChange={this.handleOnChange}
                            />
                            <Table>
                                <TableRow>
                                    <TableCellLeft>General</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><CheckIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Task List Project</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><CheckIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>No Regerts</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><CheckIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things not to forget</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><CheckIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things I forgot</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><CheckIcon/></TableCellRight>
                                </TableRow>
                            </Table>
                        </div>
                    ) : (
                        <div>
                            <Table>
                                <TableRow>
                                    <TableCellLeft>General</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><XIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Task List Project</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><XIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>No Regerts</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><XIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things not to forget</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><XIcon/></TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things I forgot</TableCellLeft>
                                    <TableCell><ArrowUpIcon /></TableCell>
                                    <TableCellRight><XIcon/></TableCellRight>
                                </TableRow>
                            </Table>
                        </div>
                    )
                }
            </div>
        );
    }
};

export default TasksPage;
