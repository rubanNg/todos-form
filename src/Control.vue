<template>
  <div class="container pt-2" >
    <h1 style="color: #ee6e73;font-weight: 300;">FormControl</h1>
    <hr>
    <input class="form-control mb-3" :class="{ 'is-invalid': control.errors }"  type="text" v-model="control.value">
    <p class="mb-3" style="color: #dc3545;" v-if="control.hasError('required')">required value</p>
    <p class="mb-3" style="color: #dc3545;" v-if="control.hasError('customError')">{{ control.errors }}</p>
    <div class="d-flex justify-content-between">
      <button class="btn btn-success" @click="setValue()">set value (random)</button>
      <button class="btn btn-success mr-1" @click="clearErrors()">clear errors</button>
      <button class="btn btn-success mr-1" @click="setErrors()">set error</button>
    </div>
    <div class="pt-3">
      <highlightjs language='javascript' :code="code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { FormControl, Validators } from "reactive-vue-form";

  const code = `
    const control = new FormControl('', [Validators.required]);

    function setValue() {
      control.setValue(Math.random() * 100000);
    }

    function clearErrors() {
      control.clearErrors();
    }

    function setErrors() {
      control.addErrors({ customError: 'Custom error text' })
      console.log(control)
    }
  `

  const control = new FormControl('', [Validators.required]);

  function setValue() {
    control.setValue(Math.random() * 100000);
  }

  function clearErrors() {
    control.clearErrors();
  }

  function setErrors() {
    control.addErrors({ customError: 'Custom error text' })
    console.log(control)
  }

</script>

<style>

</style>
