import autobind from 'autobind-decorator';
import React from 'react';

export default class Editable extends React.Component {
  render() {
    const {
      value,
      onEdit,
      onValueClick,
      editing,
      ...props
    } = this.props;

    return (
      <div {...props}>
        {editing ? this.renderEdit() : this.renderValue()}
      </div>
    );
  }

  renderEdit() {
    // We deal with blur and input handlers here. These map to DOM events.
    // We also set selection to input end using a callback at a ref.
    // It gets triggered after the component is mounted.
    //
    // We could also use a string reference (i.e., `ref="input") and
    // then refer to the element in question later in the code through
    // `this.refs.input`. We could get the value of the input using
    // `this.refs.input.value` through DOM in this case.
    //
    // Refs allow us to access the underlying DOM structure. They
    // can be using when you need to move beyond pure React. They
    // also tie your implementation to the browser, though.
    return <input type="text"
      ref={
        element => element ?
        element.selectionStart = this.props.value.length :
        null
      }
      autoFocus={true}
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />;
  }

  renderValue() {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.props.onValueClick}>
        <span className="value">{this.props.value}</span>
        {onDelete ? this.renderDeleteButton() : null}
      </div>
    );
  }

  renderDeleteButton() {
    return <button
      className="delete"
      onClick={this.props.onDelete}
    >
      x
    </button>;
  }

  @autobind
  checkEnter(e) {
    // Check if the user hit 'enter' and finish editing if so.
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  @autobind
  finishEdit(e) {
    // `Note` will trigger an optional `onEdit` callback once it
    // has a new value. We will use this to communicate the change to
    // `App`.
    //
    // A smarter way to deal with the default value would be to set
    // it through `defaultProps`.
    //
    // See the *Typing with React* chapter for more information.
    const value = e.target.value;

    // Notify parent of edit
    this.props.onEdit && this.props.onEdit(value);
  }
}
