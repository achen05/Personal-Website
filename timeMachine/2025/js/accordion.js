const wrapper = document.querySelector('.paragraph-wrapper');
const toggleBtn = document.getElementById('toggle');

toggleBtn.addEventListener('click', () => {
  wrapper.classList.toggle('expanded');
  toggleBtn.textContent = wrapper.classList.contains('expanded') ? '[-] Minimize Text' : '[+] Expand Full Text';
});