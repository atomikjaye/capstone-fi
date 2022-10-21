import React, { useContext } from 'react'
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import { Link } from "react-router-dom";
import { UserContext } from '../../../UserContext';

function CodePopUp({ modalIsOpen, setIsOpen, errors, accuracy, totalTyped, codeLength, handleReset, setPoints, pointsRev }) {
  const { user } = useContext(UserContext);

  console.log("🎉🎉🎉🎉🎉🎉", accuracy, errors, totalTyped)

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        className="nes-dialog is-rounded"
        overlayClassName="backdrop"
      >
        {/* <!-- Rounded dialog --> */}
        <i onClick={closeModal} className="modal-close nes-icon close is-small"></i>
        <form method="dialog">
          <p className="title">Time's Up!!</p>
          <hr />
          <p>Check out your stats!</p>
          <span className="nes-badge"><span className="is-error">Errors</span></span> {errors}<br />
          <span className="nes-badge"><span className="is-warning">&nbsp;Accuracy&nbsp;</span></span> {accuracy}%<br />
          <span className="nes-badge"><span className="is-success">Total Words</span></span> {totalTyped}/{codeLength}
          <br />
          <hr />

          {/* <menu className="dialog-menu"> */}
          <Link to="/code-home">
            <button className="nes-btn is-error">Go Home</button>&nbsp;
          </Link>
          <button className="nes-btn is-warning" onClick={() => { handleReset(); setIsOpen(false) }}>Play Again</button>

          {/* </menu> */}
        </form>

      </Modal>
    </div>
  )
}

export default CodePopUp