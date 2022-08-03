import React from 'react';
import { connect } from 'react-redux';
import ListsUI from './components';
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
    handleOnSubmit = event => {
        event.preventDefault();

        const { topicId, createDispatch } = this.props;
        const list = document.querySelector('#listInput')?.value;

        if (list) {
            createDispatch(generateId(), topicId, list);
        }
    }

    render() {
        const { lists, topicId, setListDispatch, archiveDispatch, deleteDispatch } = this.props;

        return (
            <ListsUI
                topicId={topicId}
                lists={lists}
                handleOnSubmit={this.handleOnSubmit}
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
