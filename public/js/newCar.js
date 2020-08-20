const cardButton = document.querySelectorAll('.car-btn');
const bookButton = document.querySelectorAll('.book-btn');

cardButton.forEach(btn => {
  btn.addEventListener('click', async e => {
    res = await fetch(`/api/visitors/vuid?name=${e.srcElement.id}`)
    location.href = "/newcar";
  });
})

bookButton.forEach(btn => {
  btn.addEventListener('click', e => {
    const isBooking = confirm(`Book ${e.srcElement.id}?`);
    if(isBooking) {
      console.log('YAY')
    }
  })
})
