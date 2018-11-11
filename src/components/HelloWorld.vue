<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

		<div>
			<button type="button" @click="toggleWakeLock()">
				{{ isWakeLocked ? 'Disable' : 'Enable' }} wake lock
			</button>

			<p>
				{{ isWakeLocked ? '☀️ WakeLock enabled, screen won\'t go off ' : '🌑 WakeLock disabled, screen will go off ' }}️
			</p>
		</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as NoSleep from 'nosleep.js/dist/NoSleep';

@Component
export default class HelloWorld extends Vue {
  public isWakeLocked: boolean = false;
  @Prop() private msg!: string;
  private noSleep = new NoSleep();

  public toggleWakeLock(): void {
    this.isWakeLocked = !this.isWakeLocked;

    if (this.isWakeLocked) {
      this.noSleep.enable();
    }

    if (!this.isWakeLocked) {
      this.noSleep.disable();
    }
  }

  private beforeDestroy(): void {
    this.noSleep.disable();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
