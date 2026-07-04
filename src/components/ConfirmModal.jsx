function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onCancel} className="modal-cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="modal-delete-btn">
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
