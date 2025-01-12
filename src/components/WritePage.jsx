import React, { useState, useRef } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Camera, AlignJustify, Bold, Italic, Underline } from "lucide-react";
import "./WritePage.css";

const WritePage = ({ isMenuOpen }) => {
  const { userId } = useParams(); // Retrieve userId from URL
  const navigate = useNavigate(); // Initialize useNavigate
  const [isDraft, setIsDraft] = useState(false);
  const [content, setContent] = useState(""); // Track content
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(""); // Store image URL directly
  const editorRef = useRef(null); // Ref for contentEditable div

  const handleImageUpload = () => {
    const imageUrl = prompt("Enter the image URL:");
    if (imageUrl && imageUrl.trim()) {
      setImage(imageUrl.trim());
    } else {
      alert("Image URL is required!");
    }
  };

  const applyFormatting = (tag) => {
    document.execCommand(tag, false, null);
  };

  const handleSubmit = async () => {
    if (!userId) {
      alert("User ID is missing in the URL.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Authentication token not found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/write/${userId}`,
        {
          title,
          content,
          imageUrl: image || "",
          isDraft,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Post created successfully:", response.data);
      alert("Post published successfully!");

      // Reset fields after publishing
      setTitle("");
      setContent("");
      setImage("");
      setIsDraft(false);

      // Clear the content editor
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }

      // Redirect to homepage after successful publish
      navigate(`/homepage/${userId}`);
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
      alert("Failed to publish the post. Please try again.");
    }
  };

  return (
    <div className="write-page">
      <div className={`editor ${isMenuOpen ? "shift-right" : ""}`}>
        <input
          type="text"
          placeholder="Add your title"
          className="title-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="toolbar">
          <button className="toolbar-btn" onClick={handleImageUpload}>
            <Camera size={18} className="icon" />
            Add Image
          </button>
          <div className="format-buttons">
            <button
              className="format-btn"
              onClick={() => applyFormatting("bold")}
              title="Bold"
            >
              <Bold size={18} />
            </button>
            <button
              className="format-btn"
              onClick={() => applyFormatting("italic")}
              title="Italic"
            >
              <Italic size={18} />
            </button>
            <button
              className="format-btn"
              onClick={() => applyFormatting("underline")}
              title="Underline"
            >
              <Underline size={18} />
            </button>
            <button
              className="format-btn"
              onClick={() => {
                if (editorRef.current) {
                  editorRef.current.style.textAlign =
                    editorRef.current.style.textAlign === "justify"
                      ? "left"
                      : "justify";
                }
              }}
              title="Justify"
            >
              <AlignJustify size={18} />
            </button>
          </div>
        </div>

        <div
          ref={editorRef}
          className="content-editor"
          contentEditable
          suppressContentEditableWarning
          onInput={() => setContent(editorRef.current.innerHTML)} // Update state with content
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
          <button className="publish-btn" onClick={handleSubmit}>
            Publish
          </button>
          <button
            className="cancel-btn"
            onClick={() => {
              setTitle("");
              setContent("");
              setImage("");
              setIsDraft(false);
              if (editorRef.current) {
                editorRef.current.innerHTML = ""; // Clear content editor on cancel
              }
              navigate(`/homepage/${userId}`); // Redirect to homepage on cancel
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default WritePage;
