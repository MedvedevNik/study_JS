const sendForm = () => {
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

  const loadForm = forms => {
    const form = document.getElementById(forms),
      statusMessage = document.createElement('div'),
      errorMessage = 'Что-то пошло не так...',
      loadMessage = 'Загрузка...',
      successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    statusMessage.style.cssText = 'font-size: 2rem;';
    statusMessage.style.color = '#fff';

    form.addEventListener('submit', event => {
      event.preventDefault();
      form.appendChild(statusMessage);

      statusMessage.style.display = 'block';
      statusMessage.textContent = loadMessage;

      postData(Object.fromEntries(new FormData(form)))
        .then(response => {
          if (response.status !== 200) throw new Error(`Status network ${request.status}`);
          statusMessage.textContent = successMessage;
          clearInput(forms);
        })
        .catch(error => {
          statusMessage.textContent = errorMessage;
        });

      if (event.target.matches('#form3')) {
        setTimeout(() => {
          const popUp = document.querySelector('.popup');

          popUp.style.display = 'none';
        }, 3500);
      } else if (event.target.matches('#form2') || event.target.matches('#form1')) {
        setTimeout(() => {
          statusMessage.style.display = 'none';
        }, 3500);
      }
    });

    form.addEventListener('input', event => {
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
        target.setAttribute('pattern', '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$');
      }

      if (target.name === 'user_name') {
        target.setAttribute('pattern', '[А-ЯЁ]{1}[а-яё]{1,49}');
        target.setAttribute('maxlength', 50);
        target.value = target.value.replace(/[^А-Яёа-яё ]/gi, '');
      }

      if (target.matches('.mess')) {
        target.value = target.value.replace(/[^А-ЯЁа-яё ,.?!]/gi, '');
      }
    });
  };

  loadForm('form1');
  loadForm('form2');
  loadForm('form3');
};

export default sendForm;
