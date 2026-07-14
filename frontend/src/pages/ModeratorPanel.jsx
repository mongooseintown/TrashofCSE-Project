import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  FileText, 
  BookOpen, 
  GraduationCap, 
  ChevronRight,
  Sparkles,
  Inbox,
  AlertCircle
} from 'lucide-react';
import { getApiUrl } from '../config';
import './ModeratorPanel.css';

const COURSES = [
  { value: 'eee', label: '⚡ EEE-2421' },
  { value: 'ca', label: '🖥️ CSE-3523 (CA)' },
  { value: 'compiler', label: '💻 CSE-3527 (Compiler)' },
  { value: 'sad', label: '📊 CSE-3611 (SAD)' }
];

const EXAM_TYPES = [
  { value: 'mid', label: '📝 Mid Term' },
  { value: 'final', label: '📋 Final Exam' }
];

const SEGMENTS = ['04', '05', '06', '07', '08'];

const CONTENT_TYPES = [
  { value: 'pdf', label: "📄 Sir's PDF" },
  { value: 'handnote', label: '✍️ Handnote' },
  { value: 'slides', label: '📊 Slides' },
  { value: 'topper-note', label: '🏆 Topper Note' },
  { value: 'suggestion', label: '💡 Suggestion' },
  { value: 'pq-solve', label: '📝 Prev. Question Solve' }
];

