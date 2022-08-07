import { useState } from 'react';
import PropTypes from 'prop-types';
import For from 'modules/Shared/logic/for';
import TopicsTableRow from './topics-table-row';
import EntryField from 'modules/Shared/flowbite/entry-field';
import { Table } from 'modules/Shared/flowbite/table';

const TopicsUI = ({
    topics,
    inputRef,
    handleOnSubmit,
    setTopicDispatch,
    deleteDispatch
}) => {
    const [ topicValue, setTopicValue ] = useState('');

    return (
        <>
            <EntryField
                description="New Topic"
                buttonText="Create"
                name="topic"
                value={topicValue}
                inputRef={inputRef}
                onChange={e => setTopicValue(e.target.value)}
                onSubmit={e => {
                    e.preventDefault();
                    handleOnSubmit();
                    setTopicValue('');
                    return false;
                }}
            />
            <Table>
                <For data={topics}>
                    <TopicsTableRow {...{ setTopicDispatch, deleteDispatch }} />
                </For>
            </Table>
        </>
    );
};

TopicsUI.propTypes = {
    topics: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        created: PropTypes.string.isRequired,
        updated: PropTypes.string.isRequired
    })),
    handleOnSubmit: PropTypes.func.isRequired,
    setTopicDispatch: PropTypes.func.isRequired,
    deleteDispatch: PropTypes.func.isRequired
};

export default TopicsUI;
