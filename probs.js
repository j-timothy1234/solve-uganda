// Main JavaScript functionality for Uganda Tech Solutions

// Download PDF functionality
function downloadPDF() {
    // In a real implementation, this would generate a PDF
    alert('In a full implementation, this would download a comprehensive PDF report. For now, please use your browser\'s print function (Ctrl+P) to save as PDF.');
    
    // Optional: Trigger browser print for PDF saving
    // window.print();
}

// Scroll to solutions section
function scrollToSolutions() {
    document.getElementById('solutions').scrollIntoView({
        behavior: 'smooth'
    });
}

// Filter solutions by category
function filterSolutions(category) {
    const solutions = document.querySelectorAll('.solution-card');
    
    solutions.forEach(solution => {
        if (category === 'all') {
            solution.style.display = 'block';
        } else {
            const solutionCategory = solution.getAttribute('data-category');
            if (solutionCategory === category) {
                solution.style.display = 'block';
            } else {
                solution.style.display = 'none';
            }
        }
    });
    
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Initialize page functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log('Uganda Tech Solutions platform loaded successfully');
    
    // Add smooth scrolling to all navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add intersection observer for animation triggers
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe solution cards for animation
    document.querySelectorAll('.solution-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Initialize tooltips if using Bootstrap
    if (typeof bootstrap !== 'undefined') {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});

// Investment calculator functionality
function calculateROI() {
    const investment = parseFloat(document.getElementById('investmentAmount').value) || 0;
    const solution = document.getElementById('solutionSelect').value;
    
    let multiplier;
    switch(solution) {
        case 'agriculture':
            multiplier = 1.68; // 168% ROI
            break;
        case 'healthcare':
            multiplier = 2.65; // 265% ROI
            break;
        case 'education':
            multiplier = 2.20; // 220% ROI
            break;
        default:
            multiplier = 2.18; // Average 218% ROI
    }
    
    const returns = investment * multiplier;
    const profit = returns - investment;
    
    document.getElementById('roiResult').innerHTML = `
        <div class="alert alert-warning">
            <h5>Investment Projection</h5>
            <p><strong>Initial Investment:</strong> $${investment.toLocaleString()}</p>
            <p><strong>5-Year Returns:</strong> $${returns.toLocaleString()}</p>
            <p><strong>Net Profit:</strong> $${profit.toLocaleString()}</p>
            <p><strong>ROI:</strong> ${((multiplier - 1) * 100).toFixed(0)}%</p>
        </div>
    `;
}

// Export data functionality
function exportSolutionsData() {
    const solutionsData = [
        {
            name: "AgriChain Uganda",
            problem: "Agricultural supply chain fragmentation",
            solution: "Digital marketplace with AI and IoT",
            funding: 2500000,
            roi: 168
        },
        {
            name: "MediConnect Uganda", 
            problem: "Healthcare access limitations",
            solution: "AI-powered telemedicine platform",
            funding: 3200000,
            roi: 265
        }
    ];
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(solutionsData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "uganda-tech-solutions-data.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}