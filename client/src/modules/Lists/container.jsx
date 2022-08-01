import React from 'react';
import { connect } from 'react-redux';
import ListsUI from './component';
import { generateId } from 'lib/helpers';
import {
    actionListCreate,
    actionListUpdate,
    actionListArchive,
    actionListDelete
} from './actions';
import {
    actionSetList,
} from 'modules/App/actions';
import { selectCurrentTopic } from 'modules/App/selectors';
import { selectLists } from './selectors';

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
        const { lists, topicId, setListDispatch, archiveDispatch, deleteDispatch } = this.props;

        return (
            <ListsUI
                currentTab={currentTab}
                topicId={topicId}
                lists={lists}
                listValue={this.state.list}
                handleOnTabSelect={this.handleOnTabSelect}
                handleOnSubmit={this.handleOnSubmit}
                handleOnChange={this.handleOnChange}
                setListDispatch={setListDispatch}
                archiveDispatch={archiveDispatch}
                deleteDispatch={deleteDispatch}
            />
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
