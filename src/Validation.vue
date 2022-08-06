<template>
  <div class="container pt-2" >

    <hr>
    <h1 style="color: #ee6e73;font-weight: 300;">Validation</h1>
    <hr>
    <div class="d-flex flex-column">
      <input type="text" class="form-control" v-model="main.get('one').value">
      <span v-if="main.get('one').errors">{{ main.get('one').errors }}</span>
      <input type="text" class="form-control" v-model="main.get('two').value">
      <span v-if="main.get('two').errors">{{ main.get('two').errors }}</span>

      <h3>Orders</h3>
      <ul>
        <li v-for="(control, index) in main.get('order').controls" :key="index">
          <input type="text" class="form-control" v-model="control.value">
          <span v-if="control.errors">{{ control.errors }}</span>
        </li>
      </ul>

      <span v-if="main.get('order').errors">{{ main.get('order').errors }}</span>

      
      <hr>

      <h2>FORM STATUS : {{ main.valid }}</h2>
      <div>
        <button @click="submit()" >console.log(form)</button>
        <button @click="setErrors()" >setErrors</button>
      </div>
    </div>

    <div class="pt-3">
      <highlightjs language='javascript' :code="code" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "reactive-vue-form";

  const code = `
    import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from "reactive-vue-form";


    function firstChild(control: AbstractControl) {
      if ((control as FormArray)?.at(0)?.value != 1) return { order: "first order must be 1" }
      return null;
    }

    const main = new FormGroup({
      one: new FormControl(null, Validators.required),
      two: new FormControl(null, Validators.required),
      order: new FormArray([
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required),
        new FormControl(null, Validators.required)
      ], firstChild),
    });

    function submit() {
      console.log(main)
    }
    function setErrors() {
      main.get('one').addErrors({b: true });
      main.get('order.1').addErrors({order1: true });
    }
  `

  function firstChild(control: AbstractControl) {
    if ((control as FormArray)?.at(0)?.value != 1) return { order: "first order must be 1" }
    return null;
  }

  const main = new FormGroup({
    one: new FormControl(null, Validators.required),
    two: new FormControl(null, Validators.required),
    order: new FormArray([
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required),
      new FormControl(null, Validators.required)
    ], firstChild),
  });

  function submit() {
    console.log(main)
  }
  function setErrors() {
    main.get('one').addErrors({b: true });
    main.get('order.1').addErrors({order1: true });
  }
</script>

