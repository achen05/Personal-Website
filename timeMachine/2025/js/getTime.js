function updateTime() {
    const now = new Date();
    
    // Format time to Pacific Time
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'America/Los_Angeles',
      hour12: false
    };

    const formatter = new Intl.DateTimeFormat('en-US', options);
    const formattedTime = formatter.format(now);
    
    document.getElementById('local-time').textContent = formattedTime;
  }

  // Initial call and then update every second
  updateTime();
  setInterval(updateTime, 1000);