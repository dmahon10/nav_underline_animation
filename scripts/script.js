
(function() {

  // target = underline (span)
  const target = document.querySelector(".target");

  // How far under words (negative means higher)
  under = -30
  short = -30
  cntr = - (short/2.0) - 1
  
  const myNav = document.querySelector(".mynav");

  const links = myNav.querySelectorAll("a");

  const colors = "#4FE3F8";

  // Get default selected link
  dLink = document.querySelector(".default");

  // Draw underline under default link on load
  target.style.width = `${dLink.getBoundingClientRect().width + short}px`;
  target.style.height = `${dLink.getBoundingClientRect().height}px`;
  target.style.left = `${dLink.getBoundingClientRect().left + window.pageXOffset + cntr}px`;
  target.style.top = `${dLink.getBoundingClientRect().top + window.pageYOffset + under}px`;
  target.style.borderColor = colors;
  target.style.transform = "none";

  for (let i = 0; i < links.length; i++) {

    // If li element (parent of a) is not 'active', set to grey
    if (!links[i].parentNode.classList.contains("current")) {
      // Set the link to grey
      links[i].style.opacity = "0.25";
    }
    
  }


  function linkClick() {

    event.preventDefault()
    // Remove "current" from all links
    for (let i = 0; i < links.length; i++) {

      if (links[i].parentNode.classList.contains("current")) {
        links[i].parentNode.classList.remove("current")
      }

      // Turn others grey
      if (links[i] != this){
        links[i].style.opacity = "0.25";

        // Mark this clicked link as current
        

      }
      this.parentNode.classList.add("current")
    }
    
  }


  function mouseenterFunc() {

    // If link being hovered over is not bold, make it bold and others grey
    if (!this.parentNode.classList.contains("active")) {

      // Make all (except currently selected) grey
      for (let i = 0; i < links.length; i++) {

        // remove old active tag
        if (links[i].parentNode.classList.contains("active")) {
          links[i].parentNode.classList.remove("active");
        }

        // Make all grey (unless we are over the viewType button)
        if (!this.parentNode.classList.contains("viewType")){  
          if (!links[i].parentNode.classList.contains("current")){
            links[i].style.opacity = "0.25";
          }
        }
      }

      // Make the current link active
      this.parentNode.classList.add("active");

      // Make it black
      this.style.opacity = "1";

      // Draw underline
      // Get diameters and position of link
      const width = this.getBoundingClientRect().width;
      const height = this.getBoundingClientRect().height;
      const left = this.getBoundingClientRect().left + window.pageXOffset;
      const top = this.getBoundingClientRect().top + window.pageYOffset;
      const color = colors;

      // Draw underline
      target.style.width = `${width + short}px`;
      target.style.height = `${height}px`;
      target.style.left = `${left + cntr}px`;
      target.style.top = `${top + under}px`;
      target.style.borderColor = color;
      target.style.transform = "none";
    }
  }
  

  function mouseoutFunc() {

    currentElem = document.querySelector(".current");
    
    // Remove active from all
    for (let i = 0; i < links.length; i++){

      if (links[i].parentNode.classList.contains("active")) {
        links[i].parentNode.classList.remove("active")
      }

      //If not currently selected, make grey
      if (!links[i].parentNode.classList.contains("current")){
        links[i].style.opacity = "0.25";
      }
    }

    // Get diameters and position of link
    const width = currentElem.getBoundingClientRect().width;
    const height = currentElem.getBoundingClientRect().height;
    const left = currentElem.getBoundingClientRect().left + window.pageXOffset;
    const top = currentElem.getBoundingClientRect().top + window.pageYOffset;
    const color = colors;

    // Draw underline
    target.style.width = `${width + short}px`;
    target.style.height = `${height}px`;
    target.style.left = `${left + cntr}px`;
    target.style.top = `${top + under}px`;
    target.style.borderColor = color;
    target.style.transform = "none";
  }

  

  // For every link, set listeners for click and hover
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", linkClick);
    links[i].addEventListener("mouseover", mouseenterFunc);
    links[i].addEventListener("mouseout", mouseoutFunc);
  }


  // Resizing functionality
  function resizeFunc() {
    // Resize based on window size
    const active = document.querySelector(".mynav li.current");

    if (active) {
      const left = active.getBoundingClientRect().left + window.pageXOffset;
      const top = active.getBoundingClientRect().top + window.pageYOffset;

      target.style.left = `${left + cntr}px`;
      target.style.top = `${top + under}px`;
    }
  }

  window.addEventListener("resize", resizeFunc);
  if (window.innerWidth < 576) {
    $(".target").hide();
  }

  function lineDisappear() {
    if (window.innerWidth < 576) {
      $(".target").hide();
    } else {
      $(".target").show();
    }
  }

  // Hide underline while resizing
  var doit;
  function resizedw(){
      $(".target").show();
      $(".mynav a, .target").css("transition", "all .2s ease-in-out");
      lineDisappear();
  }

  window.onresize = function() {
      $(".mynav a, .target").css("transition", "all 0s ease-in-out");
      lineDisappear();
      clearTimeout(doit);
      doit = setTimeout(function() {
          resizedw();
      }, 100);
  };
})();

  
