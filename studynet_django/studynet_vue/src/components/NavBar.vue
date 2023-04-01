<script></script>
<template>
  <nav
    class="navbar is-dark"
    role="navigation"
    aria-label="main navigation"
    style="min-height: 5rem"
  >
    <div class="navbar-brand">
      <RouterLink to="/" class="navbar-item is-size-4">StudyNet</RouterLink>
    </div>

    <div id="id" class="navbar-menu">
      <div class="navbar-start">
        <RouterLink to="/" class="navbar-item">Home</RouterLink>
        <RouterLink to="/about" class="navbar-item">About</RouterLink>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <RouterLink to="/signup" class="button is-primary">
              <strong>Sign Up</strong>
            </RouterLink>
            <RouterLink to="/login" class="button is-light">
              <strong>Log In</strong>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>