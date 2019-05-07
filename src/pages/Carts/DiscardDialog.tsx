import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button } from '../../components'

interface Props {
    isShow: boolean

    onCancel: () => void
    onDiscard: () => void
}

const DiscardDialog = (props: Props) => {
    const { isShow, onCancel, onDiscard } = props;

    return <Dialog open={isShow} onClose={onCancel}>
        <DialogTitle>
            <div className="cart-update-discard-dialoag-title">
                Discard changes?
            </div>
        </DialogTitle>

        <DialogActions>
            <Button title="Cancel" onClick={onCancel} accentColor="white" />

            <Button title="DISCARD" onClick={onDiscard} />
        </DialogActions>
    </Dialog>
}

export default DiscardDialog;