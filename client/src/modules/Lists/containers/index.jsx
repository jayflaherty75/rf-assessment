import React from 'react';
import Tabs from 'modules/Shared/flowbite/tabs';
import EntryField from 'modules/Shared/flowbite/entry-field';
import {
    Table,
    TableRow,
    // TableCell,
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

class ListsPage extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
            list: '',
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
                                name="list"
                                value={this.state.list}
                                onSubmit={this.handleOnSubmit}
                                onChange={this.handleOnChange}
                            />
                            <Table>
                                <TableRow>
                                    <TableCellLeft>General</TableCellLeft>
                                    <TableCellRight>
                                        <ArchiveIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Task List Project</TableCellLeft>
                                    <TableCellRight>
                                        <ArchiveIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>No Regerts</TableCellLeft>
                                    <TableCellRight>
                                        <ArchiveIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things not to forget</TableCellLeft>
                                    <TableCellRight>
                                        <ArchiveIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things I forgot</TableCellLeft>
                                    <TableCellRight>
                                        <ArchiveIcon/>
                                    </TableCellRight>
                                </TableRow>
                            </Table>
                        </div>
                    ) : (
                        <div>
                            <Table>
                                <TableRow>
                                    <TableCellLeft>General</TableCellLeft>
                                    <TableCellRight>
                                        <XIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Task List Project</TableCellLeft>
                                    <TableCellRight>
                                        <XIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>No Regerts</TableCellLeft>
                                    <TableCellRight>
                                        <XIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things not to forget</TableCellLeft>
                                    <TableCellRight>
                                        <XIcon/>
                                    </TableCellRight>
                                </TableRow>
                                <TableRow>
                                    <TableCellLeft>Things I forgot</TableCellLeft>
                                    <TableCellRight>
                                        <XIcon/>
                                    </TableCellRight>
                                </TableRow>
                            </Table>
                        </div>
                    )
                }
            </div>
        );
    }
};

export default ListsPage;
