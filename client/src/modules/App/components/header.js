import React, { useMemo } from 'react';
import Breadcrumb from 'modules/Shared/flowbite/breadcrumb';
import { truncate } from 'lib/helpers';

const link = (name, url, maxLength = 20) => ({
  name: truncate(name, maxLength),
  url
});

const Header = ({ topicId, listId, topicName, listTitle }) => {
  const links = useMemo(() => {
    const result = [];

    topicId && topicName && result.push(link(topicName, '/lists'));
    listId && listTitle && result.push(link(listTitle, '/'));

    return result;
  }, [topicId, listId, topicName, listTitle]);

  return (<Breadcrumb links={links} />);
};

export default Header;
