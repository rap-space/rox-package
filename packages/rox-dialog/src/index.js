import { createElement, Component, render } from 'rax';
import Dialog from 'nuke-dialog';

import Confirm from './confirm';
import Alert from './alert';

Dialog.Confirm = Confirm;
Dialog.Alert = Alert;
export default Dialog;