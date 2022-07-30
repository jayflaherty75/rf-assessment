import React from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import EntryField from 'modules/Shared/flowbite/entry-field';
import {
    Table,
    TableRow,
    TableCellLeft,
    TableCellRight,
} from 'modules/Shared/flowbite/table';
import XIcon from 'modules/Shared/icons/x';
import { generateId, cropStr } from 'lib/helpers';
import { selectTopics } from '../selectors';
import {
    actionTopicCreate,
    actionTopicUpdate,
    actionTopicDelete
} from '../actions';
import {
    actionSetTopic,
} from 'modules/App/actions';

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
        event.preventDefault();

        const { createDispatch } = this.props;
        const { topic } = this.state

        if (topic) {
            createDispatch(generateId(), topic);
            this.setState({ topic: '' });
        }

        return false;
    }

    render() {
        const { topics, deleteDispatch, setTopicDispatch } = this.props;
        const ids = Object.keys(topics);

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
                    {
                        ids.map((id, index) => (
                            <TableRow key={index}>
                                <TableCellLeft>
                                    <Link to="/lists" onClick={() => setTopicDispatch(id)}>{cropStr(topics[id].name, 30)}</Link>
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
    }
};

const mapStateToProps = state => ({
	topics: selectTopics(state),
});

const mapDispatchToProps = {
    createDispatch: actionTopicCreate,
    updateDispatch: actionTopicUpdate,
    deleteDispatch: actionTopicDelete,
    setTopicDispatch: actionSetTopic
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	TopicsPage
);
