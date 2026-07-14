import React, { useState, useEffect } from 'react';
import { X, Upload, CheckCircle, AlertCircle, UploadCloud, FileText, BookOpen, GraduationCap } from 'lucide-react';
import { getApiUrl } from '../config';
import './StudentContributionModal.css';

const EXAM_TYPES = [
  { value: 'mid', label: 'Mid Term' },
  { value: 'final', label: 'Final Exam' }
];

const CONTENT_TYPES = [
  { value: 'handnote', label: 'Handnote' },
  { value: 'pdf', label: "Sir's PDF" },
  { value: 'slides', label: 'Slides' },
  { value: 'topper-note', label: 'Topper Note' },
  { value: 'suggestion', label: 'Suggestion' },
  { value: 'pq-solve', label: 'Prev. Question Solve' }
];

const StudentContributionModal = ({ isOpen, onClose, course, segment }) => {
  const [examType, setExamType] = useState('mid');
  const [contentType, setContentType] = useState('handnote');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null); // { type: 'success'|'error', text }

  const courseNames = {
    eee: 'EEE-2421',
    ca: 'CSE-3523 (CA)',
    compiler: 'CSE-3527 (Compiler)',
    sad: 'CSE-3611 (SAD)'
  };

  useEffect(() => {
    if (isOpen) {
      const activeCourse = courseNames[course] || course.toUpperCase();
      const activeType = CONTENT_TYPES.find(t => t.value === contentType)?.label || 'Material';
      setTitle(`${activeCourse} - Segment ${segment} - ${activeType}`);
      setStatus(null);
    }
  }, [isOpen, course, segment, contentType]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setStatus({ type: 'error', text: 'Please select at least one file to upload.' });
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append('course', course);
    formData.append('examType', examType);
    formData.append('segment', segment);
    formData.append('contentType', contentType);
    formData.append('title', title);
    formData.append('description', description);
    selectedFiles.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl('/api/materials'), {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });

      const data = await res.json();
      if (res.ok) {
        setStatus({ type: 'success', text: 'Notes submitted successfully! A moderator will review it shortly.' });
        setSelectedFiles([]);
        setDescription('');
      } else {
        setStatus({ type: 'error', text: data.message || 'Submission failed.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contrib-modal-overlay">
      <div className="contrib-modal-content">
        {/* Header */}
        <div className="contrib-modal-header">
          <div>
            <h3><UploadCloud size={20} style={{ display: 'inline-block', marginRight: '0.5rem', verticalAlign: 'middle', color: '#e52e71' }} /> Contribute Academic Notes</h3>
            <p>Help your peers by sharing verified notes for Segment {segment}</p>
          </div>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        {status?.type === 'success' ? (
          <div className="success-state">
            <CheckCircle size={56} className="success-icon" />
            <h4>Thank You for Contributing!</h4>
            <p>{status.text}</p>
            <button className="done-btn" onClick={onClose}>Close Window</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="contrib-form">
            {status?.type === 'error' && (
              <div className="status-banner error">
                <AlertCircle size={16} /> <span>{status.text}</span>
              </div>
            )}

            <div className="form-row">
              <div className="form-col">
                <label><FileText size={13} style={{ display: 'inline-block', marginRight: '0.3rem', verticalAlign: 'middle' }} /> Exam Term</label>
                <select value={examType} onChange={(e) => setExamType(e.target.value)}>
                  {EXAM_TYPES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                </select>
              </div>

              <div className="form-col">
                <label><BookOpen size={13} style={{ display: 'inline-block', marginRight: '0.3rem', verticalAlign: 'middle' }} /> Resource Type</label>
                <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                  {CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>

            <div className="form-col">
              <label><FileText size={13} style={{ display: 'inline-block', marginRight: '0.3rem', verticalAlign: 'middle' }} /> Document Title</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                placeholder="e.g. SAD - Segment 08 - Handnote"
              />
            </div>

            <div className="form-col">
              <label><FileText size={13} style={{ display: 'inline-block', marginRight: '0.3rem', verticalAlign: 'middle' }} /> Extra Details (e.g. topic coverage, specific instructions)</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Write optional notes about this upload..."
                rows={2}
              />
            </div>

            <div className="form-col">
              <label><Upload size={13} style={{ display: 'inline-block', marginRight: '0.3rem', verticalAlign: 'middle' }} /> Upload Files (Images or PDF)</label>
              <div className="file-dropzone">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  accept="image/*,application/pdf"
                  required
                />
                <Upload size={24} />
                <p>Click to select files</p>
                <span>Images and PDFs supported</span>
              </div>
              {selectedFiles.length > 0 && (
                <div className="file-preview-list">
                  <strong>Selected ({selectedFiles.length}):</strong>
                  <ul>
                    {selectedFiles.map((f, i) => <li key={i}>{f.name} ({(f.size/1024/1024).toFixed(2)} MB)</li>)}
                  </ul>
                </div>
              )}
            </div>

            <button type="submit" className="contrib-submit-btn" disabled={loading}>
              {loading ? 'Uploading submission...' : 'Submit Note for Review'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default StudentContributionModal;
