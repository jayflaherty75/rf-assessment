import React from 'react';
import { connect } from 'react-redux';
import { Outlet } from "react-router-dom";
import Header from './components/header';
import {
  selectIsInitialized,
  selectCurrentTopic,
  selectCurrentList
} from './selectors';
import { selectTopicName } from 'modules/Topics/selectors';
import { selectListTitle } from 'modules/Lists/selectors';

import './index.css';

const App = ({ isInitialized, topicId, listId, topicName, listTitle }) => {
  return isInitialized ? (
      <div className="App">
        <Header
          topicId={topicId}
          listId={listId}
          topicName={topicName}
          listTitle={listTitle}
        />
        <br/>
        <div><Outlet /></div>
      </div>
  ) : null;
};

const mapStateToProps = state => {
  const isInitialized = selectIsInitialized(state);
  const topicId =  selectCurrentTopic(state);
  const listId = selectCurrentList(state);
  const topicName = selectTopicName(state, topicId);
  const listTitle = selectListTitle(state, listId);

  return { isInitialized, topicId, listId, topicName, listTitle };
}

export default connect(mapStateToProps)(App);
