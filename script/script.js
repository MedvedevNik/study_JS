window.addEventListener('DOMContentLoaded', () => {

    // Timer
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        const getTimeRemaining = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        };

        const addZero = item => {
            if (item < 10) {
                item = '0' + item;
            }
            return item;
        };

        const updateClock = () => {
            const timer = getTimeRemaining();

            timerHours.textContent = addZero(timer.hours);
            timerMinutes.textContent = addZero(timer.minutes);
            timerSeconds.textContent = addZero(timer.seconds);

            if (timer.timeRemaining < 0) {
                clearInterval(idInterval);
                const dateStop = new Date(deadline);
                dateStop.setDate(dateStop.getTime() + 1);
                countTimer(dateStop);
            }
        };

        updateClock();
        const idInterval = setInterval(updateClock, 1000);
    };

    countTimer('20 january 2021');

    // menu
    const toggleMenu = () => {
        const menu = document.querySelector('menu');

        const handlerMenu = event => {
            const target = event.target;

            const activeMenu = () => {
                menu.classList.toggle('active-menu');
            };

            if (target.closest('.menu') || (!target.closest('menu') && menu.classList.contains('active-menu'))) {
                activeMenu();
            } else if (target.closest('menu') && target.closest('[href^="#"]')) {
                activeMenu();

                if (!target.classList.contains('close-btn')) {
                    animateScroll();
                }
            }
        };

        document.body.addEventListener('click', handlerMenu);
    };

    toggleMenu();

    // popup

    const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popupContent = document.querySelector('.popup-content'),
            popupAnimate = {
                count: -1200,
                speed: 12,
                startPos: -1200,
                endPos: 0
            };


        const showPopup = () => {
            popupAnimate.startPos > popupAnimate.endPos ?
                popupAnimate.count -= popupAnimate.speed :
                popupAnimate.count += popupAnimate.speed;
            popupContent.style.transform = `translateX(${popupAnimate.count}px)`;

            if (popupAnimate.startPos > popupAnimate.endPos ?
                popupAnimate.count > popupAnimate.endPos :
                popupAnimate.count < popupAnimate.endPos) {
                requestAnimationFrame(showPopup);
            }
        };

        popupBtn.forEach(elem => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                if (screen.width > 768) {
                    popupAnimate.count = popupAnimate.startPos;
                    requestAnimationFrame(showPopup);
                }
            });
        });

        popUp.addEventListener('click', event => {
            let target = event.target;

            if (target.classList.contains('popup-close')) {
                popUp.style.display = 'none';
            } else {
                target = target.closest('.popup-content');

                if (!target) {
                    popUp.style.display = 'none';
                }
            }
        });
    };

    togglePopUp();


    //animate
    const anchors = document.querySelectorAll('menu>ul a');

    for (const anchor of anchors) {
        anchor.addEventListener('click', event => {
            event.preventDefault();
            const blockID = anchor.getAttribute('href').substr(1);
            document.getElementById(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    }


    const animateScroll = () => {

        const target = event.target.closest('[href^="#"]'),
            speed = 0.85;


        if (target) {
            const scrollPageY = window.scrollPageYOffset,
                hash = target.href.replace(/[^#]*(.*)/, '$1'),
                distTopPosition = document.querySelector(hash).getBoundingClientRect().top;

            let start = 0;


            const step = time => {
                if (!start) start = time;

                const progress = time - start;

                const result = (distTopPosition < 0 ?
                    Math.max(scrollPageY - progress / speed, scrollPageY + distTopPosition) :
                    Math.min(scrollPageY + progress / speed, scrollPageY + distTopPosition));

                window.scrollTo(0, result);

                if (result < scrollPageY + distTopPosition) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);

        }
    };

    document.querySelector('main a').addEventListener('click', animateScroll);

    // tabs

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', event => {
            let target = event.target;

            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }

        });
    };

    tabs();

    // slider

    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            dot = document.querySelectorAll('.dot'),
            slider = document.querySelector('.portfolio-content');

        let currentSlide = 0,
            interval;

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', event => {
            event.preventDefault();

            const target = event.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }


            if (currentSlide < 0) {
                currentSlide = slide.length;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        });

        slider.addEventListener('mouseover', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', event => {
            if (event.target.matches('.portfolio-btn') ||
            event.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(1500);
    };


    const addDot = () => {
        const portfolioItem = document.querySelectorAll('.portfolio-item'),
            portfolioDots = document.querySelector('.portfolio-dots');

        portfolioItem.forEach(() => {
            const dot = document.createElement('li');
            dot.classList.add('dot');
            portfolioDots.append(dot);
        });
        portfolioDots.children[0].classList.add('dot-active');
    };

    const changeImg = () => {
        const img = document.querySelector('#command .row');

        const changingPhotos = () => {
            const target = event.target;

            if (target.classList.contains('command__photo')) {
                const lastSrc = target.src;

                target.src = target.dataset.img;
                target.dataset.img = lastSrc;
            }
        };

        img.addEventListener('mouseover', changingPhotos);
        img.addEventListener('mouseout', changingPhotos);
    };

    const checkCalcBlock = () => {
        const calcBlock = document.querySelector('.calc-block');

        calcBlock.addEventListener('input', event => {
            const target = event.target;

            if (target.matches('.calc-day') ||
            target.matches('.calc-square') || target.matches('.calc-count')) {
                event.target.value = event.target.value.replace(/\D/g, '');
            }
        });
    };

    //calc
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = document.querySelector('.calc-type'),
            calcSquare = document.querySelector('.calc-square'),
            calcDay = document.querySelector('.calc-day'),
            calcCount = document.querySelector('.calc-count'),
            totalValue = document.getElementById('total');

        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1,
                step = 1;

            const typeValue = calcType.options[calcType.selectedIndex].value,
                squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if  (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue  * squareValue * countValue * dayValue;
            }

            if (totalValue.textContent !== total) {
                if (totalValue.textContent > total) {
                    step = -1;
                }

                const timer = setInterval(() => {
                    totalValue.textContent = +totalValue.textContent + (step * 200);
                    if ((total - totalValue.textContent) * (step * 200)  < 1) {
                        clearInterval(timer);
                        totalValue.textContent = total;
                    }
                }, 0);
            }
        };

        calcBlock.addEventListener('change', event => {
            const target  = event.target;

            if (target.matches('.calc-day') || target.matches('.calc-type') ||
            target.matches('.calc-square') || target.matches('.calc-count')) {
                countSum();
            }
        });
    };


    //send-ajax-form

    const sendForm = () => {

        const postData = (body, outputData, errorData) => {
            const request = new XMLHttpRequest();

            request.addEventListener('readystatechange', () => {
                if (request.readyState !== 4) {
                    return;
                }
                if (request.status === 200) {
                    outputData();
                } else {
                    errorData(request.status);
                }
            });

            request.open('POST', './server.php');
            request.setRequestHeader('Content-Type', 'application/json');

            request.send(JSON.stringify(body));
        };

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
                errorMessage = 'Что то пошло не так...',
                loadMessage = 'Загрузка...',
                successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

            statusMessage.style.cssText = 'font-size: 2rem;';

            form.addEventListener('submit', event => {
                event.preventDefault();
                form.appendChild(statusMessage);

                statusMessage.textContent = loadMessage;

                const formData = new FormData(form),
                    body = {};

                formData.forEach((val, key) => {
                    body[key] = val;
                });
                postData(body, () => {
                    statusMessage.textContent = successMessage;
                }, () => {
                    statusMessage.textContent = errorMessage;
                });
                clearInput(forms);
            });

            form.addEventListener('input', event => {
                const target = event.target;

                if (target.matches('.form-phone')) {
                    target.value = target.value.replace(/[^+\d]/g, '');
                }

                if (target.matches('.form-email')) {
                    target.value = target.value.replace(/[^A-Za-z ,.@]/gi, '');
                }

                if (target.name === 'user_name') {
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
        // form.addEventListener('input', isValid);
    };

    addDot();
    changeImg();
    checkCalcBlock();
    calc(100);
    sendForm();
    slider();
});
