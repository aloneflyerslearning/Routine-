function updateTime() {
    const currentTimeDisplay = document.getElementById('current-time');
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     minutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedTime = `${hours}:${minutes} ${ampm}`;

    currentTimeDisplay.textContent = `Current Time: ${formattedTime}`;

   highlightCurrentTimeBlock(now);
}

function highlightCurrentTimeBlock(now) {
    const timeBlocks = document.querySelectorAll('.time-block[data-time]');
     const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    timeBlocks.forEach(block => {
        block.classList.remove('active');
        const [startTime, endTime] = block.dataset.time.split('-');

        const [startHour, startMinute] = startTime.split(':').map(Number);
        const [endHour, endMinute] = endTime.split(':').map(Number);

         const currentTotalMinutes = currentHour * 60 + currentMinute;
        const startTotalMinutes = startHour * 60 + startMinute;
        const endTotalMinutes = endHour * 60 + endMinute;

        if (currentTotalMinutes >= startTotalMinutes && currentTotalMinutes < endTotalMinutes )
         {
          block.classList.add('active');
        }
    });
}

//Update every minute
setInterval(updateTime, 60000);

//Initial call for display
updateTime();