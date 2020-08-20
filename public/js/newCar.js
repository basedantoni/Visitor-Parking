const cardButton = document.querySelectorAll('.car-btn');

cardButton.forEach(btn => {
  btn.addEventListener('click', async e => {
    res = await fetch(`/api/visitors/vuid?name=${e.srcElement.id}`)
    location.href = "/newcar";
  });
})