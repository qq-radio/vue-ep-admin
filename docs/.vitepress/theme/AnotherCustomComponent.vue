<script setup>
const preHref = location.href
if (preHref.includes('#')) {
  location.href += ' '
  setTimeout(() => {
    location.href = preHref
    const activeLink = document.querySelector(decodeURIComponent(location.hash))
    if (activeLink) {
      activeLink.scrollIntoView({ behavior: 'smooth' })
    }
  }, 1500)
}
</script>
