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
        let idInterval = setInterval(updateClock, 1000);
    };

    countTimer('30 december 2020');

    // menu
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li a');

        const handlerMenu = () => {
            menu.classList.toggle('active-menu');
        };


        btnMenu.addEventListener('click', handlerMenu);
        closeBtn.addEventListener('click', handlerMenu);
        menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
    };

    toggleMenu();

    // popup

    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn'),
            popUpClose = document.querySelector('.popup-close'),
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
                popup.style.display = 'block';
                if (screen.width > 768) {
                    popupAnimate.count = popupAnimate.startPos;
                    requestAnimationFrame(showPopup);
                }
            });
        });

        popUpClose.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    };

    togglePopUp();


    //animate
    const anchors = document.querySelectorAll('menu>ul a');

    for (const anchor of anchors) {
        anchor.addEventListener('click', e => {
            e.preventDefault();
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
            const pageY = window.pageYOffset,
                hash = target.href.replace(/[^#]*(.*)/, '$1'),
                distTopPosition = document.querySelector(hash).getBoundingClientRect().top;

            let start = 0;


            const step = time => {
                if (!start) start = time;

                const progress = time - start;

                const r = (distTopPosition < 0 ?
                    Math.max(pageY - progress / speed, pageY + distTopPosition) :
                    Math.min(pageY + progress / speed, pageY + distTopPosition));

                window.scrollTo(0, r);

                if (r < pageY + distTopPosition) requestAnimationFrame(step);
            };

            requestAnimationFrame(step);

        }
    };

    document.querySelector('main a').addEventListener('click', animateScroll);
});
