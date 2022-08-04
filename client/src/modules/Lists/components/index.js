import { useState } from 'react';
import PropTypes from 'prop-types';
import Switch, { Case, Default } from 'modules/Shared/logic/switch';
import Tabs from 'modules/Shared/flowbite/tabs';
import ListTable from './list-table';
import ArchiveTable from './archive-table';

const tabs = [
    { description: 'Active', name: 'active' },
    { description: 'Archive', name: 'archive' },
];

const ListsUI = ({
    lists,
    inputRef,
    handleOnSubmit,
    setListDispatch,
    archiveDispatch,
    deleteDispatch
}) => {
    const [ tab, setTab ] = useState(0);

    return (
        <>
            <Tabs tabs={tabs} select={tab} onSelect={setTab} />
            <Switch exp={tabs[tab]?.name}>
                <Case value="active">
                    <ListTable
                        lists={lists}
                        inputRef={inputRef}
                        handleOnSubmit={handleOnSubmit}
                        setListDispatch={setListDispatch}
                        archiveDispatch={archiveDispatch}
                    />
                </Case>
                <Case value="archive">
                    <ArchiveTable
                        lists={lists}
                        setListDispatch={setListDispatch}
                        deleteDispatch={deleteDispatch}
                    />
                </Case>
                <Default>Invalid tab</Default>
            </Switch>
        </>
    );
};

ListsUI.propTypes = {
    lists: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        topicId: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        keys: PropTypes.array.isRequired,
        isArchived: PropTypes.bool.isRequired,
        created: PropTypes.string.isRequired,
        updated: PropTypes.string.isRequired
    })
    ),
    handleOnSubmit: PropTypes.func.isRequired,
    setListDispatch: PropTypes.func.isRequired,
    archiveDispatch: PropTypes.func.isRequired,
    deleteDispatch: PropTypes.func.isRequired
};

export default ListsUI;
