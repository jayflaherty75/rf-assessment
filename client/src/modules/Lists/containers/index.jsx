import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
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
import { generateId, cropStr } from 'lib/helpers';
import {
    actionListCreate,
    actionListUpdate,
    actionListArchive,
    actionListDelete
} from '../actions';
import {
    actionSetList,
} from 'modules/App/actions';
import { selectCurrentTopic } from 'modules/App/selectors';
import { selectLists } from '../selectors';

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
        event.preventDefault();

        const { topicId, createDispatch } = this.props;
        const { list } = this.state

        if (list) {
            createDispatch(generateId(), topicId, list);
            this.setState({ list: '' });
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
        const { lists, topicId, deleteDispatch, archiveDispatch, setListDispatch } = this.props;
        const ids = Object.keys(lists).filter(id => lists[id].topicId === topicId);

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
                                {
                                    ids.filter(id => !lists[id].isArchived).map(id => (
                                        <TableRow key={id}>
                                            <TableCellLeft>
                                                <Link to="/" onClick={() => setListDispatch(id)}>{cropStr(lists[id].title, 30)}</Link>
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
                                                <Link to="/" onClick={() => setListDispatch(id)}>{cropStr(lists[id].title, 30)}</Link>
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
    }
};

const mapStateToProps = state => ({
	lists: selectLists(state),
    topicId: selectCurrentTopic(state)
});

const mapDispatchToProps = {
    createDispatch: actionListCreate,
    updateDispatch: actionListUpdate,
    archiveDispatch: actionListArchive,
    deleteDispatch: actionListDelete,
    setListDispatch: actionSetList
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	ListsPage
);
