window.addEventListener('DOMContentLoaded', () => {

    // Timer
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes = document.querySelector('#timer-minutes'),
            timerSeconds = document.querySelector('#timer-seconds');

        function getTimeRemaining() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);
            return { timeRemaining, hours, minutes, seconds };
        }

        function addZero(item) {
            if (item < 10) {
                item = '0' + item;
            }
            return item;
        }

        const idInterval = setInterval(updateClock, 1000);

        function updateClock() {
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
        }
    }

    countTimer('20 december 2020');
});
