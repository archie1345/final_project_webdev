import React, { useState } from 'react';
import { Camera, AlignJustify, Bold, Italic, Underline } from 'lucide-react';
import './WritePage.css';
import NavBar from './NavBar';

const WritePage = ({ isMenuOpen, setIsMenuOpen }) => {
  const [isDraft, setIsDraft] = useState(false);
  const [content, setContent] = useState('');
  const [selectedText, setSelectedText] = useState('');
  const [editorRef, setEditorRef] = useState(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    setSelectedText(text);
  };

  const applyFormatting = (format) => {
    const selection = window.getSelection();
    const range = selection.getRangeAt(0);
    const element = document.createElement(format);
    element.textContent = selection.toString();
    range.deleteContents();
    range.insertNode(element);
    setContent(editorRef.innerHTML);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = document.createElement('img');
          img.src = event.target.result;
          img.style.maxWidth = '100%';
          editorRef.appendChild(img);
          setContent(editorRef.innerHTML);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="write-page">
      <NavBar /> {/* Render NavBar at the top */}
      <div className={`editor ${isMenuOpen ? 'shift-right' : ''}`}>
        <input
          type="text"
          placeholder="Add your title"
          className="title-input"
        />
        <div className="toolbar">
          <button className="toolbar-btn" onClick={handleImageUpload}>
            <Camera size={18} className="icon" />
            Add Image
          </button>
          <div className="format-buttons">
            <button
              className="format-btn"
              onClick={() => applyFormatting('strong')}
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button
              className="format-btn"
              onClick={() => applyFormatting('em')}
              title="Italic"
            >
              <Italic size={18} />
            </button>
            <button
              className="format-btn"
              onClick={() => applyFormatting('u')}
              title="Underline"
            >
              <Underline size={18} />
            </button>
            <button
              className="format-btn"
              onClick={() => {
                if (editorRef) {
                  editorRef.style.textAlign =
                    editorRef.style.textAlign === 'justify' ? 'left' : 'justify';
                }
              }}
              title="Justify"
            >
              <AlignJustify size={18} />
            </button>
          </div>
        </div>
        <div
          ref={(ref) => setEditorRef(ref)}
          className="content-editor"
          contentEditable
          onSelect={handleTextSelection}
          onInput={(e) => setContent(e.target.innerHTML)}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="draft-checkbox">
          <input
            type="checkbox"
            id="draft"
            checked={isDraft}
            onChange={(e) => setIsDraft(e.target.checked)}
          />
          <label htmlFor="draft">Draft</label>
        </div>
        <div className="action-buttons">
          <button className="publish-btn">Publish</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default WritePage;