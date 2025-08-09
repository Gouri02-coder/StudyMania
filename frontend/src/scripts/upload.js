document.addEventListener('DOMContentLoaded', function() {
  // Sample data - in a real app, this would come from your database/backend
  let uploadedResources = [
    {
      id: 1,
      title: "Advanced Calculus Notes",
      description: "Comprehensive notes covering all topics in advanced calculus with examples and practice problems.",
      category: "notes",
      fileUrl: "uploads/calculus_notes.pdf",
      thumbnailUrl: "thumbnails/math_thumb.jpg",
      uploadDate: "2025-03-15",
      fileSize: "2.4 MB",
      downloads: 42,
      tags: ["mathematics", "calculus", "advanced"]
    },
    {
      id: 2,
      title: "Quantum Physics PPT",
      description: "Presentation slides covering fundamental concepts of quantum physics with illustrations.",
      category: "ppt",
      fileUrl: "uploads/quantum_physics.pptx",
      thumbnailUrl: "thumbnails/physics_thumb.jpg",
      uploadDate: "2025-03-10",
      fileSize: "5.7 MB",
      downloads: 28,
      tags: ["physics", "quantum", "presentation"]
    },
    {
      id: 3,
      title: "2024 Algorithms Exam",
      description: "Previous year question paper for Design and Analysis of Algorithms course.",
      category: "question-papers",
      fileUrl: "uploads/algorithms_exam.pdf",
      thumbnailUrl: "thumbnails/exam_thumb.jpg",
      uploadDate: "2025-03-05",
      fileSize: "1.2 MB",
      downloads: 35,
      tags: ["algorithms", "exam", "computer-science"]
    }
  ];

  const resourcesGrid = document.getElementById('resources-grid');
  const tabButtons = document.querySelectorAll('.tab-button');
  const uploadForm = document.getElementById('upload-form');
  
  // Function to render resources
  function renderResources(category = 'all') {
    resourcesGrid.innerHTML = '';
    
    const filteredResources = category === 'all' 
      ? uploadedResources 
      : uploadedResources.filter(resource => resource.category === category);
    
    if (filteredResources.length === 0) {
      resourcesGrid.innerHTML = `
        <div class="no-resources">
          <i class="fas fa-folder-open"></i>
          <p>No resources found in this category.</p>
        </div>
      `;
      return;
    }
    
    filteredResources.forEach(resource => {
      const resourceCard = document.createElement('div');
      resourceCard.className = 'resource-card';
      resourceCard.dataset.category = resource.category;
      
      resourceCard.innerHTML = `
        <div class="resource-thumbnail">
          ${resource.thumbnailUrl 
            ? `<img src="${resource.thumbnailUrl}" alt="${resource.title}">` 
            : `<i class="fas fa-file-${resource.category === 'ppt' ? 'powerpoint' : resource.category === 'ebooks' ? 'book' : 'pdf'}"></i>`}
        </div>
        <div class="resource-content">
          <h3 class="resource-title">${resource.title}</h3>
          <p class="resource-description">${resource.description}</p>
          <div class="resource-meta">
            <span>Uploaded: ${resource.uploadDate}</span>
            <span class="resource-category">${getCategoryName(resource.category)}</span>
          </div>
          <div class="resource-actions">
            <span>${resource.downloads} downloads</span>
            <a href="${resource.fileUrl}" download class="download-btn">
              <i class="fas fa-download"></i> Download
            </a>
          </div>
        </div>
      `;
      
      resourcesGrid.appendChild(resourceCard);
    });
  }
  
  // Helper function to get category display name
  function getCategoryName(category) {
    const categories = {
      'notes': 'Notes',
      'ppt': 'Presentation',
      'question-papers': 'Question Paper',
      'ebooks': 'E-Book',
      'assignments': 'Assignment'
    };
    return categories[category] || 'Resource';
  }
  
  // Tab switching functionality
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      renderResources(button.dataset.category);
    });
  });
  
  // Form submission handler
  uploadForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const tags = document.getElementById('tags').value.split(',').map(tag => tag.trim());
    const file = document.getElementById('file').files[0];
    const thumbnail = document.getElementById('thumbnail').files[0];
    
    // In a real app, you would upload the files to your server here
    // For this demo, we'll just add a sample resource
    const newResource = {
      id: uploadedResources.length + 1,
      title: title,
      description: description,
      category: category,
      fileUrl: URL.createObjectURL(file),
      thumbnailUrl: thumbnail ? URL.createObjectURL(thumbnail) : null,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
      downloads: 0,
      tags: tags
    };
    
    uploadedResources.unshift(newResource);
    renderResources();
    uploadForm.reset();
    
    // Scroll to the uploaded resources section
    document.querySelector('.uploaded-resources').scrollIntoView({
      behavior: 'smooth'
    });
    
    // Show success message
    alert('Resource uploaded successfully!');
  });
  
  // Initial render
  renderResources();
});

