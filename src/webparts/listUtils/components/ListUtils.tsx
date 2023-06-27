import * as React from 'react';
import styles from "./ListUtils.module.scss";
import { IListUtilsProps } from './IListUtilsProps';
import { GlobalSPContext } from "../GlobalSPContext";
import ListsInfo from './ListsInfo/ListsInfo';
import Header from './Header/Header';

export default class ListUtils extends React.Component<IListUtilsProps, {}> {
  public render(): React.ReactElement<IListUtilsProps> {

    return (
      <GlobalSPContext.Provider value={this.props.context}>
        <div className={styles.listUtils}>
          <Header />
          <ListsInfo />
        </div>
      </GlobalSPContext.Provider>
    );
  }
}
