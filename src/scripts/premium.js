document.addEventListener("DOMContentLoaded", function () {
    // Clear any existing plan data when page first loads
    sessionStorage.removeItem('activePlan');
    
    // Get modal elements
    const paymentModal = document.getElementById("paymentModal");
    const closeBtn = document.querySelector(".close-btn");
    const paymentSuccess = document.getElementById("paymentSuccess");
    const countdownElement = document.getElementById("countdown");
    
    // Check if user has an active plan
    function checkPlanStatus() {
      const activePlan = sessionStorage.getItem('activePlan');
      if (activePlan) {
        document.querySelectorAll('.plan').forEach(plan => {
          plan.classList.remove('current-plan');
          if (plan.classList.contains(activePlan)) {
            plan.classList.add('current-plan');
            const statusDiv = document.createElement('div');
            statusDiv.className = 'plan-status';
            statusDiv.textContent = activePlan === 'basic' ? 'Current Plan' : 
                                  `Active Plan (${activePlan.charAt(0).toUpperCase() + activePlan.slice(1)})`;
            plan.querySelector('.btn').textContent = 'Manage Plan';
            plan.querySelector('.btn').style.backgroundColor = '#718096';
            plan.appendChild(statusDiv);
          }
        });
      }
    }
    
    // Initialize plan status check
    checkPlanStatus();
  
    // Handle subscription button clicks
    document.querySelectorAll('.plan .btn').forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const plan = this.closest('.plan');
        
        // Don't proceed if this is already the current plan
        if (plan.classList.contains('current-plan')) return;
        
        const planType = plan.classList.contains('basic') ? 'basic' : 
                        plan.classList.contains('premium') ? 'premium' : 'pro';
        
        // Show payment modal for premium/pro plans
        if (planType !== 'basic') {
          paymentModal.style.display = "block";
          startCountdown(planType);
        } else {
          // For basic plan, just set it as active
          sessionStorage.setItem('activePlan', 'basic');
          checkPlanStatus();
        }
      });
    });
  
    // Close modal when clicking X
    closeBtn.addEventListener('click', function() {
      paymentModal.style.display = "none";
      clearTimeout(successTimeout);
      clearInterval(countdownInterval);
    });
  
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === paymentModal) {
        paymentModal.style.display = "none";
        clearTimeout(successTimeout);
        clearInterval(countdownInterval);
      }
    });
  
    let countdownInterval;
    let successTimeout;
  
    function startCountdown(planType) {
      let timeLeft = 120; // 2 minutes in seconds
      countdownElement.textContent = "02:00";
      
      countdownInterval = setInterval(function() {
        timeLeft--;
        
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        countdownElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // At 38 seconds, show payment success
        if (timeLeft === 38) {
          clearInterval(countdownInterval);
          document.querySelector('.qr-container').style.display = 'none';
          paymentSuccess.style.display = 'block';
          
          // Set the plan as active in sessionStorage
          sessionStorage.setItem('activePlan', planType);
          
          // Reload after 3 seconds
          successTimeout = setTimeout(function() {
            window.location.href = "index.html";
          }, 3000);
        }
        
        if (timeLeft <= 0) {
          clearInterval(countdownInterval);
          paymentModal.style.display = "none";
        }
      }, 1000);
    }
  
    // Clear session storage when user leaves the page
    window.addEventListener('beforeunload', function() {
      sessionStorage.removeItem('activePlan');
    });
  });