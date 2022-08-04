import { useState } from 'react';
import ListsTableRow from './list-table-row';
import For from 'modules/Shared/logic/for';
import EntryField from 'modules/Shared/flowbite/entry-field';
import { Table } from 'modules/Shared/flowbite/table';

const ListTable = ({ lists, inputRef, handleOnSubmit, setListDispatch, archiveDispatch }) => {
    const [ listValue, setListValue ] = useState('');

    return (
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
    );
};

export default ListTable;
