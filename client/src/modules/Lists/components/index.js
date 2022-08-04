import { useState } from 'react';
import PropTypes from 'prop-types';
import ListsTableRow from './list-table-row';
import ArchiveTableRow from './archive-table-row';
import For from 'modules/Shared/logic/for';
import Switch, { Case, Default } from 'modules/Shared/logic/switch';
import Tabs from 'modules/Shared/flowbite/tabs';
import EntryField from 'modules/Shared/flowbite/entry-field';
import { Table } from 'modules/Shared/flowbite/table';

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
    const [ listValue, setListValue ] = useState('');

    return (
        <>
            <Tabs tabs={tabs} select={tab} onSelect={setTab} />
            <Switch exp={tabs[tab]?.name}>
                <Case value="active">
                    <>
                        <EntryField
                            description="New Todo List"
                            buttonText="Create"
                            name="list"
                            value={listValue}
                            inputRef={inputRef}
                            onChange={e => setListValue(e.target.value)}
                            onSubmit={e => {
                                e.preventDefault();
                                handleOnSubmit();
                                setListValue('');
                                return false;
                            }}
                        />
                        <Table>
                            <For data={lists.filter(list => !list.isArchived)}>
                                <ListsTableRow {...{ setListDispatch, archiveDispatch }} />
                            </For>
                        </Table>
                    </>
                </Case>
                <Case value="archive">
                    <Table>
                        <For data={lists.filter(list => list.isArchived)}>
                            <ArchiveTableRow {...{ setListDispatch, deleteDispatch }} />
                        </For>
                    </Table>
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
