import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';

class NotesEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: this.props. EditorState.createEmpty(),
    };
    this.onChange = editorState => {
      this.setState({ editorState });
      console.log(editorState);
    };
  }

  render() {
    return <Editor editorState={this.state.editorState} onChange={this.onChange} />;
  }
}

export default NotesEditor;
