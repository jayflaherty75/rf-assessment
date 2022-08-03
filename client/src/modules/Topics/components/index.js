import { useState } from 'react';
import For from 'modules/Shared/logic/for';
import TopicsTableRow from './topics-table-row';
import EntryField from 'modules/Shared/flowbite/entry-field';
import { Table } from 'modules/Shared/flowbite/table';
import { sortByUpdated } from 'lib/helpers';

const TopicsUI = ({
    topics,
    handleOnSubmit,
    setTopicDispatch,
    deleteDispatch
}) => {
    const [ topicValue, setTopicValue ] = useState('');
    const ids = sortByUpdated(Object.keys(topics), topics);

    return (
        <>
            <EntryField
                description="New Topic"
                buttonText="Create"
                name="topic"
                value={topicValue}
                onChange={e => setTopicValue(e.target.value)}
                onSubmit={e => {
                    handleOnSubmit(e);
                    setTopicValue('');
                    return false;
                }}
            />
            <Table>
                <For data={ids}>
                    <TopicsTableRow {...{ topics, setTopicDispatch, deleteDispatch }} />
                </For>
            </Table>
        </>
    );
};

export default TopicsUI;
