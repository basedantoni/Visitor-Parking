const cardButton = document.querySelectorAll('.car-btn');

cardButton.forEach(btn => {
  btn.addEventListener('click', e => {
    console.log(e.srcElement.id)
  })
})