// upload.js (updated with backend integration)
document.addEventListener('DOMContentLoaded', function() {
  const resourcesGrid = document.getElementById('resources-grid');
  const tabButtons = document.querySelectorAll('.tab-button');
  const uploadForm = document.getElementById('upload-form');

  // Function to fetch resources from backend
  async function fetchResources() {
      try {
          const response = await fetch('/api/resources');
          if (!response.ok) throw new Error('Failed to fetch resources');
          return await response.json();
      } catch (error) {
          console.error('Error fetching resources:', error);
          return [];
      }
  }

  // Function to render resources
  async function renderResources(category = 'all') {
      const resources = await fetchResources();
      resourcesGrid.innerHTML = '';
      
      const filteredResources = category === 'all' 
          ? resources 
          : resources.filter(resource => resource.category === category);
      
      if (filteredResources.length === 0) {
          resourcesGrid.innerHTML = `
              <div class="no-resources">
                  <i class="fas fa-folder-open"></i>
                  <p>No resources found in this category.</p>
              </div>
          `;
          return;
      }
      
      filteredResources.forEach(resource => {
          const resourceCard = createResourceCard(resource);
          resourcesGrid.appendChild(resourceCard);
      });
  }

  // Create resource card DOM element
  function createResourceCard(resource) {
      const card = document.createElement('div');
      card.className = 'resource-card';
      card.dataset.category = resource.category;
      
      card.innerHTML = `
          <div class="resource-thumbnail">
              ${resource.thumbnailUrl 
                  ? `<img src="${resource.thumbnailUrl}" alt="${resource.title}">` 
                  : `<i class="fas fa-file-${getFileIcon(resource.category)}"></i>`}
          </div>
          <div class="resource-content">
              <h3 class="resource-title">${resource.title}</h3>
              <p class="resource-description">${resource.description}</p>
              <div class="resource-meta">
                  <span>Uploaded: ${new Date(resource.uploadDate).toLocaleDateString()}</span>
                  <span class="resource-category">${getCategoryName(resource.category)}</span>
              </div>
              <div class="resource-actions">
                  <span>${resource.downloads} downloads</span>
                  <a href="${resource.fileUrl}" download class="download-btn">
                      <i class="fas fa-download"></i> Download
                  </a>
              </div>
          </div>
      `;
      return card;
  }

  // Handle form submission with actual file upload
  uploadForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      
      const formData = new FormData();
      formData.append('title', document.getElementById('title').value);
      formData.append('description', document.getElementById('description').value);
      formData.append('category', document.getElementById('category').value);
      formData.append('tags', document.getElementById('tags').value);
      formData.append('file', document.getElementById('file').files[0]);
      formData.append('thumbnail', document.getElementById('thumbnail').files[0]);
      formData.append('visibility', document.getElementById('visibility').value);

      try {
          const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData
          });

          if (!response.ok) throw new Error('Upload failed');
          
          const newResource = await response.json();
          
          // Add to beginning of grid and scroll to it
          const newCard = createResourceCard(newResource);
          resourcesGrid.prepend(newCard);
          
          // Reset form
          uploadForm.reset();
          
          // Show success message
          showNotification('Resource uploaded successfully!');
          
          // Scroll to the new resource
          newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          
      } catch (error) {
          console.error('Upload error:', error);
          showNotification('Upload failed: ' + error.message, 'error');
      }
  });

  // Helper functions
  function getFileIcon(category) {
      const icons = {
          'ppt': 'powerpoint',
          'ebooks': 'book',
          'notes': 'file-alt',
          'question-papers': 'file-pdf',
          'assignments': 'file-signature'
      };
      return icons[category] || 'file';
  }

  function showNotification(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `notification ${type}`;
      notification.innerHTML = `
          <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
          ${message}
      `;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 5000);
  }

  // Initialize
  tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
          tabButtons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          renderResources(btn.dataset.category);
      });
  });

  // Initial load
  renderResources();
});