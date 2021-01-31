const sendForm = () => {
  const errorMessage = 'Что-то пошло не так...',
    loadMessage = 'Загрузка...',
    successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

  const postData = body => fetch('./server.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const clearInput = idForm => {
    const form = document.getElementById(idForm);

    [...form.elements]
      .filter(item =>
        item.tagName.toLowerCase() !== 'button' &&
                                  item.type !== 'button')
      .forEach(item =>
        item.value = '');
  };

  const isValid = event => {
    const target = event.target;

    if (target.matches('.form-phone')) {
      target.setAttribute('pattern', '[8]{1}[0-9]{10}');
      target.setAttribute('maxlength', 11);
      if (/\+/.test(target.value)) {
        target.setAttribute('pattern', '[+]{1}[0-9]{11}');
        target.setAttribute('maxlength', 12);
      }
      target.value = target.value.replace(/[^+\d]/g, '');
    }

    if (target.matches('.form-email')) {
      target.value = target.value.replace(/[^A-Za-z ,.@]/gi, '');
      target.setAttribute('pattern', '[A-Za-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
    }

    if (target.name === 'user_name') {
      target.setAttribute('pattern', '[А-ЯЁ]{1}[а-яё]{1,49}');
      target.setAttribute('maxlength', 50);
      target.value = target.value.replace(/[^А-Яёа-яё ]/gi, '');
    }

    if (target.matches('.mess')) {
      target.value = target.value.replace(/[^А-ЯЁа-яё ,.?!]/gi, '');
    }
  };

  const loadForm = forms => {
    const formId = document.getElementById(forms),
      statusMessage = document.createElement('div');

    statusMessage.style.cssText = 'font-size: 2rem;';
    statusMessage.style.color = '#fff';

    formId.appendChild(statusMessage);

    statusMessage.style.display = 'block';
    statusMessage.textContent = loadMessage;
    clearInput(forms);

    postData(Object.fromEntries(new FormData(formId)))
      .then(response => {
        if (response.status !== 200) throw new Error(`Status network ${request.status}`);
        statusMessage.textContent = successMessage;
      })
      .catch(() => {
        statusMessage.textContent = errorMessage;
      });

    if (forms === 'form3') {
      setTimeout(() => {
        const popUp = document.querySelector('.popup');

        popUp.style.display = 'none';
      }, 3500);
    } else if (forms === 'form2' || forms === 'form1') {
      setTimeout(() => {
        statusMessage.style.display = 'none';
      }, 3500);
    }
    formId.addEventListener('input', isValid);
  };

  document.body.addEventListener('submit', event => {
    event.preventDefault();
    const target = event.target;
    if (target.matches('#form2') || target.matches('#form1') || target.matches('#form3')) {
      loadForm(target.id);
      target.enable = 'disable';
    }
  });
};

export default sendForm;
