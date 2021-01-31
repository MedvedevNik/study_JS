const falidation = () => {

  document.body.addEventListener('input', event => {

    const target = event.target;
    console.log(target);

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
  });
};

export default falidation;
