import React, { useState } from 'react';
import axios from 'axios';
import { Camera, AlignJustify, Bold, Italic, Underline } from 'lucide-react';
import './WritePage.css';

const WritePage = ({ isMenuOpen, currentUser }) => {
  const [isDraft, setIsDraft] = useState(false);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [editorRef, setEditorRef] = useState(null);
  const [authorName, setAuthorName] = useState(currentUser ? currentUser.name : ''); // State for author name

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "your_preset_name");

    try {
      const response = await axios.post("http://localhost:5000/api/posts", formData);
      return response.data.secure_url;
    } catch (err) {
      console.error("Error uploading image:", err);
      return null;
    }
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
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          setImage(imageUrl);  // Store the image URL
        }
      }
    };
    input.click();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/posts', {
        title,
        content,
        author: authorName,  // Use the entered or pre-filled author name
        imageUrl: image || "", // Use image URL or leave it blank
        isDraft,
      });
      console.log('Post created successfully:', response.data);
      // Optionally, you can redirect the user or show a success message here
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="write-page">
      <div className={`editor ${isMenuOpen ? 'shift-right' : ''}`}>
        <input
          type="text"
          placeholder="Add your title"
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        {/* Author Name Input */}
        <input
          type="text"
          placeholder="Author Name"
          className="author-input"
          value={authorName}
          onChange={(e) => setAuthorName(e.target.value)} // Allow the user to change the author name
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
          <button className="publish-btn" onClick={handleSubmit}>Publish</button>
          <button className="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
