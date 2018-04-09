window.addEventListener('load', function onLoad() {
  console.log('🎉 Hurrá, betöltődtünk!');

  var environment = document.getElementById('environment');
  document.body.addEventListener('click', function onClick(e) {
    var posX = e.clientX - 50;
    if (~['cloud', 'whistle'].indexOf(e.target.className)) {
      return;
    }
    var cloud = createCloud(posX, e.clientY);
    moveCloud(cloud, posX);
    document.getElementById('environment').appendChild(cloud);
  });

  function createCloud(posX, posY) {
    var cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.style.top = posY + 'px';
    cloud.style.left = posX + 'px';
    return cloud;
  }

  function moveCloud(cloud, posX) {
    var i = 0;
    var interval = setInterval(function() {
      posX = posX + 50;
      cloud.style.left = posX + 'px';
      if (i++ > 30) {
        cloud.parentElement.removeChild(cloud);
        clearInterval(interval);
      }
    }, 1000);
  }
});
