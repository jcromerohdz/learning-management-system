<script setup>
</script>

<template>
  <div class="login">

    <div class="hero is-info">
      <div class="hero-body has-text-centered">
        <h1 class="title">Log In</h1>
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
                <div class="control">
                  <button class="button is-dark">Log In</button>
                </div>
              </div>
            </form>

            <hr>

            Or <router-link to="/signup">clik here </router-link> to register! 
          </div>
        </div>
      </div>
    </section>
  </div>
</template>