import {ExceptionHandler} from '@angular/core'

export class GUIExceptionHandler extends ExceptionHandler {
    call(error, stackTrace = null, reason = null) {
        alert(`Error: ${error.status} : ${error.statusText}`);
    }
}