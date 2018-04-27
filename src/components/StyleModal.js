const SHARE_MODAL = 'SHARE_MODAL'
const REMOVE_MODAL = 'REMOVE_MODAL'

const styleShareModal = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.75)',
    position: 'fixed',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,.75)',
    width: '350px',
    height: '180px',
    padding:'-20px',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%)'
  }
}

const styleRemoveModal = {
  overlay: {
    backgroundColor: 'rgba(0,0,0,.75)',
    position: 'fixed',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'rgba(0,0,0,.75)',
    width: '500px',
    height: '300px',
    padding:'-20px',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%)'
  }
}

export const styleModal = (type) => {
  switch (type) {
    case SHARE_MODAL:
      return styleRemoveModal
    case REMOVE_MODAL:
      return styleShareModal
    default:
      break;
  }
}