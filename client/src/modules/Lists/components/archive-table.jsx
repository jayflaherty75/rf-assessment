import ArchiveTableRow from './archive-table-row';
import For from 'modules/Shared/logic/for';
import { Table } from 'modules/Shared/flowbite/table';

const ArchiveTable = ({ lists, setListDispatch, deleteDispatch }) => (
    <Table>
        <For data={lists.filter(list => list.isArchived)}>
            <ArchiveTableRow {...{ setListDispatch, deleteDispatch }} />
        </For>
    </Table>
);

export default ArchiveTable;
