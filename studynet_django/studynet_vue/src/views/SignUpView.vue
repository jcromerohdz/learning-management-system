<script setup>
</script>

<template>
  <div class="signup">

    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Sign Up</h1>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column is-4 is-offset-4">
            <form action="">
              <div class="field">
                <label for="email">Email</label>
                <div class="control">
                  <input type="email" class="input">
                </div>
              </div>
              <div class="field">
                <label for="password">Password</label>
                <div class="control">
                  <input type="password" class="input">
                </div>
              </div>
              <div class="field">
                <label for="password">Repeat Password</label>
                <div class="control">
                  <input type="password" class="input">
                </div>
              </div>

              <div class="field">
                <div class="control">
                  <button class="button is-dark">Sign Up</button>
                </div>
              </div>
            </form>

            <hr>

            Or <router-link to="/login">clik here </router-link> to log in! 
          </div>
        </div>
      </div>
    </section>
  </div>
</template>