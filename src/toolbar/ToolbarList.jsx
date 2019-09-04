import React from 'react';
import PropTypes from 'prop-types';
import some from 'lodash/some';
import { DropdownButton } from 'patternfly-react';
import { ToolbarListItem } from './ToolbarListItem';

// const classNames = require('classnames');

/* FIXME ?
public $onChanges(changesObj: any) {
  if (changesObj.toolbarList) {
    this.isEmpty = this.isToolbarEmpty();
  }
} */

const isToolbarNonEmpty = props =>
  props &&
  props.items &&
  some(props.items, item => !item.hidden);

const isToolbarEnabled = props =>
  props &&
  props.enabled &&
  props.items &&
  some(props.items, item => item.enabled);


const toolbarListTitle = props => (
  <React.Fragment>
    { props.icon && <i className={props.icon} style={{ color: props.color }} /> }
    { props.text }
  </React.Fragment>
);

toolbarListTitle.propTypes = {
  icon: PropTypes.string,
  color: PropTypes.string,
  text: PropTypes.string,
};

export const ToolbarList = (props) => {
  if (!isToolbarNonEmpty(props)) {
    return null;
  }

  return (
    <DropdownButton id={props.id} disabled={!isToolbarEnabled(props)} title={toolbarListTitle(props)}>
      { props.items.filter(i => !i.hidden).map(item => <ToolbarListItem key={item.id} {...item} onClick={props.onClick} />) }
    </DropdownButton>
  );
};

ToolbarList.propTypes = {
  id: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.any),
  onClick: PropTypes.func.isRequired,
  // dropdownClass: PropTypes.string,
  // title: PropTypes.string,
  // icon: PropTypes.string,
  // color: PropTypes.string,
  // text: PropTypes.string,
};
