document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function () {
      const category = this.querySelector('h3').textContent.toLowerCase();
      window.location.href = `resources.html?category=${category}`;
    });
  });