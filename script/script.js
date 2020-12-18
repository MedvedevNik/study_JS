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

        function updateClock() {
            const timer = getTimeRemaining();

            if (timer.hours > 0) {
                if (timer.hours > 10) {
                    timerHours.textContent = timer.hours;
                } else {
                    timerHours.textContent = '0' + timer.hours;
                }
            } else {
                timerHours.textContent = '00';
            }
            if (timer.minutes > 0) {
                if (timer.hours > 10) {
                    timerMinutes.textContent = timer.minutes;
                } else {
                    timerMinutes.textContent = '0' + timer.minutes;
                }
            } else {
                timerMinutes.textContent = '00';
            }
            if (timer.seconds > 0) {
                if (timer.hours > 10) {
                    timerSeconds.textContent = timer.seconds;
                } else {
                    timerSeconds.textContent = '0' + timer.seconds;
                }
            } else {
                timerSeconds.textContent = '00';
            }

            if (timer.timeRemaining > 0) {
                setTimeout(updateClock, 1000);
            }
        }

        updateClock();
    }

    setInterval(countTimer, 1000, '20 december 2020');
});
