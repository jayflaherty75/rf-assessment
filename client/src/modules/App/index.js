import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from "react-router-dom";
import Breadcrumb from 'modules/Shared/flowbite/breadcrumb';
import { truncate } from 'lib/helpers';
import {
  selectCurrentTopic,
  selectCurrentList
} from './selectors';
import { selectTopicName } from 'modules/Topics/selectors';
import { selectListTitle } from 'modules/Lists/selectors';

import './index.css';

class App extends React.Component {
  render() {
    const { topicId, listId, topicName, listTitle} = this.props;
    const links = [];

    // Not pretty
    if (topicId) links.push({ name: truncate(topicName, 20), url: '/lists' });
    if (listId) links.push({ name: truncate(listTitle, 20), url: '/' });

    return (
      <div className="App">
        <Breadcrumb links={links} />
        <br/>
        <div><Outlet /></div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const topicId =  selectCurrentTopic(state);
  const listId = selectCurrentList(state);
  const topicName = selectTopicName(state, topicId);
  const listTitle = selectListTitle(state, listId);

  return { topicId, listId, topicName, listTitle };
}

export default connect(mapStateToProps)(App);
