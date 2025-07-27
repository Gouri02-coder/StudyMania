const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category');

if (category) {
  document.getElementById('resource-list').innerHTML = `
    <div class="resource-item">
      <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
      <p>Sample resource for ${category}.</p>
      <a href="resource-detail.html" class="btn">View Details</a>
    </div>
  `;
}