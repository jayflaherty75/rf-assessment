import { useState } from 'react';
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

const filterListIdsInTopic = (lists, topicId) => id => lists[id].topicId === topicId;

const ListsUI = ({
    topicId,
    lists,
    handleOnSubmit,
    setListDispatch,
    archiveDispatch,
    deleteDispatch
}) => {
    const [ tab, setTab ] = useState(0);
    const [ listValue, setListValue ] = useState('');
    const ids = Object.keys(lists).filter(filterListIdsInTopic(lists, topicId));

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
                            onChange={e => setListValue(e.target.value)}
                            onSubmit={e => {
                                handleOnSubmit(e);
                                setListValue('');
                                return false;
                            }}
                        />
                        <Table>
                            <For data={ids.filter(id => !lists[id].isArchived)}>
                                <ListsTableRow {...{ lists, setListDispatch, archiveDispatch }} />
                            </For>
                        </Table>
                    </>
                </Case>
                <Case value="archive">
                    <Table>
                        <For data={ids.filter(id => lists[id].isArchived)}>
                            <ArchiveTableRow {...{ lists, setListDispatch, deleteDispatch }} />
                        </For>
                    </Table>
                </Case>
                <Default>Invalid tab</Default>
            </Switch>
        </>
    );
};

export default ListsUI;
