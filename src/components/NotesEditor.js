import React, { Component } from 'react';
import { EditorState, Editor, RichUtils, convertToRaw, convertFromRaw  } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';

class DraftEditor extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorState: this.props.notesAdv === '' ? EditorState.createEmpty() : EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.notesAdv))),
    }
  }
   

  onChange = (editorState) => {
    const contentState = editorState.getCurrentContent();
    console.log('content state: ', convertToRaw(contentState))
    this.saveContent(contentState)
    this.setState({
      editorState,
    });
  }

  saveContent = (content) => {
    this.props.onNotesChange(JSON.stringify(convertToRaw(content)))
  }

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    
    if(newState) {
      this.onChange(newState);
      return 'handled';
    }
    
    return 'not-handled';
  }
  
  onUnderlineClick = () => {
     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
  }
  onBoldClick = () => {
     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }
  onItalicClick = () => {
     this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }
  onUnorderedList = () => {
     this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'unordered-list-item' ));
  }


  

  
  render() {
    return (
      <div>

      <div className="editor">
        <div className="editor__btns--wrapper">
          <div className="editor__btn" onClick={this.onUnderlineClick}>U</div>
          <div className="editor__btn" onClick={this.onBoldClick}>B</div>
          <div className="editor__btn" onClick={this.onItalicClick}>I</div>
          <div className="editor__btn" onClick={this.onUnorderedList}>UL</div>
        </div>
          <Editor
            handleKeyCommand={this.handleKeyCommand}
            editorState={this.state.editorState}
            onChange={this.onChange}
            />
      </div>
         
        
      </div>
    );
  }
}

export default DraftEditor;

{/* <p dangerouslySetInnerHTML={{__html: this.state.notes}} /> */}