function updateTime() {
    let now = new Date(),
        min = now.getMinutes(),
        hour = (now.getHours() % 12) + min/60,
        minangle = min*6,
        hourangle = hour*30,
        minhand = document.getElementById('minutehand'),
        hourhand = document.getElementById('hourhand');

    minhand.setAttribute('transform', `rotate(${minangle}, 50,50)`);
    hourhand.setAttribute('transform', `rotate(${hourangle} ,50,50)`);

    setTimeout(updateTime, 60000);
}