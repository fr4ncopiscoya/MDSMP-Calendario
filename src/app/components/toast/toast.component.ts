import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent {
  constructor() { }

  showToast(message: string, type: string) {
    let toastContainer = document.getElementById('toastContainer') as HTMLDivElement;
    let toastIcon = document.getElementById('toastIcon') as HTMLDivElement;
    let toastMessage = document.getElementById('toastMessage') as HTMLHeadingElement;

    if (type == 'error') {
      toastContainer.classList.add('toast-border-danger');
      toastIcon.classList.add('ri-alert-fill');
    } else if (type == 'success') {
      toastContainer.classList.add('toast-border-success');
      toastIcon.classList.add('ri-checkbox-circle-fill');
    } else {
      toastContainer.classList.add('toast-border-primary');
      toastIcon.classList.add('ri-information-fill');
    }

    toastMessage.innerHTML = message;
    toastContainer.classList.add('fade', 'show');

    setTimeout(() => {
      toastContainer.classList.remove('fade', 'show');
    },
      3000);
  }

}
