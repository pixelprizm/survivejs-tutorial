import autobind from 'autobind-decorator';
import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
    };
  }

  render() {
    // note that this.renderEdit and this.renderNote don't need @autobind
    //   because those functions aren't stored in any variables.

    if (this.state.editing) {
      return this.renderEdit();
    }

    return this.renderNote();
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
        element.selectionStart = this.props.task.length :
        null
      }
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
    />;
  }

  renderNote() {
    const onDelete = this.props.onDelete;

    return (
      <div onClick={this.edit}>
        <span className="task">{this.props.task}</span>
        {onDelete ? this.renderDeleteButton() : null}
      </div>
    );
  }

  renderDeleteButton() {
    return <button
      className="delete-note"
      onClick={this.props.onDelete}
    >
      x
    </button>;
  }

  @autobind
  edit() {
    this.setState({
      editing: true,
    });
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

    // Exit edit mode.
    this.setState({
      editing: false,
    });
  }
}
