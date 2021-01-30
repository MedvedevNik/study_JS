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
      // eslint-disable-next-line no-use-before-define
      clearInterval(idInterval);
      const dateStop = new Date(deadline);
      dateStop.setDate(dateStop.getTime() + 1);
      countTimer(dateStop);
    }
  };

  updateClock();
  const idInterval = setInterval(updateClock, 1000);
};

export default countTimer;