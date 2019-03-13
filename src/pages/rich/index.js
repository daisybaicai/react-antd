import React, {Component} from 'react'
import { Card, Button, Modal } from 'antd'
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class Rich extends Component {
    state = {
        editorState: EditorState.createEmpty(),
        visible: false
    }
    getText = () => {
        this.setState({
            visible: true
        })
    }
    handleOk = () => {
        this.setState({
            visible: false
        })
    }
    handleCancel= () => {
        this.setState({
            visible: false
        })
    }
    clearContent = () => {
        this.setState({
            editorState: '',
            clear: true
        })
    }
    onEditorChange = (editorContent) => {
        this.setState({
            editorContent
        }); 
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState
        });
    };

    render() {
        const { editorState } = this.state;
        return ( 
            <div>
                <Card title="">
                    <Button type="primary" style={{margin: 10}} onClick={this.clearContent}>清空</Button>
                    <Button type="primary" onClick={this.getText}>生成html</Button>
                </Card>
                <Card title="富文本标题">
                    <Editor
                        editorState={editorState}
                        wrapperClassName="demo-wrapper"
                        editorClassName="demo-editor"
                        onContentStateChange={this.onEditorChange}
                        onEditorStateChange={this.onEditorStateChange}
                    />
                    <Modal
                        title="生成的HTML"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <p> {draftjs(this.state.editorContent)} </p>
                    </Modal>
                </Card>
            </div>
        )
    }
}

export default Rich