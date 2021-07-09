const uiSlider = document.getElementById('duration');

noUiSlider.create(uiSlider, {
   start: [0, 120],
   connect: true,
   range: {
      'min': 2,
      'max': 120
   },
   step: 1,
});

const snapValues = [
   document.getElementById('value-from'),
   document.getElementById('value-to')
];

uiSlider.noUiSlider.on('update', function (values, handle) {
   snapValues[handle].innerHTML = values[handle];
});