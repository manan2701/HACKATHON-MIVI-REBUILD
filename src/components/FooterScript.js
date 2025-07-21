/**
 * Toggle dropdown content in the footer
 * @param {HTMLElement} element - The clicked element
 */
export function toggleDropdownContent(element) {
  const dropdownContent = element.nextElementSibling;
  
  // On mobile, close all other dropdowns first
  if (window.innerWidth < 768) {
    const allDropdowns = document.querySelectorAll('.dropdown-content');
    allDropdowns.forEach(dropdown => {
      if (dropdown !== dropdownContent && dropdown.classList.contains('active')) {
        dropdown.classList.remove('active');
        
        // Remove active class from parent element's heading
        const headingElement = dropdown.previousElementSibling;
        if (headingElement && headingElement.classList.contains('mivi-footer-block-heading')) {
          headingElement.classList.remove('active');
        }
      }
    });
  }
  
  // Toggle the clicked dropdown
  dropdownContent.classList.toggle('active');
  element.classList.toggle('active');
}

/**
 * Initialize footer functionality
 */
export function initFooter() {
  // Add click event listeners to all footer headings
  const footerHeadings = document.querySelectorAll('.mivi-footer-block-heading');
  footerHeadings.forEach(heading => {
    heading.addEventListener('click', function() {
      toggleDropdownContent(this);
    });
  });
  
  // Close dropdowns when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.mivi-footer-block-heading') && 
        !e.target.closest('.dropdown-content')) {
      const activeDropdowns = document.querySelectorAll('.dropdown-content.active');
      activeDropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
        
        // Remove active class from heading
        const headingElement = dropdown.previousElementSibling;
        if (headingElement && headingElement.classList.contains('mivi-footer-block-heading')) {
          headingElement.classList.remove('active');
        }
      });
    }
  });
} 