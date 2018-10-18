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
  onOrderedList = () => {
     this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'ordered-list-item' ));
  }


  

  
  render() {
    return (
      <div>

      <div className="editor">
        <div className="editor__btns--wrapper">
          <div className="editor__btn editor__btn--bold" onClick={this.onBoldClick}>B</div>
          <div className="editor__btn editor__btn--italic" onClick={this.onItalicClick}>I</div>
          <div className="editor__btn editor__btn--underline" onClick={this.onUnderlineClick}>U</div>
          <div className="editor__btn editor__btn--unorderedlist" onClick={this.onUnorderedList}>
            <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="4" y1="1.5" x2="17" y2="1.5" stroke="#868686" stroke-width="2"/>
              <line x1="4" y1="6.5" x2="17" y2="6.5" stroke="#868686" stroke-width="2"/>
              <line x1="4" y1="11.5" x2="17" y2="11.5" stroke="#868686" stroke-width="2"/>
              <circle cx="1.5" cy="11.5" r="1.5" fill="#868686"/>
              <circle cx="1.5" cy="6.5" r="1.5" fill="#868686"/>
              <circle cx="1.5" cy="1.5" r="1.5" fill="#868686"/>
            </svg>
          </div>
          <div className="editor__btn editor__btn--orderedlist" onClick={this.onOrderedList}>
          <svg width="17" height="13" viewBox="0 0 17 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.98262 2.46518V2.94568H0.280971V2.46518H0.834998V0.668524L0.229525 1.07799L0 0.635097L0.941846 0H1.44838V2.46518H1.98262Z" fill="#868686"/>
            <path d="M2.32725 2.61978C2.32725 2.50557 2.36023 2.41504 2.42619 2.34819C2.49478 2.27855 2.57525 2.24373 2.66758 2.24373C2.77575 2.24373 2.85754 2.27716 2.91294 2.34401C2.97098 2.40808 3 2.5 3 2.61978C3 2.73677 2.96702 2.83008 2.90107 2.89972C2.83511 2.96657 2.75465 3 2.65967 3C2.5515 3 2.4684 2.96797 2.41036 2.9039C2.35495 2.83705 2.32725 2.74234 2.32725 2.61978Z" fill="#868686"/>
            <path d="M1.95248 7.40404V7.89697H0.0550511V7.40404C0.245895 7.23434 0.391475 7.1037 0.49179 7.01212C0.592105 6.92054 0.702208 6.81414 0.822097 6.69293C0.944433 6.56902 1.03374 6.46936 1.09001 6.39394C1.14629 6.31582 1.194 6.23367 1.23315 6.14747C1.27229 6.05859 1.29187 5.97508 1.29187 5.89697C1.29187 5.77306 1.25272 5.67475 1.17442 5.60202C1.09613 5.52929 0.992144 5.49293 0.862468 5.49293C0.803747 5.49293 0.746249 5.49966 0.689974 5.51313C0.6337 5.52391 0.590882 5.53468 0.561522 5.54545L0.521151 5.56566L0.48445 5.90909H0.099092L0.0807417 5.16162C0.357221 5.05387 0.62636 5 0.888158 5C1.20623 5 1.45213 5.06195 1.62584 5.18586C1.80201 5.30707 1.89009 5.51044 1.89009 5.79596C1.89009 5.93333 1.86807 6.06532 1.82403 6.19192C1.78243 6.31852 1.71148 6.45051 1.61116 6.58788C1.51085 6.72256 1.40442 6.84916 1.29187 6.96768C1.18176 7.0835 1.03496 7.22896 0.851457 7.40404H1.95248Z" fill="#868686"/>
            <path d="M2.37609 7.58182C2.37609 7.47138 2.40667 7.38384 2.46784 7.31919C2.53145 7.25185 2.60608 7.21818 2.69171 7.21818C2.79203 7.21818 2.86788 7.25051 2.91926 7.31515C2.97309 7.3771 3 7.46599 3 7.58182C3 7.69495 2.96942 7.78519 2.90825 7.85253C2.84708 7.91717 2.77246 7.9495 2.68437 7.9495C2.58406 7.9495 2.50699 7.91852 2.45316 7.85657C2.40178 7.79192 2.37609 7.70034 2.37609 7.58182Z" fill="#868686"/>
            <path d="M1.80568 10.7778C1.80568 10.9502 1.76653 11.097 1.68823 11.2182C1.60994 11.3367 1.49617 11.4175 1.34692 11.4606C1.50106 11.4983 1.62462 11.5764 1.7176 11.6949C1.81302 11.8108 1.86073 11.9455 1.86073 12.099C1.86073 12.2579 1.83014 12.3966 1.76898 12.5152C1.71026 12.6337 1.62951 12.7279 1.52675 12.798C1.42644 12.8653 1.31511 12.9152 1.19277 12.9475C1.07289 12.9798 0.944433 12.996 0.807417 12.996C0.667954 12.996 0.530938 12.9785 0.396368 12.9434C0.261799 12.9057 0.162707 12.8694 0.099092 12.8343L0 12.7778L0.154143 12.3333C0.374348 12.4465 0.592106 12.503 0.807417 12.503C0.956666 12.503 1.07166 12.468 1.1524 12.398C1.23315 12.3279 1.27352 12.2256 1.27352 12.0909C1.27352 11.967 1.22825 11.87 1.13772 11.8C1.04719 11.73 0.918742 11.6949 0.752365 11.6949H0.4661V11.2707H0.770716C1.08879 11.2707 1.24783 11.1401 1.24783 10.8788C1.24783 10.7764 1.21235 10.6956 1.14139 10.6364C1.07044 10.5744 0.971347 10.5434 0.844117 10.5434C0.79029 10.5434 0.732792 10.5488 0.671624 10.5596C0.612903 10.5677 0.566415 10.5771 0.532161 10.5879L0.48445 10.604L0.447749 10.9273H0.0623913L0.0440409 10.2202C0.344987 10.1071 0.617796 10.0505 0.862468 10.0505C1.49127 10.0505 1.80568 10.2929 1.80568 10.7778Z" fill="#868686"/>
            <path d="M2.31874 12.6323C2.31874 12.5219 2.34933 12.4343 2.41049 12.3697C2.47411 12.3024 2.54873 12.2687 2.63437 12.2687C2.73468 12.2687 2.81053 12.301 2.86191 12.3657C2.91574 12.4276 2.94266 12.5165 2.94266 12.6323C2.94266 12.7455 2.91207 12.8357 2.8509 12.903C2.78974 12.9677 2.71511 13 2.62703 13C2.52671 13 2.44964 12.969 2.39581 12.9071C2.34443 12.8424 2.31874 12.7508 2.31874 12.6323Z" fill="#868686"/>
            <line x1="4" y1="1.5" x2="17" y2="1.5" stroke="#868686" stroke-width="2"/>
            <line x1="4" y1="6.5" x2="17" y2="6.5" stroke="#868686" stroke-width="2"/>
            <line x1="4" y1="11.5" x2="17" y2="11.5" stroke="#868686" stroke-width="2"/>
          </svg>
          </div>
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