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
    environment.appendChild(cloud);
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

  var wall = document.getElementById('wall');
  var form = document.getElementById('whistle-form');
  var iconSelect = document.getElementById('whistle-icon');
  var textInput = document.getElementById('whistle-text');

  form.addEventListener('click', function onSubmit(e) {
    e.stopPropagation();
  });
  form.addEventListener('submit', function onSubmit(e) {
    e.preventDefault();
    var whistle = createWhistle(iconSelect.value + textInput.value);
    wall.appendChild(whistle);
  });

  function createWhistle(text) {
    var whistle = document.createElement('span');
    whistle.className = 'whistle';
    whistle.innerText = text;
    return whistle;
  }
});
