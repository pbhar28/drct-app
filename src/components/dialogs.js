import React from 'React';
import ReactDOM from 'react-dom';

export class Page extends React.Component {

  constructor(props) {
    super(props)
    let { dialogHolder = '.DialogHolder' } = props

    this.state = {
      dialogHolder,
      dialogs: []
    }
  }
  
  addNewDialog() {
    let state = this.state,
        dialogHolder = state.dialogHolder,
        dialogs = state.dialogs,
        dialog, id

    // Need some simple way to distinquish the different dialogs.
    id = Date.now()
    dialog = ReactDOM.createPortal((
        <div className="Dialog">
          <div className="Dialog-Head">
            <span>Dialog {dialogs.length}</span>
            <button type="button" className="close" onClick={(evt) => this.onButtonClick(evt, { id: id })} aria-label="Close" data-action="close-dialog">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="Dialog-Body">
            <div className="btn-toolbar" role="toolbar">
              <div className="btn-group" role="group">
                <button className="btn  btn-default" onClick={(evt) => this.onButtonClick(evt)} data-action="add-dialog">Add Another Dialog</button>
              </div>
            </div>
          </div>
        </div>
      ),
      dialogHolder
    )
    // Note: Setting the ID on the React portal is dangerous.  This was done for
    // simplicity, and this practice should not be done in production.
    dialog.id = id
    this.setState({
      dialogs: dialogs.concat(dialog),
    })
  }
  
  closeDialog(id) {
    let dialogs = this.state.dialogs.filter(dialog => dialog.id !== id)
    if (dialogs.length !== this.state.dialogs.length) {
      this.setState({
        dialogs: dialogs,
      })
    }
  }

  onButtonClick(evt, opts) {
    let action = evt.currentTarget.dataset.action
    
    switch (action) {
      case 'add-dialog':
        this.addNewDialog()
        break
      case 'close-dialog':
        this.closeDialog(opts.id)
        break
      default:
        console.log(`Unrecognized button action: ${action}`)
    }
  }
  
  onPageClick(evt) {
    console.log(`${evt.target.className} was clicked!`)
  }

  render() {
    let state = this.state,
        dialogs = state.dialogs,
        messages = state.messages

    return (
      <div className="Page" onClick={(evt) => this.onPageClick(evt)}>
        <div className="Page-Head"><span className="Title">React Portals</span></div>
        <div className="Page-Body">
          <div className="btn-toolbar" role="toolbar">
            <div className="btn-group" role="group">
              <button className="btn  btn-default" onClick={(evt) => this.onButtonClick(evt)} data-action="add-dialog">
                Add Dialog
              </button>
            </div>
          </div>
          {dialogs}
        </div>
        <div className="Page-Foot"></div>
      </div>
    )
  }

  componentWillMount() {
    let state = this.state,
        dialogHolder = state.dialogHolder
    
    this._resolvePortalRoots(dialogHolder);
  }

  componentDidMount() {
    this._syncPortalParents()
  }

  componentDidUpdate() {
    this._syncPortalParents()
  }

  componentWillReceiveProps(nextProps) {
    let props = this.props,
        dialogHolder = nextProps.dialogHolder

    if (props.dialogHolder !== dialogHolder
    ) {
      this._resolvePortalRoots(dialogHolder);
    }
  }

  _resolvePortalRoots(dialogHolder) {
    if (typeof dialogHolder === 'string') {
      dialogHolder = document.querySelector(dialogHolder)
    }
    this.setState({
      dialogHolder,
    })
  }

  _syncPortalParents() {
    let state = this.state,
        dialogHolder = state.dialogHolder

    if (state.dialogs.length === 0) {
      dialogHolder.classList.add('is-empty')
    }
    else {
      dialogHolder.classList.remove('is-empty')
    }
  }

}
