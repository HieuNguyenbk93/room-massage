const Modal = ({ show, onClose, children, title, onSave }) => {
  if (!show) return null; // Don't render the modal if "show" is false

  return (
    <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {children}  {/* Content of the modal */}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Đóng</button>
            <button type="button" className="btn btn-primary" onClick={onSave}>Lưu</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
