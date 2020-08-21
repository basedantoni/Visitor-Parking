const cardButton = document.querySelectorAll('.car-btn');
const bookButton = document.querySelectorAll('.book-btn');

cardButton.forEach(btn => {
  btn.addEventListener('click', async e => {
    await fetch(`/api/visitors/vuid?name=${e.srcElement.id}`)
    location.href = "/newcar";
  });
})

bookButton.forEach(btn => {
  btn.addEventListener('click', async e => {
    const isBooking = confirm(`Book ${e.srcElement.id}?`);
    if(isBooking) {
      await fetch(`/api/visitors/vuid?name=${e.srcElement.id}`);

      const date = new Date();
      const res = await fetch(`api/visitors/book-visitor?name=${e.srcElement.id}&date=${date.toDateString()}`);
    }
  })
})