const ModeratorPanel = () => {
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'uploads' | 'review'
  const [myUploads, setMyUploads] = useState([]);
  const [pendingQueue, setPendingQueue] = useState([]);
  
  // Upload Form State
  const [course, setCourse] = useState('eee');
  const [examType, setExamType] = useState('mid');
  const [segment, setSegment] = useState('08');
  const [contentType, setContentType] = useState('handnote');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Auto-generate title on dropdown change
  useEffect(() => {
    const activeCourse = COURSES.find(c => c.value === course)?.label.replace(/[⚡🖥️💻📊]\s?/, '').split('(')[0].trim();
    const activeType = CONTENT_TYPES.find(t => t.value === contentType)?.label.replace(/[📄✍️📊🏆💡📝]\s?/, '').trim();
    setTitle(`${activeCourse} - Segment ${segment} - ${activeType}`);
  }, [course, segment, contentType]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch approved uploads
      const resApproved = await fetch(getApiUrl('/api/materials?status=approved'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resApproved.ok) {
        const data = await resApproved.json();
        setMyUploads(data);
      }

      // Fetch pending review queue
      const resPending = await fetch(getApiUrl('/api/materials?status=pending'), {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (resPending.ok) {
        const data = await resPending.json();
        setPendingQueue(data);
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (selectedFiles.length === 0) {
      setMessage({ type: 'error', text: 'Please select at least one file to upload.' });
      return;
    }

    setLoading(true);
    setMessage(null);

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
        setMessage({ type: 'success', text: 'Material uploaded and published successfully!' });
        setSelectedFiles([]);
        setDescription('');
        fetchData();
      } else {
        setMessage({ type: 'error', text: data.message || 'Upload failed.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewAction = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl(`/api/materials/${id}/status`), {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDeleteMaterial = async (id) => {
    if (!window.confirm('Are you sure you want to delete this material?')) return;
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(getApiUrl(`/api/materials/${id}`), {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchData();
      }
    } catch (err) {
      console.error('Failed to delete material:', err);
    }
  };

  return (
    <div className="mod-panel-container">
      {/* Top Banner Header */}
      <div className="mod-panel-header">
        <div>
          <h1>👮 Moderator Control Center</h1>
          <p>Manage, upload notes, review contributions, and curate student resources.</p>
        </div>
        <div className="mod-badge">Moderator Access</div>
      </div>

      {/* Stats Section */}
      <div className="mod-stats-row">
        <div className="stat-card">
          <span className="stat-label">Active Published Notes</span>
          <span className="stat-value">{myUploads.length}</span>
        </div>
        <div className="stat-card urgent">
          <span className="stat-label">Pending Student Submissions</span>
          <span className="stat-value">{pendingQueue.length}</span>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="mod-tabs-row">
        <button 
          className={`tab-btn ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => { setActiveTab('upload'); setMessage(null); }}
        >
          <Upload size={18} /> Upload Notes
        </button>
        <button 
          className={`tab-btn ${activeTab === 'uploads' ? 'active' : ''}`}
          onClick={() => { setActiveTab('uploads'); setMessage(null); }}
        >
          <FileText size={18} /> Published Notes ({myUploads.length})
        </button>
        <button 
          className={`tab-btn ${activeTab === 'review' ? 'active' : ''}`}
          onClick={() => { setActiveTab('review'); setMessage(null); }}
        >
          <Inbox size={18} /> Pending Contributions ({pendingQueue.length})
        </button>
      </div>

      {/* Alert Message */}
      {message && (
        <div className={`mod-alert ${message.type}`}>
          <AlertCircle size={18} /> <span>{message.text}</span>
        </div>
      )}

      {/* Tab Contents: Upload Form */}
      {activeTab === 'upload' && (
        <div className="mod-content-card">
          <h2 className="card-title"><Sparkles size={18} /> Upload New Material</h2>
          <form onSubmit={handleFormSubmit} className="mod-upload-form">
            <div className="form-grid">
              <div className="form-group">
                <label>📚 Select Course</label>
                <select value={course} onChange={(e) => setCourse(e.target.value)}>
                  {COURSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>📂 Select Segment</label>
                <select value={segment} onChange={(e) => setSegment(e.target.value)}>
                  {SEGMENTS.map(s => <option key={s} value={s}>Segment {s}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>📝 Select Exam Term</label>
                <select value={examType} onChange={(e) => setExamType(e.target.value)}>
                  {EXAM_TYPES.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                </select>
              </div>

              <div className="form-group">
                <label>📋 Select Note Type</label>
                <select value={contentType} onChange={(e) => setContentType(e.target.value)}>
                  {CONTENT_TYPES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>📌 Note Title (Auto-generated, editable)</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                placeholder="e.g. SAD - Segment 08 - Handnote"
              />
            </div>

            <div className="form-group">
              <label>📄 Description / Context (Optional)</label>
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                placeholder="Write a brief summary of the contents, e.g. lecture slides or specific topic notes..."
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>📤 Select Files (Images or PDFs)</label>
              <div className="dropzone">
                <input 
                  type="file" 
                  multiple 
                  onChange={handleFileChange} 
                  accept="image/*,application/pdf"
                  required
                />
                <Upload size={32} />
                <p>Click to browse files or drop them here</p>
                <span>Images and PDFs are supported</span>
              </div>
              {selectedFiles.length > 0 && (
                <div className="selected-files-list">
                  <strong>Selected ({selectedFiles.length}):</strong>
                  <ul>
                    {selectedFiles.map((f, i) => <li key={i}>{f.name} ({(f.size/1024/1024).toFixed(2)} MB)</li>)}
                  </ul>
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Uploading...' : 'Publish Material'}
            </button>
          </form>
        </div>
      )}

      {/* Tab Contents: Published Notes */}
      {activeTab === 'uploads' && (
        <div className="mod-content-card">
          <h2 className="card-title">Manage Published Materials</h2>
          {myUploads.length === 0 ? (
            <p className="empty-state">No materials published yet.</p>
          ) : (
            <div className="table-responsive">
              <table className="mod-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Segment</th>
                    <th>Exam</th>
                    <th>Type</th>
                    <th>Files Count</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myUploads.map((item) => (
                    <tr key={item._id}>
                      <td className="bold">{item.title}</td>
                      <td>{COURSES.find(c => c.value === item.course)?.label || item.course.toUpperCase()}</td>
                      <td>Segment {item.segment}</td>
                      <td>{item.examType.toUpperCase()}</td>
                      <td>{CONTENT_TYPES.find(t => t.value === item.contentType)?.label.split(' ')[1] || item.contentType}</td>
                      <td>{item.files.length} file(s)</td>
                      <td>
                        <button 
                          className="delete-btn"
                          onClick={() => handleDeleteMaterial(item._id)}
                          title="Delete note"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Tab Contents: Pending Review Queue */}
      {activeTab === 'review' && (
        <div className="mod-content-card">
          <h2 className="card-title">Pending Contributions Review Queue</h2>
          {pendingQueue.length === 0 ? (
            <p className="empty-state">No contributions to review. You are all caught up!</p>
          ) : (
            <div className="table-responsive">
              <table className="mod-table">
                <thead>
                  <tr>
                    <th>Submitted By</th>
                    <th>Title</th>
                    <th>Course</th>
                    <th>Segment</th>
                    <th>Type</th>
                    <th>Files</th>
                    <th style={{ textAlign: 'center' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pendingQueue.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <span className="user-name">{item.uploadedBy?.fullName || 'Anonymous'}</span>
                        <span className="user-email">{item.uploadedBy?.email}</span>
                      </td>
                      <td className="bold">{item.title}</td>
                      <td>{item.course.toUpperCase()}</td>
                      <td>Seg {item.segment}</td>
                      <td>{item.contentType}</td>
                      <td>
                        <a 
                          href={item.files[0]?.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="view-link"
                        >
                          View ({item.files.length})
                        </a>
                      </td>
                      <td>
                        <div className="action-buttons-row">
                          <button 
                            className="approve-btn-inline"
                            onClick={() => handleReviewAction(item._id, 'approved')}
                            title="Approve and Publish"
                          >
                            <CheckCircle size={18} /> Approve
                          </button>
                          <button 
                            className="reject-btn-inline"
                            onClick={() => handleReviewAction(item._id, 'rejected')}
                            title="Reject and Delete"
                          >
                            <XCircle size={18} /> Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ModeratorPanel;
