<template>
  <div class="container justify-content-center">
    <h1 @click="add()">Hello</h1>

    <br>
    <div class="d-flex flex-column">
      <div class="d-flex">
        <input type="text" class="form-control" v-model="group.get('selected').value">
        <button @click="add()" :disabled="!group.get('selected').value" class="btn btn-success">Add</button>
      </div>
      <span style="color: red" v-if="group.get('selected').hasError('required')">Обязательное поле!!!</span>
    </div>
    <hr>


    <ul class="list-group">
      <li class="list-group-item" v-for="(control, index) in group.get('values').controls" :key="index">{{ control.value }}</li>
    </ul>


    <h1>FormGroup</h1>
    <div><pre>{{ group.value }}</pre></div>

    <h1>FormArray</h1>
    <div><pre>{{ simpleArrayForm.value }}</pre></div>

    <h1>Nested value</h1>
    group.get("test.nested.nested_nested.0.arrayGroup.array1.0")
    <h3>{{ group.get("test.nested.nested_nested.0.arrayGroup.array1.0").value }}</h3>
    //OR
    group.get([test, nested, nested_nested , 0, arrayGroup, array1, 0])
    <h3>{{ group.get(["test", "nested", "nested_nested" , 0, "arrayGroup", "array1", 0]).value }}</h3>
  </div>
</template>

<script lang="ts" setup>
  import { FormControl, FormGroup, FormArray, Validators } from 'reactive-vue-form'


  const group = new FormGroup({
    selected: new FormControl('', [Validators.required]),
    values: new FormArray([]),
    test: new FormGroup({
      nested: new FormGroup({
        nested_nested: new FormArray([
          new FormGroup({
            arrayGroup: new FormGroup({
              array1: new FormArray([
                new FormControl('deep')
              ])
            })
          }),
          new FormControl("array item")
        ]),
        single: new FormControl('single'),
        array: new FormArray([
          new FormGroup({
            arrayGroup: new FormGroup({
              array1: new FormArray([
                new FormControl('deep')
              ])
            })
          }),
          new FormControl("array item")
        ])
      })
    })
  });

  const simpleArrayForm = new FormArray([
    new FormControl(1),
    new FormControl(2),
    new FormControl(3),
    new FormControl(4),
  ]);



  function add() {
    (group.controls.values as FormArray).addControls([
      new FormControl(group.controls.selected.value)
    ]);
    group.controls.selected.setValue('');
    console.log(group);
  }


</script>

<style>
  @import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css'
</style>


