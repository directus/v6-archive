(function() {
  // Change height of textinput in new comment input based on value
  // ----------------------
  var commentTextarea = document.querySelector('.write-comment textarea');

  if (commentTextarea) {
    commentTextarea.addEventListener('input', function() {
      adjustHeight(commentTextarea, 54);
    }, false);

    adjustHeight(commentTextarea, 54);
  }

  function adjustHeight(textareaElement, minHeight) {
    var outerHeight = parseInt(window.getComputedStyle(textareaElement).height, 10);

    var diff = outerHeight - textareaElement.clientHeight;

    textareaElement.style.height = 0;

    if (isNaN(diff)) {
      textareaElement.style.height = minHeight + 'px';
    } else {
      textareaElement.style.height = Math.max(minHeight, textareaElement.scrollHeight + diff) + 'px';
    }
  }

  // Only show focus styles to keyboard users
  function handleFirstTab(e) {
    if (e.code === 'Tab') {
      document.body.classList.remove('using-mouse');

      window.removeEventListener('keydown', handleFirstTab);
      window.addEventListener('mousedown', handleMouseDownOnce);
    }
  }

  function handleMouseDownOnce() {
    document.body.classList.add('using-mouse');

    window.removeEventListener('mousedown', handleMouseDownOnce);
    window.addEventListener('keydown', handleFirstTab);
  }

  window.addEventListener('mousedown', handleMouseDownOnce);


  // Hide the new request modal on click outside
  var overlayBg = document.querySelector('.overlay-bg');

  if (overlayBg) {
    function closeModal() {
      window.location.hash = '';
    }

    overlayBg.addEventListener('click', closeModal);
  }


  // Submit search form on change
  var sortForm = document.querySelector('.sorting-options');

  if (sortForm) {
    // Hide search submit button when JS is enabled
    sortForm.querySelector('button').remove();

    sortForm.addEventListener('change', function () {
      // Set body class to loading (enable blocker overlay)
      document.body.classList.add('loading');
      // Submit form on change
      return this.submit();
    });
  }
}())
