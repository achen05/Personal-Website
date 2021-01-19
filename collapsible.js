var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
      content.style.paddingBottom = 0 + "px";
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.style.paddingBottom = 22 + "px";
    }
  });
}
