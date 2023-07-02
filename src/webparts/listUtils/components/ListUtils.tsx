import * as React from 'react';
import styles from "./ListUtils.module.scss";
import "../../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { IListUtilsProps } from './IListUtilsProps';
import { GlobalSPContext } from "../GlobalSPContext";
import ListsInfo from './ListsInfo/ListsInfo';
import Header from './Header/Header';
import ListItems from './listItems/ListItems';

export default class ListUtils extends React.Component<IListUtilsProps, {}> {
  public render(): React.ReactElement<IListUtilsProps> {

    return (
      <GlobalSPContext.Provider value={this.props.context}>
        <div className={styles.listUtils}>
          <Router>
          <Header />
          <Routes>
            <Route path="/" element={<ListsInfo />} />
            <Route path="/items" element={<ListItems />} />
          </Routes>
        </Router>
        </div>
      </GlobalSPContext.Provider>
    );
  }
}
