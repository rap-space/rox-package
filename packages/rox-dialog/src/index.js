import { createElement, Component, render } from 'rax';
import { connectStyle } from 'nuke-theme-provider';
import Dialog from 'nuke-dialog';

import Confirm from './confirm';
import Alert from './alert';

Dialog.Confirm = Confirm;
Dialog.Alert = Alert;

// const StyledIcon = connectStyle(stylesProvider)(Icon);

export default Dialog;