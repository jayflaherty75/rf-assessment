import React, { useRef } from 'react';
import { connect } from 'react-redux';
import ListsUI from './components';
import { generateId } from 'lib/helpers';
import {
    actionListCreate,
    actionListArchive,
    actionListDelete
} from './actions';
import {
    actionSetList,
} from 'modules/App/actions';
import { selectCurrentTopic } from 'modules/App/selectors';
import { selectLists } from './selectors';

const filterListIdsInTopic = (topicId) => list => list.topicId === topicId;
const mapListsToArray = (lists, topicId) => Object.values(lists)
    .filter(filterListIdsInTopic(topicId));

const ListsPage = ({ lists, topicId, createDispatch, setListDispatch, archiveDispatch, deleteDispatch }) => {
    const inputRef = useRef(null);

    const handleOnSubmit = () => {
        const value = inputRef.current.value;

        if (value) {
            createDispatch(generateId(), topicId, value);
        }
    }

    return (
        <ListsUI
            lists={mapListsToArray(lists, topicId)}
            inputRef={inputRef}
            handleOnSubmit={handleOnSubmit}
            setListDispatch={setListDispatch}
            archiveDispatch={archiveDispatch}
            deleteDispatch={deleteDispatch}
        />
    );
};

const mapStateToProps = state => ({
	lists: selectLists(state),
    topicId: selectCurrentTopic(state)
});

const mapDispatchToProps = {
    createDispatch: actionListCreate,
    archiveDispatch: actionListArchive,
    deleteDispatch: actionListDelete,
    setListDispatch: actionSetList
};
  
export default connect(mapStateToProps, mapDispatchToProps)(
	ListsPage
);
