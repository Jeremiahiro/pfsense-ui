<template>
    <nav class="navbar navbar-expand-sm bg-default">
        <div class="d-flex flex-direction-row w-100">
            <div class="w-100 text-center">
                <NuxtLink class="nav-link" to="/login">Account Info</NuxtLink>
            </div>
             <div class="w-100 text-center">
                <NuxtLink class="nav-link" to="/personal-info">Personal Info</NuxtLink>
            </div>
             <div class="w-100 text-center">
                <NuxtLink class="nav-link" to="#">Identity</NuxtLink>
            </div>
             <div class="w-100 text-center">
                <NuxtLink class="nav-link" to="#">Review and Submit</NuxtLink>
            </div>
        </div>
    </nav>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.nav-link {
    border-bottom: 2px solid gray;
    color: gray;
}
a.nuxt-link-active {
  font-weight: bold;
}
/* exact link will show the primary color for only the exact matching link */
a.nuxt-link-exact-active {
  color: black;
  border-bottom: 3px solid #033;
}
</style>
