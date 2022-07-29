import React from 'react';
import EntryField from 'modules/Shared/flowbite/entry-field';
import {
    Table,
    TableRow,
    // TableCell,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import XIcon from 'modules/Shared/icons/x';

class TopicsPage extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
            topic: ''
        };
    }

    handleOnChange = event => {
        this.setState({
			[event.target.name]: event.target.value
		});
    }

    handleOnSubmit = event => {

    }

    render() {
        return (
            <div>
                <EntryField
                    description="New Topic"
                    buttonText="Create"
                    name="topic"
                    value={this.state.topic}
                    onSubmit={this.handleOnSubmit}
                    onChange={this.handleOnChange}
                />
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
        );
    }
};

export default TopicsPage;
